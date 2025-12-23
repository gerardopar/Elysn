import mongoose, { Schema, Document, Model } from "mongoose";

import {
  EngramSourceEnum,
  EngramCategoryEnum,
  EngramEventTriggerEnum,
} from "@elysn/shared";
import { type Engram as EngramCore } from "@elysn/core";
import { ENGRAM_DEFAULTS } from "@elysn/core";

export interface Engram extends EngramCore, Document {}

const EngramSchema = new Schema<Engram>(
  {
    ownerId: {
      type: String,
      required: true,
      index: true,
    },

    ownerType: {
      type: String,
      enum: Object.values(EngramSourceEnum),
      required: true,
      index: true,
    },

    category: {
      type: String,
      enum: Object.values(EngramCategoryEnum),
      required: true,
      index: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    confidence: {
      type: Number,
      required: true,
      min: ENGRAM_DEFAULTS.min,
      max: ENGRAM_DEFAULTS.max,
    },

    stability: {
      type: Number,
      required: true,
      min: ENGRAM_DEFAULTS.min,
      max: ENGRAM_DEFAULTS.max,
    },

    emotionalWeight: {
      type: Number,
      required: true,
      min: ENGRAM_DEFAULTS.min,
      max: ENGRAM_DEFAULTS.max,
    },

    usageCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    derivedFrom: {
      triggerType: {
        type: String,
        enum: Object.values(EngramEventTriggerEnum),
      },

      interactionIds: {
        type: [String],
        default: [],
      },
    },

    lastReinforcedAt: {
      type: Date,
      index: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  {
    versionKey: false,
  }
);

export const Engram: Model<Engram> =
  mongoose.models.Engram || mongoose.model<Engram>("Engram", EngramSchema);
