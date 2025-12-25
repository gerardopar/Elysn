import { Message } from "../models/message.js";

import { observePersonaDeltaWindow } from "@elysn/core";

import { PersonaResponseInterlinkDelta } from "@elysn/shared";

export const getRecentPersonaMessages = async (
  userId: string,
  personaId: string,
  limit = 5
) => {
  const messages = await Message.find({
    userId,
    personaId,
  })
    .sort({ createdAt: -1 })
    .limit(limit);

  return messages;
};

export const getRecentPersonaDeltas = async (
  userId: string,
  personaId: string,
  limit = 5
): Promise<PersonaResponseInterlinkDelta[]> => {
  const messages = await getRecentPersonaMessages(userId, personaId, limit);

  const deltas = messages.map((message) => {
    return message?.metadata?.personaResponseMeta?.interlinkDelta;
  });

  return deltas.filter(
    (delta) => delta !== undefined
  ) as PersonaResponseInterlinkDelta[];
};

export const observePersonaDeltaWindowAsync = async (
  userId: string,
  personaId: string,
  delta: PersonaResponseInterlinkDelta,
  limit: number
) => {
  const recentDeltas = await getRecentPersonaDeltas(userId, personaId, limit);

  await observePersonaDeltaWindow({
    currentDelta: delta,
    recentDeltas,
  });
};
