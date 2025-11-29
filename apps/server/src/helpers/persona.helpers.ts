import { openaiClient as openai } from "../services/openAi";

import { Persona } from "../models/persona";
import { Message } from "../models/message";
import { Chat } from "../models/chat";
import { User } from "../models/user";

import { sanitizeText } from "./string.helpers";

import { getUser } from "../access-layer/user";
import { getChat } from "../access-layer/chat";
import { getPersona } from "../access-layer/persona";
import { createMessage, getRecentMessages } from "../access-layer/message";
import {
  getLongTermMemories,
  getLatestShortTermMemory,
} from "../access-layer/memory";

import { createResponse } from "@elysn/core";
import { MessageSenderEnum } from "@elysn/shared";

import { pubsub, MESSAGE_CHANNEL } from "../pubsub/pubsub";

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
  userMessageText: string
) => {
  const _chat = typeof chat === "string" ? await getChat(chat) : chat;
  const _persona =
    typeof persona === "string" ? await getPersona(persona) : persona;
  const _user = typeof user === "string" ? await getUser(user) : user;

  if (!_chat || !_persona || !_user) {
    throw new Error("Missing chat, persona, or user for AI generation");
  }

  // Fetch last messages from DB
  let recentMessages = await getRecentMessages(String(_chat?._id));
  recentMessages = recentMessages.slice(-10);

  // Append the current user message manually
  recentMessages.push({
    sender: MessageSenderEnum.USER,
    text: userMessageText,
  } as Message);

  // Get memory
  const longTermMemories = await getLongTermMemories(String(_persona?._id));

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
      userMessageText,
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

  return aiMsg;
};
