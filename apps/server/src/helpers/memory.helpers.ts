import { openaiClient as openai } from "src/services/openAi";
import { OpenAI } from "openai";

import { Memory } from "../models/memory";

import {
  extractLongTermMemoryResponse,
  extractShortTermMemoryResponse,
  extractMessageTopics,
  embeddingResponse,
  reinforceMemory,
} from "@elysn/core";
import {
  LongTermMemoryExtractionResponse,
  ShortTermMemorySummaryResponse,
  MemoryTypeEnum,
} from "@elysn/shared";

import { getChat } from "../access-layer/chat";
import { getMessage, getRecentMessages } from "../access-layer/message";

import { sanitizeJSON } from "./string.helpers";

export const maybeExtractShortTermMemory = async (
  chatId: string,
  personaId: string
) => {
  const chat = await getChat(chatId);
  if (!chat) return null;

  const recentMessages = await getRecentMessages(chatId, 50);
  if (recentMessages.length === 0) return null;

  const payload = extractShortTermMemoryResponse(chat, recentMessages);
  if (!payload) return null;

  const response: OpenAI.Responses.Response = await openai.responses.create(
    payload
  );

  if (!response || !response.output_text) return null;

  const sanitized = sanitizeJSON(response.output_text);

  let data: ShortTermMemorySummaryResponse;
  try {
    data = JSON.parse(sanitized);
  } catch (err) {
    console.warn(
      "[maybeExtractShortTermMemory] Failed to parse STM JSON:",
      err
    );
    return null;
  }

  const { summary, metadata } = data;
  if (!summary) return null;

  const now = new Date();

  const saved = await Memory.create({
    personaId,
    chatId,
    type: MemoryTypeEnum.STM_TRAIL,
    value: summary,
    metadata: {
      ...metadata,
      lastReferencedAt: now,
    },
    fromMessageCount: chat.messagesCount - recentMessages.length + 1,
    toMessageCount: chat.messagesCount,
    createdAt: now,
    lastUpdated: now,
  });

  return saved;
};

export const extractLongTermMemory = async ({
  messageId,
  personaId,
}: {
  messageId: string;
  personaId: string;
}): Promise<Memory | null> => {
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

    const sanitized = sanitizeJSON(response.output_text);

    let data: LongTermMemoryExtractionResponse;
    try {
      data = JSON.parse(sanitized);
    } catch (err) {
      console.warn("[extractLongTermMemory] Failed to parse LTM JSON:", err);
      return null;
    }

    if (!data.shouldWriteMemory) return null;

    try {
      const savedMemory = await saveLongTermMemory({
        personaId,
        messageId,
        extractedMemory: data,
      });
      return savedMemory;
    } catch (error) {
      console.warn("Failed to save long term memory", error);
      return null;
    }
  }

  return null;
};

export const saveLongTermMemory = async ({
  personaId,
  messageId,
  extractedMemory,
}: {
  personaId: string;
  messageId: string;
  extractedMemory: LongTermMemoryExtractionResponse;
}): Promise<Memory | null> => {
  try {
    if (!extractedMemory.shouldWriteMemory || !extractedMemory.memory) {
      return null;
    }

    const { category, value, metadata, topics } = extractedMemory.memory;
    const now = new Date();

    const embedding = await createMemoryEmbedding(value);

    const memory = await Memory.create({
      personaId,
      type: MemoryTypeEnum.LTM,
      messageId,
      category,
      value,
      metadata: {
        ...metadata,
        lastReferencedAt: now,
      },
      topics,
      embedding,
      createdAt: now,
      lastUpdated: now,
    });

    return memory;
  } catch (err) {
    console.error("[saveLongTermMemory] Failed to save memory:", err);
    return null;
  }
};

export const extractTopics = async (
  messageText: string
): Promise<string[] | null> => {
  if (!messageText) return null;

  const payload = extractMessageTopics(messageText);

  if (!payload) return null;

  const response: OpenAI.Responses.Response = await openai.responses.create(
    payload
  );

  if (!response || !response.output_text) return null;
  const sanitizedOutput = sanitizeJSON(response.output_text);
  const extractedTopics: { topics: string[] } = JSON.parse(sanitizedOutput);

  if (!extractedTopics?.topics) return null;

  return extractedTopics.topics;
};

export const createMemoryEmbedding = async (
  text: string
): Promise<number[] | null> => {
  if (!text) return [];

  const payload = embeddingResponse(text);

  const embedding = await openai.embeddings.create(payload);

  const vector = embedding?.data?.[0]?.embedding;

  if (!vector) return [];

  return vector;
};

export const reinforceReferencedMemories = async (memories: Memory[]) => {
  const now = new Date();

  for (const m of memories) {
    const updatedMetadata = reinforceMemory(m.metadata, { now });

    await Memory.updateOne(
      { _id: m?._id },
      {
        $set: {
          metadata: updatedMetadata,
          lastUpdated: now,
        },
      }
    );

    // TODOS: Support converting short term memory to long term memory
    // if (m?.type === MemoryTypeEnum.STM_TRAIL && !m?.category) {
    //   const decision = shouldPromoteToLongTerm(
    //     { ...m, metadata: updatedMetadata },
    //     now
    //   );

    //   if (decision?.shouldPromote) {
    //     await Memory.updateOne(
    //       { _id: m?._id },
    //       {
    //         $set: {
    //           type: MemoryTypeEnum.LTM,
    //         },
    //       }
    //     );
    //   }
    // }
  }
};
