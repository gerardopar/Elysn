export type Interlink = {
  personaId: string;
  userId: string;

  trust: number;
  safety: number;
  warmth: number;
  tension: number;

  lastUserEmotion: string;
  lastAiEmotion: string;
  lastEmotionalTone: string;
  lastInteractionAt: Date;

  attunement: number;

  createdAt: Date;
  updatedAt: Date;
};
