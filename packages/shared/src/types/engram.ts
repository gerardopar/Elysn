export enum EngramCategoryEnum {
  Identity = "identity",
  Preference = "preference",
  Boundary = "boundary",
  EmotionalPattern = "emotional_pattern",
}

export const engramCategoryEnum = Object.values(EngramCategoryEnum) as [
  string,
  ...string[]
];

export enum EngramSourceEnum {
  USER = "USER",
  AI = "AI",
}

export const engramSourceEnum = Object.values(EngramSourceEnum) as [
  string,
  ...string[]
];

export enum EngramEventTriggerEnum {
  Pattern = "pattern",
  Boundary = "boundary",
  EmotionalInflection = "emotional_inflection",
  ValueAlignment = "value_alignment",
  Repair = "repair",
  Reflection = "reflection",
}

export const engramEventTriggerEnum = Object.values(EngramEventTriggerEnum) as [
  string,
  ...string[]
];

export type Engram = {
  ownerId: string;
  ownerType: EngramSourceEnum;

  category: EngramCategoryEnum;
  content: string;

  confidence: number;
  stability: number;
  emotionalWeight: number;

  usageCount: number;

  derivedFrom?: {
    triggerType: EngramEventTriggerEnum;
    interactionIds: string[];
  };

  lastReinforcedAt: Date;
  createdAt: Date;
};
