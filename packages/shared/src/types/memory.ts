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

export type MemoryMetadata = {
  importance: Number;
  confidence: Number;
  usageCount: Number;
  lastReferencedAt: Date;
  recencyWeight: Number;
  sentiment: Number;
  emotion: String;
  source: String;
};

export type Memory = {
  personaId: string;
  chatId: string;

  type: MemoryTypeEnum;

  category: LongTermMemoryCategoryEnum;

  value: string;

  metadata: MemoryMetadata;
  topics: string[];
  embedding: number[];

  messageId?: string;
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
