import mongoose, { Schema, Document, Model } from "mongoose";

import { Persona as PersonaCore, PERSONA_DEFAULTS } from "@elysn/core";

import { PersonaCoreTrait, PersonaArchetype, PersonaTone } from "@elysn/shared";

export interface Persona extends PersonaCore, Document {}

const PersonaSchema = new Schema<Persona>(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, default: "Elysn" },
    avatarUrl: { type: String },

    persona: {
      coreTraits: {
        type: [String],
        enum: Object.values(PersonaCoreTrait),
        default: PERSONA_DEFAULTS.coreTraits,
        validate: {
          validator: (traits: string[]) =>
            Array.isArray(traits) && traits.length >= 2 && traits.length <= 4,
          message: "Persona must have between 2 and 4 core traits.",
        },
      },
      tone: {
        type: String,
        enum: Object.values(PersonaTone),
        default: PERSONA_DEFAULTS.tone,
      },
      archetype: {
        type: String,
        enum: Object.values(PersonaArchetype),
        default: PERSONA_DEFAULTS.archetype,
      },
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
