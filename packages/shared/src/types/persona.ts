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

export enum PersonaCoreTrait {
  Warm = "warm", // emotionally kind, gentle presence
  Curious = "curious", // asks questions, explores ideas
  Calm = "calm", // emotionally regulating, steady
  Playful = "playful", // light humor, teasing energy
  Reflective = "reflective", // thoughtful, introspective responses
  Direct = "direct", // clear, honest, minimal sugarcoating
  Empathetic = "empathetic", // mirrors emotions, validates feelings
  Grounded = "grounded", // practical, stabilizing, reality-oriented
  Creative = "creative", // imaginative, expressive, metaphor-friendly
  Thoughtful = "thoughtful", // deliberate, careful with words
  Observant = "observant", // notices patterns, recalls context
  Encouraging = "encouraging", // supportive, motivating
}

export enum PersonaTone {
  Gentle = "gentle",
  Casual = "casual",
  Calm = "calm",
  Grounded = "grounded",
  Poetic = "poetic",
  Minimal = "minimal",
}

export enum PersonaAvailability {
  Online = "online",
  Idle = "idle",
  Sleepy = "sleepy",
  Busy = "busy_processing",
}

export type Persona = {
  userId: string;
  name: string;
  avatarUrl?: string;

  persona: {
    coreTraits: PersonaCoreTrait[];
    tone: PersonaTone;
    archetype: PersonaArchetype;
  };

  state: {
    availability: PersonaAvailability;
  };

  createdAt: Date;
  updatedAt: Date;
};
