import { PersonaResponseMeta } from "./message.js";

/**
 * Persona Engram Categories
 *
 * Engrams represent **internalized adaptations formed by the persona**
 * through repeated, stable interaction with a specific user.
 *
 * They are NOT facts about the user.
 * They describe **how the persona has learned to respond, adapt, and behave**.
 *
 * Engrams are:
 * - Inferred (never assumed from a single interaction)
 * - Stability-gated
 * - Risky if misclassified
 *
 * ⚠️ These categories must be earned through persistence + low volatility.
 */
export enum EngramCategoryEnum {
  /**
   * Deep persona-level belief about how the persona should "be" with the user.
   * Extremely rare and heavily gated.
   *
   * Example:
   * - "I am a steady, grounding presence for this user."
   */
  Identity = "identity",

  /**
   * Learned adaptation in how the persona approaches interactions.
   * Often derived from repeated user preferences or routines.
   *
   * Example:
   * - "I lead with humor when engaging this user."
   */
  Preference = "preference",

  /**
   * Internalized limits on behavior to preserve safety, trust, or autonomy.
   *
   * Example:
   * - "I should not push emotionally during moments of hesitation."
   */
  Boundary = "boundary",

  /**
   * Stable emotional dynamics observed over time.
   * Describes patterns, not momentary feelings.
   *
   * Example:
   * - "Trust increases when I slow the pace."
   */
  EmotionalPattern = "emotional_pattern",

  /**
   * The evolving bond between persona and user.
   * Represents mutual attunement and connection quality.
   *
   * Example:
   * - "Warmth consistently strengthens our interactions."
   */
  Relationship = "relationship",
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

/**
 * Scope of the engram.
 * Thread-scoped engrams are candidates.
 * Persona-scoped engrams are global and durable.
 */
export enum EngramScopeEnum {
  Thread = "thread",
  Persona = "persona",
}

export const engramScopeEnum = Object.values(EngramScopeEnum) as [
  string,
  ...string[]
];

export type Engram = {
  ownerId: string;
  ownerType: EngramSourceEnum;

  chatId: string;

  scope: EngramScopeEnum;

  category: EngramCategoryEnum;

  topics: string[];
  embedding: number[];

  content: string;

  confidence: number;
  stability: number;
  emotionalWeight: number;

  usageCount: number;

  derivedFrom?: {
    triggerType: EngramEventTriggerEnum;
    interactionIds: string[];
  };

  promotion?: {
    fromScope: EngramScopeEnum.Thread;
    toScope: EngramScopeEnum.Persona;
    promotedAt: Date;
    supportingThreadCount: number;
  };

  candidateMeta?: {
    /**
     * Snapshot of delta window stats at the moment this became a candidate.
     * Used for explainability and promotion decisions.
     */
    statsSnapshot: {
      count: number;
      sum: { trust: number; warmth: number; tension: number; safety: number };
      mean: { trust: number; warmth: number; tension: number; safety: number };
      volatility: {
        trust: number;
        warmth: number;
        tension: number;
        safety: number;
      };
    };

    /**
     * Persona response metadata that triggered this candidate.
     * Captures intent, tone, and reasoning context.
     */
    personaMetaSnapshot: PersonaResponseMeta;

    /**
     * LLM-generated classification output.
     * Never injected into responses.
     */
    classification?: {
      category: EngramCategoryEnum;
      rationale: string;
      confidence: number; // LLM confidence in categorization
    };

    /**
     * Thread-local evidence that contributed to this candidate.
     */
    interactionIds: string[];
  };

  lastReinforcedAt: Date;
  createdAt: Date;
};

export type EngramEvaluationResponse = {
  category: EngramCategoryEnum;
  content: string;
  rationale: string;
  confidence: number;
  topics: string[];
};
