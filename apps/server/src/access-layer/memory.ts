import { Memory } from "../models/memory";

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

export const getLongTermMemories = async (
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
