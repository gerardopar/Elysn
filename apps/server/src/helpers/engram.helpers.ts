import { openaiClient as openai } from "../services/openAi.js";
import { OpenAI } from "openai";

import { Engram } from "../models/engram.js";
import { Message } from "../models/message.js";
import { Interlink } from "../models/interlink.js";

import { getRecentMessages } from "../access-layer/message.js";

import {
  ComputeDeltaWindowOutput,
  ENGRAM_CONFIDENCE_BOOST,
  ENGRAM_MIN_CONFIDENCE_THRESHOLD,
  engramCandidateEvaluationResponse,
  evaluateEngramCandidate,
  observePersonaDeltaWindow,
} from "@elysn/core";

import {
  PersonaResponseInterlinkDelta,
  PersonaResponseMeta,
  MessageSenderEnum,
  EngramEvaluationResponse,
  EngramSourceEnum,
  EngramScopeEnum,
  EngramEventTriggerEnum,
} from "@elysn/shared";
import { sanitizeJSON } from "./string.helpers.js";

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

export const createEngramCandidate = async ({
  personaId,
  chatId,
  recentMessages,
  stats,
  personaMeta,
  stabilityScore,
}: {
  personaId: string;
  chatId: string;
  recentMessages: Message[];
  stats: ComputeDeltaWindowOutput;
  personaMeta: PersonaResponseMeta;
  stabilityScore: number;
}) => {
  const payload = engramCandidateEvaluationResponse(
    recentMessages,
    stats,
    personaMeta
  );

  if (!payload) return null;

  const response: OpenAI.Responses.Response = await openai.responses.create(
    payload
  );
  const sanitized = sanitizeJSON(response.output_text);

  let data: EngramEvaluationResponse;
  try {
    data = JSON.parse(sanitized);
  } catch (err) {
    console.warn("[engramEvaluation] Failed to parse JSON:", err);
    return null;
  }

  const { category, content, rationale, confidence, topics } = data;

  if (!category || !content || !confidence || !topics) return null;
  if (confidence < ENGRAM_MIN_CONFIDENCE_THRESHOLD) return null;

  const engram = await Engram.findOneAndUpdate(
    {
      ownerId: String(personaId),
      ownerType: EngramSourceEnum.AI,
      scope: EngramScopeEnum.Thread,
      chatId: String(chatId),
      category,
      content,
    },
    {
      $setOnInsert: {
        ownerId: String(personaId),
        ownerType: EngramSourceEnum.AI,
        scope: EngramScopeEnum.Thread,
        chatId: String(chatId),

        category,
        content,
        topics,

        confidence,
        stability: stabilityScore,
        emotionalWeight: Math.max(
          Math.abs(stats.sum.trust),
          Math.abs(stats.sum.warmth),
          Math.abs(stats.sum.safety)
        ),

        usageCount: 0,

        derivedFrom: {
          triggerType: EngramEventTriggerEnum.Pattern,
          interactionIds: recentMessages.map((m) => m.id),
        },

        candidateMeta: {
          statsSnapshot: stats,
          personaMetaSnapshot: personaMeta,
          classification: {
            category,
            rationale,
            confidence,
          },
          interactionIds: recentMessages.map((m) => m.id),
        },

        lastReinforcedAt: new Date(),
      },
      $inc: {
        usageCount: 1,
      },
      $set: {
        lastReinforcedAt: new Date(),
        confidence: Math.min(
          1,
          confidence + ENGRAM_CONFIDENCE_BOOST * stabilityScore
        ),
      },
      $addToSet: {
        topics: { $each: topics },
      },
    },
    { upsert: true }
  );

  return engram;
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
  const recentMessages = await getRecentMessages(String(chatId), 10);

  const recentDeltas = await getRecentPersonaDeltas(
    userId,
    personaId,
    String(chatId),
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
    chatId,
    decision,
    stats,
  });

  if (!decision.eligible) return stats;

  await createEngramCandidate({
    personaId,
    chatId,
    recentMessages,
    stats,
    personaMeta,
    stabilityScore: decision.stabilityScore,
  });

  return stats;
};
