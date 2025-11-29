import mongoose, { Schema, Document, Model } from "mongoose";

import { Persona as PersonaCore } from "@elysn/core";

export interface Persona extends PersonaCore, Document {}

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
