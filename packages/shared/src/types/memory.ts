export enum MemoryTypeEnum {
  LTM = "LTM",
  STM = "STM",
  STM_TRAIL = "STM_TRAIL",
}

export enum LongTermMemoryCategoryEnum {
  Preference = "preference",
  Biographical = "biographical",
  Routine = "routine",
  Relationship = "relationship",
  Project = "project",
  Emotion = "emotion",
  Goal = "goal",
  Value = "value",
  Milestone = "milestone",
}

export const longTermMemoryCategoryEnum = Object.values(
  LongTermMemoryCategoryEnum
) as [string, ...string[]];

export type Memory = {
  personaId: string; // owner of memory
  chatId: string; // optional for chat-scoped memory

  type: MemoryTypeEnum;

  category: LongTermMemoryCategoryEnum; // long term memory category

  value: string; // memory

  importance: number; // 0-1 weighting
  weight: number;
  sentiment: number;
  emotion: string;
  topics: string[];
  embedding: number[];

  messageId?: string; // message where the memory was extracted
  fromMessageCount?: number;
  toMessageCount?: number;

  lastUpdated: Date;
  createdAt: Date;
};

export type LongTermMemoryExtractionResponse = {
  shouldWriteMemory: boolean;
  memory: {
    category: LongTermMemoryCategoryEnum;
    value: string;
    importance: number;
    topics: string[];
  } | null;
};
