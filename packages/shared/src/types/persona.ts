export enum PersonaArchetype {
  Nurturer = "nurturer", // emotionally supportive, gentle, reassuring
  Companion = "companion", // steady presence, shared moments, loyalty
  Guide = "guide", // reflective, growth-oriented, asks questions
  Muse = "muse", // inspiring, creative, idea-sparking
  Protector = "protector", // grounding, safety-focused, stabilizing
  Thinker = "thinker", // analytical, thoughtful, meaning-seeking
  PlayfulSpirit = "playful_spirit", // light, humorous, teasing (non-flirt by default)
  GroundedPresence = "grounded_presence", // calm, centered, emotionally regulating
}

export type Persona = {
  userId: string;
  name: string;
  avatarUrl?: string;

  persona: {
    coreTraits: string[];
    tone: string;
    archetype: PersonaArchetype;
  };

  state: {
    availability: string; // online | idle | sleepy | busy-processing
  };

  createdAt: Date;
  updatedAt: Date;
};
