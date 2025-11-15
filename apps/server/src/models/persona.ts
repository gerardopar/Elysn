import mongoose, { Schema, Document, Model } from "mongoose";

export interface Persona extends Document {
  userId: string;
  name: string;
  avatarUrl?: string;

  persona: {
    coreTraits: string[];
    tone: string;
    archetype: string;
    baseSystemPrompt: string;
    dynamicSystemPrompt: string;
  };

  relationship: {
    trust: number;
    closeness: number;
    history: string[];
  };

  emotion: {
    current: string;
    lastUpdated: Date;
  };

  state: {
    availability: string; // online | idle | sleepy | busy-processing
    energy: number; // 0–1
    attention: number; // 0–1
  };

  settings: {
    model: string;
    temperature: number;
    openness: number;
    memoryRetention: number;
  };

  memoryIndex: {
    longTermMemories: string[];
    shortTermSummary: string | null;
  };

  meta: {
    version: string;
    interactions: number;
    tokensUsed: number;
  };

  createdAt: Date;
  updatedAt: Date;
}

const PersonaSchema = new Schema<Persona>(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, default: "Elysn" },
    avatarUrl: { type: String },

    persona: {
      coreTraits: { type: [String], default: ["warm", "curious", "soft"] },
      tone: { type: String, default: "gentle" },
      archetype: { type: String, default: "Nurturer" },
      baseSystemPrompt: { type: String, default: "" },
      dynamicSystemPrompt: { type: String, default: "" },
    },

    relationship: {
      trust: { type: Number, default: 0.5 },
      closeness: { type: Number, default: 0.3 },
      history: { type: [String], default: [] },
    },

    emotion: {
      current: { type: String, default: "calm" },
      lastUpdated: { type: Date, default: Date.now },
    },

    state: {
      availability: { type: String, default: "online" },
      energy: { type: Number, default: 0.8 },
      attention: { type: Number, default: 0.8 },
    },

    settings: {
      model: { type: String, default: "gpt-4.1" },
      temperature: { type: Number, default: 0.7 },
      openness: { type: Number, default: 0.6 },
      memoryRetention: { type: Number, default: 0.8 },
    },

    memoryIndex: {
      longTermMemories: { type: [String], default: [] },
      shortTermSummary: { type: String, default: null },
    },

    meta: {
      version: { type: String, default: "1.0.0" },
      interactions: { type: Number, default: 0 },
      tokensUsed: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

export const Persona: Model<Persona> =
  mongoose.models.Persona || mongoose.model<Persona>("Persona", PersonaSchema);
