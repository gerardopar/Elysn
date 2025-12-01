import { openaiClient as openai } from "../services/openAi";

import { Persona } from "../models/persona";
import { Message } from "../models/message";
import { Chat } from "../models/chat";
import { User } from "../models/user";

import { sanitizeText } from "./string.helpers";
import { updateMessageEmbedding } from "./message.helpers";
import { createMemoryEmbedding, extractTopics } from "./memory.helpers";

import { getUser } from "../access-layer/user";
import { getChat } from "../access-layer/chat";
import { getPersona } from "../access-layer/persona";
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

import { createResponse } from "@elysn/core";
import { MessageSenderEnum } from "@elysn/shared";

import {
  pubsub,
  MESSAGE_CHANNEL,
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
  const _chat = typeof chat === "string" ? await getChat(chat) : chat;
  const _persona =
    typeof persona === "string" ? await getPersona(persona) : persona;
  const _user = typeof user === "string" ? await getUser(user) : user;
  const _message =
    typeof message === "string" ? await getMessage(message) : message;

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

  // AI generation
  let aiText = "";
  try {
    const payload = createResponse(
      _persona,
      recentMessages,
      _message?.text ?? "",
      longTermMemories,
      recentStm
    );
    const aiResponse = await openai.responses.create(payload);
    aiText = sanitizeText(aiResponse.output_text);
  } catch (err) {
    console.error("AI error:", err);
    aiText =
      "I’m sorry… I lost track of what I was thinking. Could you rephrase that?";
  }

  // Save AI message
  const aiMsg = await createMessage({
    chatId: String(_chat?._id),
    personaId: String(_persona?._id),
    userId: String(_user?._id),
    sender: MessageSenderEnum.AI,
    text: aiText,
  });

  // Publish it to GraphQL subscriptions
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
