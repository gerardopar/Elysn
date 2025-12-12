import { openaiClient as openai } from "../services/openAi.js";
import { OpenAI } from "openai";

import { getInterlink, createInterlink } from "../access-layer/interlink.js";

import { userSignalResponse } from "@elysn/core";
import { sanitizeJSON } from "./string.helpers.js";

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
