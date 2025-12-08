import { Memory } from "../models/memory";

import {
  buildLongTermMemoryFilter,
  getRelevantLTMMemories,
  rankMemoriesByScore,
} from "@elysn/core";

import { MemoryTypeEnum } from "@elysn/shared";
import { reinforceReferencedMemories } from "src/helpers/memory.helpers";

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
  const { limit = 100 } = options || {};

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
  options: {
    minImportance?: number;
    maxAgeMonths?: number;
    limit?: number;
    reinforce?: boolean;
  } = {}
): Promise<Memory[]> => {
  const {
    minImportance = 0.3,
    maxAgeMonths = 12,
    limit = 10,
    reinforce = true,
  } = options;

  // metadata-based filtering (broad pass)
  const metadataFiltered = await getMetadataFilteredLongTermMemories(
    personaId,
    topics,
    { minImportance, maxAgeMonths } // passes options down
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
  const ranked = rankMemoriesByScore(candidateMemories);
  const topRanked = ranked.slice(0, limit).map((r) => r.memory);

  // Reinforce only the memories actually used to build the context.
  if (reinforce && topRanked.length > 0) {
    // non-blocking
    reinforceReferencedMemories(topRanked as Memory[]).catch((err) =>
      console.warn("[getLongTermMemories] Reinforcement failed:", err)
    );
  }

  return topRanked as Memory[];
};
