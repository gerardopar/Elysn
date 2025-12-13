import { openaiClient as openai } from "../services/openAi.js";
import { OpenAI } from "openai";

import { Interlink } from "src/models/interlink.js";

import {
  getInterlink,
  createInterlink,
  updateInterlink,
} from "../access-layer/interlink.js";

import { sanitizeJSON } from "./string.helpers.js";

import { userSignalResponse, updateInterlinkFromUserSignal } from "@elysn/core";

export const getOrCreateInterlink = async (
  userId: string,
  personaId: string
) => {
  const existingInterlink = await getInterlink(userId, personaId);
  if (existingInterlink) return existingInterlink;

  const interlink = await createInterlink(userId, personaId);
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
    !extractedTopics?.sentiment ||
    !extractedTopics?.emotion ||
    !extractedTopics?.intensity
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
  } | null
): Promise<Interlink | null> => {
  const interlink = await getOrCreateInterlink(userId, personaId);
  if (!userSignal) return interlink;

  const patch = updateInterlinkFromUserSignal(interlink, userSignal);

  return updateInterlink(userId, personaId, patch);
};
