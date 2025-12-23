export enum PersonaEmotionEnum {
  Calm = "calm",
  Warm = "warm",
  Protective = "protective",
  Uneasy = "uneasy",
  Firm = "firm",
  Reflective = "reflective",
}

export enum PersonaIntentEnum {
  Comfort = "comfort",
  Guide = "guide",
  SetBoundary = "set_boundary",
  Reflect = "reflect",
  Repair = "repair",
  Clarify = "clarify",
}

export enum PersonaToneShiftEnum {
  Softened = "softened",
  Slowed = "slowed",
  Firmed = "firmed",
  Neutralized = "neutralized",
}

export enum MessageSenderEnum {
  USER = "USER",
  AI = "AI",
}

export type PersonaResponseInterlinkDelta = {
  trust: number;
  warmth: number;
  tension: number;
  safety: number;
};

export type PersonaResponseFlags = {
  boundaryAsserted?: boolean;
  boundaryTested?: boolean;
  repairAttempted?: boolean;
  repairSucceeded?: boolean;
};

export interface PersonaResponseMeta {
  personaEmotion: PersonaEmotionEnum;
  dominantIntent: PersonaIntentEnum;
  toneShift?: PersonaToneShiftEnum;

  interlinkDelta: PersonaResponseInterlinkDelta;

  flags?: PersonaResponseFlags;

  createdAt: Date;
}

export type MessageMetaData = {
  emotion?: string;
  intent?: string;
  memoryTag?: string;
  isMemoryWorthy?: boolean;
  topics?: string[];
  embedding?: number[];

  personaResponseMeta?: PersonaResponseMeta;
};

export type Message = {
  id: string;
  userId: string;
  chatId: string | null | undefined;
  personaId?: string | null | undefined;
  sender: MessageSenderEnum;
  text: string;
  timestamp: number;
  metadata?: MessageMetaData;
};

export type MessageInput = {
  chatId?: string;
  sender: MessageSenderEnum;
  text: string;
  metadata?: MessageMetaData;
};
