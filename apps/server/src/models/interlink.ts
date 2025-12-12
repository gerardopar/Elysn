import mongoose, { Schema, Document, Model } from "mongoose";

import { type Interlink as InterlinkCore } from "@elysn/core";

export interface Interlink extends InterlinkCore, Document {}

const InterlinkSchema = new Schema({
  personaId: { type: String, required: true, index: true },
  userId: { type: String, required: true, index: true },

  trust: { type: Number, default: 0.5 },
  closeness: { type: Number, default: 0.5 },
  safety: { type: Number, default: 0.5 },
  warmth: { type: Number, default: 0.5 },
  tension: { type: Number, default: 0 },

  lastUserEmotion: { type: String, default: "" },
  lastAiEmotion: { type: String, default: "" },
  lastEmotionalTone: { type: String, default: "" },
  lastInteractionAt: { type: Date, default: Date.now },

  attunement: { type: Number, default: 0.5 },
  rapport: { type: Number, default: 0.5 },
  openness: { type: Number, default: 0.5 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

InterlinkSchema.index({ userId: 1, personaId: 1 }, { unique: true });

const Interlink: Model<Interlink> =
  mongoose.models.Interlink ||
  mongoose.model<Interlink>("Interlink", InterlinkSchema);
