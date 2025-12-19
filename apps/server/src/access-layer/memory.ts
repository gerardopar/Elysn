import { Memory } from "../models/memory.js";
import { Interlink } from "../models/interlink.js";

import {
  selectMemoriesWithCategoryCaps,
  buildLongTermMemoryFilter,
  getRelevantLTMMemories,
  rankMemoriesByScore,
  MEMORY_FILTER_DEFAULTS,
} from "@elysn/core";

import { MemoryTypeEnum } from "@elysn/shared";
import { reinforceReferencedMemories } from "../helpers/memory.helpers.js";

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
    .sort({ "metadata.importance": -1 })
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
  const { limit = MEMORY_FILTER_DEFAULTS.fetchLimit } = options || {};

  let memories = await Memory.find(filter)
    .sort({ "metadata.importance": -1, lastUpdated: -1 })
    .limit(limit);

  //fall back - If no topic match,
  if (memories.length === 0 && topics?.length) {
    const fallbackFilter = buildLongTermMemoryFilter(personaId, [], options);
    memories = await Memory.find(fallbackFilter)
      .sort({ "metadata.importance": -1, lastUpdated: -1 })
      .limit(limit);
  }

  return memories;
};

export const getLongTermMemories = async (
  personaId: string,
  topics?: string[],
  embedding?: number[] | null,
  interlink?: Interlink | null,
  options: {
    minImportance?: number;
    maxAgeMonths?: number;
    limit?: number;
    reinforce?: boolean;
  } = {}
): Promise<Memory[]> => {
  const {
    minImportance = MEMORY_FILTER_DEFAULTS.minImportance,
    maxAgeMonths = MEMORY_FILTER_DEFAULTS.maxAgeMonths,
    limit = MEMORY_FILTER_DEFAULTS.fetchLimit,
    reinforce = true,
  } = options;

  // metadata-based filtering (broad pass)
  const metadataFiltered = await getMetadataFilteredLongTermMemories(
    personaId,
    topics,
    { minImportance, maxAgeMonths, limit }
  );

  // semantic filtering (embedding similarity)
  let embeddingRelevant: Memory[] = [];

  if (embedding && embedding.length > 0) {
    // @ts-expect-error expected type Memory[]
    embeddingRelevant = await getRelevantLTMMemories(
      metadataFiltered,
      embedding,
      limit
    );
  }

  const candidateMemories =
    embeddingRelevant.length > 0 ? embeddingRelevant : metadataFiltered;

  // Ranking phase: compute scoring, sort by score
  const ranked = rankMemoriesByScore(candidateMemories, new Date(), interlink);
  const topRanked = ranked.slice(0, MEMORY_FILTER_DEFAULTS.rankedLimit);

  // Categorize memories
  const categorized = selectMemoriesWithCategoryCaps(
    topRanked,
    MEMORY_FILTER_DEFAULTS.categorizedLimit,
    interlink
  );

  // Reinforce only the memories actually used to build the context.
  if (reinforce && categorized.length > 0) {
    // non-blocking
    reinforceReferencedMemories(categorized as Memory[]).catch((err) =>
      console.warn("[getLongTermMemories] Reinforcement failed:", err)
    );
  }

  return categorized as Memory[];
};
