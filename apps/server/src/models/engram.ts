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

// Fast lookup for active engrams per owner
EngramSchema.index({ ownerId: 1, ownerType: 1 });

// Snapshot retrieval ordering
EngramSchema.index({
  ownerId: 1,
  ownerType: 1,
  category: 1,
  emotionalWeight: -1,
});

// Reinforcement & decay jobs
EngramSchema.index({
  lastReinforcedAt: 1,
});

// Prevent duplicate boundary engrams with identical content
EngramSchema.index(
  { ownerId: 1, ownerType: 1, category: 1, content: 1 },
  { unique: true, partialFilterExpression: { category: "boundary" } }
);

export const Engram: Model<Engram> =
  mongoose.models.Engram || mongoose.model<Engram>("Engram", EngramSchema);
