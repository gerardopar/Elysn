import { openaiClient as openai } from "../services/openAi";

import { Persona } from "../models/persona";
import { Message } from "../models/message";
import { Chat } from "../models/chat";
import { User } from "../models/user";

import { sanitizeText } from "./string.helpers";
import { createMessage } from "../access-layer/message";

import { createResponse } from "@elysn/core";
import { MessageSenderEnum } from "@elysn/shared";

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
  chat: Chat,
  persona: Persona,
  user: User,
  recentMessages: Message[],
  text: string
) => {
  // run AI generation
  let aiText = "";
  try {
    const payload = createResponse(persona, recentMessages, text);
    const aiResponse = await openai.responses.create(payload);
    aiText = sanitizeText(aiResponse.output_text);
  } catch (err) {
    console.error("AI error:", err);
    aiText =
      "I’m sorry… I lost my train of thought for a moment. Could you say that again?";
  }

  // save AI message
  const aiMsg = await createMessage({
    chatId: String(chat._id),
    personaId: String(chat.personaId),
    userId: String(user._id),
    sender: MessageSenderEnum.AI,
    text: aiText,
  });

  return aiMsg;
};
