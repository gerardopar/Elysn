import mongoose, { Schema, Document, Model } from "mongoose";

import { Persona as PersonaCore, PERSONA_DEFAULTS } from "@elysn/core";

export interface Persona extends PersonaCore, Document {}

const PersonaSchema = new Schema<Persona>(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, default: "Elysn" },
    avatarUrl: { type: String },

    persona: {
      coreTraits: { type: [String], default: PERSONA_DEFAULTS.coreTraits },
      tone: { type: String, default: PERSONA_DEFAULTS.tone },
      archetype: { type: String, default: PERSONA_DEFAULTS.archetype },
    },

    state: {
      availability: { type: String, default: "online" },
    },
  },
  {
    timestamps: true,
  }
);

export const Persona: Model<Persona> =
  mongoose.models.Persona || mongoose.model<Persona>("Persona", PersonaSchema);
