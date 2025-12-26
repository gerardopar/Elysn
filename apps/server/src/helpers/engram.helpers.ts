import { Message } from "../models/message.js";
import { Interlink } from "../models/interlink.js";

import {
  evaluateEngramCandidate,
  observePersonaDeltaWindow,
} from "@elysn/core";

import {
  PersonaResponseInterlinkDelta,
  PersonaResponseMeta,
  MessageSenderEnum,
} from "@elysn/shared";

export const getRecentPersonaMessages = async (
  userId: string,
  personaId: string,
  chatId?: string,
  limit = 5
) => {
  const messages = await Message.find({
    userId,
    personaId,
    chatId,
    sender: MessageSenderEnum.AI,
    metadata: { $exists: true },
    "metadata.personaResponseMeta": { $exists: true },
  })
    .sort({ createdAt: -1 })
    .limit(limit);

  return messages;
};

export const getRecentPersonaDeltas = async (
  userId: string,
  personaId: string,
  chatId?: string,
  limit = 5
): Promise<PersonaResponseInterlinkDelta[]> => {
  const messages = await getRecentPersonaMessages(
    userId,
    personaId,
    chatId,
    limit
  );

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
  chatId: string,
  interlink: Interlink,
  personaMeta: PersonaResponseMeta,
  delta: PersonaResponseInterlinkDelta,
  limit: number
) => {
  const recentDeltas = await getRecentPersonaDeltas(
    userId,
    personaId,
    chatId,
    limit
  );

  const stats = await observePersonaDeltaWindow({
    currentDelta: delta,
    recentDeltas,
  });

  const decision = evaluateEngramCandidate({
    stats,
    interlink,
    personaMeta,
  });

  console.info("engram_evaluation", {
    userId,
    personaId,
    decision,
    stats,
  });

  return stats;
};
