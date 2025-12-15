export enum MemoryTypeEnum {
  LTM = "LTM",
  STM = "STM",
  STM_TRAIL = "STM_TRAIL",
}

export enum MemorySourceEnum {
  USER = "USER",
  AI = "AI",
}

export const memorySourceEnum = Object.values(MemorySourceEnum) as [
  string,
  ...string[]
];

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
  importance: number;
  confidence: number;
  usageCount: number;
  lastReferencedAt: Date;
  recencyWeight: number;
  sentiment: number;
  emotion: string;
  source: MemorySourceEnum;
  deprecatedAt?: Date;
  supersedesMemoryId?: string;
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
    value: string;
    topics: string[];
    category: LongTermMemoryCategoryEnum;

    metadata: MemoryMetadata;
  } | null;
};

export type ShortTermMemorySummaryResponse = {
  summary: string;
  metadata: MemoryMetadata;
};

export enum MemoryRelationshipEnum {
  Reinforce = "reinforce",
  Contradict = "contradict",
  Supersede = "supersede",
  Unrelated = "unrelated",
}

export const memoryRelationshipEnum = Object.values(MemoryRelationshipEnum) as [
  string,
  ...string[]
];
