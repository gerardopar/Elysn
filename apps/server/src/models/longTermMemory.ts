import mongoose, { Schema, Document, Model } from "mongoose";

import { LongTermMemoryCategoryEnum } from "@elysn/shared";

import { type LongTermMemory as LongTermMemoryCore } from "@elysn/core";

export interface LongTermMemory extends LongTermMemoryCore, Document {}

const LongTermMemorySchema = new Schema<LongTermMemory>(
  {
    personaId: { type: String, required: true, index: true },

    category: {
      type: String,
      enum: LongTermMemoryCategoryEnum,
      required: true,
    },

    value: { type: String, required: true },
    importance: { type: Number, default: 0.5 },

    messageId: { type: String },

    lastUpdated: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // auto adds createdAt + updatedAt
  }
);

// Recommended index for fast persona memory retrieval
LongTermMemorySchema.index({ personaId: 1, importance: -1 });

export const LongTermMemory: Model<LongTermMemory> =
  mongoose.models.LongTermMemory ||
  mongoose.model<LongTermMemory>("LongTermMemory", LongTermMemorySchema);
