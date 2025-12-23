import { openaiClient as openai } from "../services/openAi.js";
import { OpenAI } from "openai";

import { Interlink } from "../models/interlink.js";

import {
  getInterlink,
  createInterlink,
  updateInterlink,
} from "../access-layer/interlink.js";

import { sanitizeJSON } from "./string.helpers.js";

import {
  getRepairPatch,
  computeWithDelta,
  userSignalResponse,
  deriveInterlinkDeltaFromUserSignal,
} from "@elysn/core";
import { PersonaArchetype, PersonaResponseInterlinkDelta } from "@elysn/shared";

export const getOrCreateInterlink = async (
  userId: string,
  personaId: string,
  archeType?: PersonaArchetype
) => {
  const existingInterlink = await getInterlink(userId, personaId);
  if (existingInterlink) return existingInterlink;

  const interlink = await createInterlink(userId, personaId, archeType);
  return interlink;
};

export const extractUserSignal = async (
  messageText: string
): Promise<{
  sentiment: number;
  emotion: string;
  intensity: number;
} | null> => {
  if (!messageText) return null;

  const payload = userSignalResponse(messageText);

  if (!payload) return null;

  const response: OpenAI.Responses.Response = await openai.responses.create(
    payload
  );

  if (!response || !response.output_text) return null;
  const sanitizedOutput = sanitizeJSON(response.output_text);
  const extractedTopics: {
    sentiment: number;
    emotion: string;
    intensity: number;
  } = JSON.parse(sanitizedOutput);

  if (
    extractedTopics?.sentiment == null ||
    typeof extractedTopics?.emotion !== "string" ||
    extractedTopics.emotion.length === 0 ||
    extractedTopics?.intensity == null
  )
    return null;

  return extractedTopics;
};

export const updateInterlinkWithUserSignalMetadata = async (
  userId: string,
  personaId: string,
  userSignal: {
    sentiment: number;
    emotion: string;
    intensity: number;
  } | null,
  archeType?: PersonaArchetype
): Promise<{
  interlink: Interlink;
  delta: PersonaResponseInterlinkDelta;
}> => {
  const interlink = await getOrCreateInterlink(userId, personaId, archeType);
  if (!interlink) throw new Error("Failed to get or create interlink");

  const zeroDelta = { trust: 0, warmth: 0, tension: 0, safety: 0 };

  if (!userSignal) return { interlink, delta: zeroDelta };

  const deltaIntent = deriveInterlinkDeltaFromUserSignal(userSignal);

  const trust = computeWithDelta(interlink.trust, deltaIntent.trust ?? 0);
  const warmth = computeWithDelta(interlink.warmth, deltaIntent.warmth ?? 0);
  const safety = computeWithDelta(interlink.safety, deltaIntent.safety ?? 0);
  const tension = computeWithDelta(interlink.tension, deltaIntent.tension ?? 0);

  let patch: Partial<Interlink> = {
    trust: trust.value,
    warmth: warmth.value,
    safety: safety.value,
    tension: tension.value,
    lastInteractionAt: new Date(),
    updatedAt: new Date(),
  };

  patch = {
    ...patch,
    ...getRepairPatch(
      { ...interlink, ...patch },
      {
        sentiment: userSignal.sentiment,
        intensity: userSignal.intensity,
      }
    ),
  };

  const updatedInterlink = await updateInterlink(userId, personaId, patch);
  if (!updatedInterlink) return { interlink, delta: zeroDelta };

  return {
    interlink: updatedInterlink,
    delta: {
      trust: trust.delta,
      warmth: warmth.delta,
      safety: safety.delta,
      tension: tension.delta,
    },
  };
};
