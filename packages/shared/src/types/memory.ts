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

/**
 * User Long-Term Memory Categories
 *
 * These represent **facts, preferences, and context about the user**.
 * They are declarative, user-owned, and may be explicitly stated or inferred.
 *
 * LTM entries describe **who the user is**, **what they do**, and **what matters to them** —
 * NOT how the persona should behave.
 *
 * ⚠️ These categories should NEVER be treated as persona beliefs.
 */
export enum LongTermMemoryCategoryEnum {
  /** What the user likes or dislikes (e.g. food, habits, styles) */
  Preference = "preference",

  /** Factual life details about the user (job, location, background) */
  Biographical = "biographical",

  /** Repeated behaviors or schedules (e.g. works late, exercises mornings) */
  Routine = "routine",

  /** The user’s relationships with other people or entities */
  Relationship = "relationship",

  /** Ongoing work, studies, or personal initiatives */
  Project = "project",

  /** The user’s emotional states or tendencies */
  Emotion = "emotion",

  /** Long-term objectives or aspirations */
  Goal = "goal",

  /** Core beliefs or principles explicitly expressed by the user */
  Value = "value",

  /** Significant life events or achievements */
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
