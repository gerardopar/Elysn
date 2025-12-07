import { openaiClient as openai } from "../services/openAi";

import { Persona } from "../models/persona";
import { Message } from "../models/message";
import { Chat } from "../models/chat";
import { User } from "../models/user";

import { sanitizeText } from "./string.helpers";
import { updateMessageEmbedding } from "./message.helpers";
import { createMemoryEmbedding, extractTopics } from "./memory.helpers";

import {
  createMessage,
  getRecentMessages,
  getMessage,
  updateMessageTopics,
} from "../access-layer/message";
import {
  getLatestShortTermMemory,
  getLongTermMemories,
} from "../access-layer/memory";
import { getUser } from "../access-layer/user";
import { getChat } from "../access-layer/chat";
import { getPersona } from "../access-layer/persona";

import { createResponse } from "@elysn/core";
import { MessageSenderEnum } from "@elysn/shared";

import {
  pubsub,
  MESSAGE_CHANNEL,
  MESSAGE_STREAM_CHANNEL,
  PERSONA_STATUS_CHANNEL,
} from "../pubsub/pubsub";

export const personaExists = async (userId: string): Promise<boolean> => {
  const persona = await Persona.findOne({ userId });
  return !!persona;
};

export const getExistingPersona = async (
  userId: string
): Promise<Persona | null> => {
  const persona = await Persona.findOne({ userId });

  if (!persona) return null;

  return persona;
};

export const createPersonaMessage = async (
  chat: Chat | string,
  persona: Persona | string,
  user: User | string,
  message: Message | string
) => {
  const _chat = await getChat(chat);
  const _user = await getUser(user);
  const _persona = await getPersona(persona);
  const _message = await getMessage(message);

  if (!_chat || !_persona || !_user || !_message)
    throw new Error("Missing data for AI generation");

  const extractedTopics = await extractTopics(_message?.text);
  const embedding = await createMemoryEmbedding(_message?.text);

  if (extractedTopics) {
    // non-blocking
    updateMessageTopics(String(_message?._id), extractedTopics);
    updateMessageEmbedding(String(_message?._id), embedding);
  }

  // Fetch last messages from DB
  let recentMessages = await getRecentMessages(String(_chat?._id));
  recentMessages = recentMessages.slice(-10);

  // Append the current user message manually
  recentMessages.push({
    sender: MessageSenderEnum.USER,
    text: _message?.text,
  } as Message);

  // Get memory
  const longTermMemories = await getLongTermMemories(
    String(_persona?._id),
    extractedTopics || [],
    embedding
  );

  const recentStm = await getLatestShortTermMemory(
    String(_persona?._id),
    String(_chat?._id)
  );

  const streamPreference = true; // TODO: make this user config

  const payload = createResponse(
    _persona,
    recentMessages,
    _message?.text ?? "",
    longTermMemories,
    recentStm
  );

  let aiText = "";

  if (streamPreference) {
    const stream = await openai.responses.create({
      ...payload,
      stream: true,
    });

    for await (const event of stream) {
      if (event.type === "response.output_text.delta") {
        const chunk = event?.delta ?? "";
        aiText += chunk;

        pubsub.publish(`${MESSAGE_STREAM_CHANNEL}_${_chat?._id}`, {
          newMessageStream: {
            event: "token",
            token: chunk,
            outputText: null,
            error: null,
          },
        });
      }

      if (event.type === "error") {
        const message = event?.message ?? "Unknown error";

        pubsub.publish(`${MESSAGE_STREAM_CHANNEL}_${_chat?._id}`, {
          newMessageStream: {
            event: "error",
            token: null,
            outputText: null,
            error: message,
          },
        });
      }

      if (event.type === "response.completed") {
        // streaming is done; aiText holds the full string from all deltas
        pubsub.publish(`${MESSAGE_STREAM_CHANNEL}_${_chat?._id}`, {
          newMessageStream: {
            event: "completed",
            token: null,
            outputText: aiText,
            error: null,
          },
        });
      }
    }
  } else {
    try {
      const aiResponse = await openai.responses.create({
        ...payload,
        stream: false,
      });

      aiText = sanitizeText(aiResponse.output_text ?? "");
    } catch (err) {
      console.error("AI error:", err);
      aiText =
        "I’m sorry… I lost track of what I was thinking. Could you rephrase that?";
    }
  }

  // Save AI message
  const aiMsg = await createMessage({
    chatId: String(_chat?._id),
    personaId: String(_persona?._id),
    userId: String(_user?._id),
    sender: MessageSenderEnum.AI,
    text: aiText,
  });

  pubsub.publish(`${MESSAGE_CHANNEL}_${_chat?._id}`, {
    newMessage: {
      id: aiMsg.id,
      chatId: aiMsg.chatId,
      userId: aiMsg.userId,
      personaId: aiMsg.personaId,
      sender: aiMsg.sender,
      text: aiMsg.text,
      timestamp: aiMsg.timestamp.getTime(),
      metadata: aiMsg.metadata,
    },
  });

  // Publish persona status
  pubsub.publish(`${PERSONA_STATUS_CHANNEL}_${_chat._id}`, {
    personaStatus: {
      typing: false,
      chatId: _chat._id,
    },
  });

  return aiMsg;
};
