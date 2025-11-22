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

export interface LongTermMemory {
  personaId: string;
  category: LongTermMemoryCategoryEnum;
  value: string;
  importance: number;
  messageId?: string;
  lastUpdated: Date;
  createdAt: Date;
}

export type LongTermMemoryExtractionResponse = {
  shouldWriteMemory: boolean;
  memory: {
    category: LongTermMemoryCategoryEnum;
    value: string;
    importance: number;
  } | null;
};
