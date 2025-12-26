import mongoose, { Schema, Document, Model } from "mongoose";

import {
  EngramSourceEnum,
  EngramCategoryEnum,
  EngramEventTriggerEnum,
  EngramScopeEnum,
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

    chatId: {
      type: String,
    },

    scope: {
      type: String,
      enum: Object.values(EngramScopeEnum),
      required: true,
      index: true,
      default: EngramScopeEnum.Thread,
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

    promotion: {
      fromScope: {
        type: String,
        enum: Object.values(EngramScopeEnum),
      },
      toScope: {
        type: String,
        enum: Object.values(EngramScopeEnum),
      },
      promotedAt: {
        type: Date,
      },
      supportingThreadCount: {
        type: Number,
        default: 0,
      },
    },

    candidateMeta: {
      statsSnapshot: {
        type: Schema.Types.Mixed,
      },

      personaMetaSnapshot: {
        type: Schema.Types.Mixed,
      },

      classification: {
        category: {
          type: String,
          enum: Object.values(EngramCategoryEnum),
        },
        rationale: {
          type: String,
        },
        confidence: {
          type: Number,
          min: 0,
          max: 1,
        },
      },

      interactionIds: {
        type: [String],
        default: [],
      },
    },

    lastReinforcedAt: {
      type: Date,
      index: true,
      default: Date.now,
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

// Fast lookup per owner
EngramSchema.index({ ownerId: 1, ownerType: 1 });

// Snapshot retrieval (emotionally relevant first)
EngramSchema.index({
  ownerId: 1,
  ownerType: 1,
  category: 1,
  emotionalWeight: -1,
});

// Decay & reinforcement scans
EngramSchema.index({ lastReinforcedAt: 1 });

// Promotion analytics / audits
EngramSchema.index({ "promotion.promotedAt": 1 }, { sparse: true });

// Prevent duplicate boundary engrams WITHIN the same scope
EngramSchema.index(
  {
    ownerId: 1,
    ownerType: 1,
    scope: 1,
    category: 1,
    content: 1,
  },
  {
    unique: true,
    partialFilterExpression: { category: "boundary" },
  }
);

EngramSchema.pre("save", function (next) {
  if (this.scope === EngramScopeEnum.Persona && this.candidateMeta) {
    return next(
      new Error("Persona-scoped engrams cannot retain candidateMeta")
    );
  }

  if (this.scope === EngramScopeEnum.Thread && !this.chatId) {
    return next(new Error("Thread-scoped engrams must have chatId"));
  }

  next();
});

export const Engram: Model<Engram> =
  mongoose.models.Engram || mongoose.model<Engram>("Engram", EngramSchema);
