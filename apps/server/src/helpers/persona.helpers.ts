import { openaiClient as openai } from "../services/openAi.js";

import { Persona } from "../models/persona.js";
import { Message } from "../models/message.js";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";

import { sanitizeText } from "./string.helpers.js";
import {
  extractUserSignal,
  updateInterlinkWithUserSignalMetadata,
} from "./interlink.helpers.js";
import { updateMessageMetadataAsync } from "./message.helpers.js";
import { createMemoryEmbedding, extractTopics } from "./memory.helpers.js";

import {
  createMessage,
  getRecentMessages,
  getMessage,
} from "../access-layer/message.js";
import {
  getLongTermMemories,
  getShortTermMemoryWindow,
} from "../access-layer/memory.js";
import { getUser } from "../access-layer/user.js";
import { getChat } from "../access-layer/chat.js";
import { getPersona } from "../access-layer/persona.js";

import { createResponse } from "@elysn/core";
import { MessageSenderEnum } from "@elysn/shared";

import {
  pubsub,
  MESSAGE_CHANNEL,
  MESSAGE_STREAM_CHANNEL,
  PERSONA_STATUS_CHANNEL,
} from "../pubsub/pubsub.js";

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

  const extractedTopics = await extractTopics(_message.text);
  const embedding = await createMemoryEmbedding(_message.text);
  const extractedUserSignal = await extractUserSignal(_message.text);

  updateMessageMetadataAsync(
    String(_message._id),
    extractedTopics,
    embedding,
    extractedUserSignal
  );

  let recentMessages = await getRecentMessages(String(_chat._id));
  recentMessages = recentMessages.slice(-10);

  recentMessages.push({
    sender: MessageSenderEnum.USER,
    text: _message.text,
  } as Message);

  const interlink = await updateInterlinkWithUserSignalMetadata(
    String(_user._id),
    String(_persona._id),
    extractedUserSignal
  );

  const longTermMemories = await getLongTermMemories(
    String(_persona._id),
    extractedTopics || [],
    embedding,
    interlink,
    {
      reinforce: true,
    }
  );

  const recentStm = await getShortTermMemoryWindow(
    String(_persona._id),
    String(_chat._id)
  );

  const payload = createResponse(
    _persona,
    interlink,
    recentMessages,
    _message.text ?? "",
    longTermMemories,
    recentStm
  );

  let aiText = "";
  const streamPreference = false; // TODO: make this a user setting

  if (streamPreference) {
    const stream = await openai.responses.create({
      ...payload,
      stream: true,
    });

    for await (const event of stream) {
      if (event.type === "response.output_text.delta") {
        const chunk = event.delta ?? "";
        aiText += chunk;

        pubsub.publish(`${MESSAGE_STREAM_CHANNEL}_${_chat._id}`, {
          newMessageStream: { event: "token", token: chunk, outputText: null },
        });
      }

      if (event.type === "error") {
        pubsub.publish(`${MESSAGE_STREAM_CHANNEL}_${_chat._id}`, {
          newMessageStream: {
            event: "error",
            error: event.message ?? "Unknown error",
          },
        });
      }

      if (event.type === "response.completed") {
        pubsub.publish(`${MESSAGE_STREAM_CHANNEL}_${_chat._id}`, {
          newMessageStream: { event: "completed", outputText: aiText },
        });
      }
    }
  } else {
    const aiResponse = await openai.responses.create({
      ...payload,
      stream: false,
    });
    aiText = sanitizeText(aiResponse.output_text ?? "");
  }

  const aiMsg = await createMessage({
    chatId: String(_chat._id),
    personaId: String(_persona._id),
    userId: String(_user._id),
    sender: MessageSenderEnum.AI,
    text: aiText,
  });

  pubsub.publish(`${MESSAGE_CHANNEL}_${_chat._id}`, {
    newMessage: {
      id: aiMsg.id,
      chatId: aiMsg.chatId,
      userId: aiMsg.userId,
      personaId: aiMsg.personaId,
      sender: aiMsg.sender,
      text: aiMsg.text,
      timestamp: aiMsg.timestamp.getTime(),
    },
  });

  pubsub.publish(`${PERSONA_STATUS_CHANNEL}_${_chat._id}`, {
    personaStatus: { typing: false, chatId: _chat._id },
  });

  return aiMsg;
};
