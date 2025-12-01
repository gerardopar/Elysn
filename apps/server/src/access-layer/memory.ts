import { Memory } from "../models/memory";

import { buildLongTermMemoryFilter, getRelevantLTMMemories } from "@elysn/core";

import { MemoryTypeEnum } from "@elysn/shared";

export const getMemory = async (id: string): Promise<Memory | null> => {
  const memory = await Memory.findById(id);
  return memory;
};

export const getMemoryByPersonaId = async (
  personaId: string
): Promise<Memory[] | null> => {
  const memory = await Memory.find({ personaId });
  return memory;
};

export const getMemoryByChatId = async (
  chatId: string
): Promise<Memory[] | null> => {
  const memory = await Memory.find({ chatId });
  return memory;
};

export const getMemoryByPersonaIdAndChatId = async (
  personaId: string,
  chatId: string
): Promise<Memory[] | null> => {
  const memory = await Memory.find({ personaId, chatId });
  return memory;
};

export const getLatestShortTermMemory = async (
  personaId: string,
  chatId: string
): Promise<Memory | null> => {
  const memory = await Memory.findOne({
    personaId,
    chatId,
    type: MemoryTypeEnum.STM_TRAIL,
  }).sort({ toMessageCount: -1 });

  return memory || null;
};

export const getLongTermMemoriesSimple = async (
  personaId: string,
  limit = 10
): Promise<Memory[]> => {
  return Memory.find({
    personaId,
    type: MemoryTypeEnum.LTM,
  })
    .sort({ importance: -1 })
    .limit(limit);
};

export const getMetadataFilteredLongTermMemories = async (
  personaId: string,
  topics?: string[],
  options?: {
    minImportance?: number;
    maxAgeMonths?: number;
    limit?: number;
  }
): Promise<Memory[]> => {
  const filter = buildLongTermMemoryFilter(personaId, topics, options);
  const { limit = 100 } = options || {};

  let memories = await Memory.find(filter)
    .sort({ importance: -1, lastUpdated: -1 })
    .limit(limit);

  //fall back - If no topic match,
  if (memories.length === 0 && topics?.length) {
    const fallbackFilter = buildLongTermMemoryFilter(personaId, [], options);
    memories = await Memory.find(fallbackFilter)
      .sort({ importance: -1, lastUpdated: -1 })
      .limit(limit);
  }

  return memories;
};

export const getLongTermMemories = async (
  personaId: string,
  topics?: string[],
  embedding?: number[] | null,
  options?: {
    minImportance?: number;
    maxAgeMonths?: number;
    limit?: number;
  }
): Promise<Memory[]> => {
  // Get memories with metadata filtering
  const memories = await getMetadataFilteredLongTermMemories(
    personaId,
    topics,
    options
  );

  // get memories with embedding filtering
  // @ts-expect-error expected type Memory[]
  const relevantMemories: Memory[] = await getRelevantLTMMemories(
    memories,
    embedding,
    options?.limit
  );

  if (relevantMemories.length > 0) {
    return relevantMemories;
  }

  return memories;
};
