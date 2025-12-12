import mongoose, { Schema, Document, Model } from "mongoose";

import {
  type Interlink as InterlinkCore,
  INTERLINK_DEFAULTS,
} from "@elysn/core";

export interface Interlink extends InterlinkCore, Document {}

const InterlinkSchema = new Schema({
  personaId: { type: String, required: true, index: true },
  userId: { type: String, required: true, index: true },

  trust: { type: Number, default: INTERLINK_DEFAULTS.trust },
  closeness: { type: Number, default: INTERLINK_DEFAULTS.closeness },
  safety: { type: Number, default: INTERLINK_DEFAULTS.safety },
  warmth: { type: Number, default: INTERLINK_DEFAULTS.warmth },
  tension: { type: Number, default: INTERLINK_DEFAULTS.tension },

  lastUserEmotion: { type: String, default: "" },
  lastAiEmotion: { type: String, default: "" },
  lastEmotionalTone: { type: String, default: "" },
  lastInteractionAt: { type: Date, default: Date.now },

  attunement: { type: Number, default: INTERLINK_DEFAULTS.attunement },
  rapport: { type: Number, default: INTERLINK_DEFAULTS.rapport },
  openness: { type: Number, default: INTERLINK_DEFAULTS.openness },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

InterlinkSchema.index({ userId: 1, personaId: 1 }, { unique: true });

export const Interlink: Model<Interlink> =
  mongoose.models.Interlink ||
  mongoose.model<Interlink>("Interlink", InterlinkSchema);
