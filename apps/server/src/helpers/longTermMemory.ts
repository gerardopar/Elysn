import { openaiClient as openai } from "src/services/openAi";
import { OpenAI } from "openai";

import { Persona } from "../models/persona";
import { LongTermMemory } from "../models/longTermMemory";

import { extractLongTermMemoryResponse } from "@elysn/core";
import { LongTermMemoryExtractionResponse } from "@elysn/shared";

import { getMessage } from "../access-layer/message";

import { sanitizeJSON } from "./string.helpers";

export const extractLongTermMemory = async ({
  messageId,
  personaId,
}: {
  messageId: string;
  personaId: string;
}): Promise<LongTermMemory | null> => {
  if (!messageId || !personaId) return null;
  const message = await getMessage(messageId);

  if (!message) return null;

  const payload = extractLongTermMemoryResponse({
    text: message?.text,
  });

  // if there is no payload, skip extraction
  if (!payload) return null;

  if (payload) {
    const response: OpenAI.Responses.Response = await openai.responses.create(
      payload
    );

    if (!response || !response.output_text) return null;
    const sanitizedOutput = sanitizeJSON(response.output_text);
    const extractedMemory: LongTermMemoryExtractionResponse =
      JSON.parse(sanitizedOutput);

    if (!extractedMemory.shouldWriteMemory) return null;

    try {
      const savedMemory = await saveLongTermMemory({
        personaId,
        messageId,
        extractedMemory,
      });
      return savedMemory;
    } catch (error) {
      console.warn("Failed to save long term memory", error);
      return null;
    }
  }

  return null;
};

/**
 * Saves an extracted memory to the database and links it to the persona.
 */
export const saveLongTermMemory = async ({
  personaId,
  messageId,
  extractedMemory,
}: {
  personaId: string;
  messageId: string;
  extractedMemory: LongTermMemoryExtractionResponse;
}): Promise<LongTermMemory | null> => {
  try {
    // Should never be called if the flag is false, but double-check:
    if (!extractedMemory.shouldWriteMemory || !extractedMemory.memory) {
      return null;
    }

    const { category, value, importance } = extractedMemory.memory;

    const memory = await LongTermMemory.create({
      personaId,
      messageId,
      category,
      value,
      importance,
    });

    // 2. Push memory ID into persona index
    await Persona.updateOne(
      { _id: personaId },
      { $push: { "memoryIndex.longTermMemories": memory._id } }
    );

    // 3. Return saved memory
    return memory;
  } catch (err) {
    console.error("[saveLongTermMemory] Failed to save memory:", err);
    return null;
  }
};
