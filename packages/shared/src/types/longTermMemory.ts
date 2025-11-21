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

export interface LongTermMemory {
  personaId: string;
  category: LongTermMemoryCategoryEnum;
  value: string;
  importance: number;
  messageId?: string;
  lastUpdated: Date;
  createdAt: Date;
}
