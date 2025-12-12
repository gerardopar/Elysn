import mongoose, { Schema, Document, Model } from "mongoose";
import {
  LongTermMemoryCategoryEnum,
  MemoryTypeEnum,
  MemorySourceEnum,
} from "@elysn/shared";
import { type Memory as MemoryCore, MEMORY_DEFAULTS } from "@elysn/core";

export interface Memory extends MemoryCore, Document {}

const MemoryMetadataSchema = new Schema(
  {
    importance: { type: Number, default: MEMORY_DEFAULTS.importance },
    confidence: { type: Number, default: MEMORY_DEFAULTS.confidence },
    usageCount: { type: Number, default: 0 },

    lastReferencedAt: { type: Date, default: Date.now },
    recencyWeight: { type: Number, default: 1.0 },

    sentiment: { type: Number, default: MEMORY_DEFAULTS.sentiment },
    emotion: { type: String },

    source: {
      type: String,
      enum: Object.values(MemorySourceEnum),
      default: MEMORY_DEFAULTS.source,
    },
  },
  { _id: false }
);

const MemorySchema = new Schema({
  personaId: { type: String, index: true },
  chatId: { type: String, index: true },

  type: {
    type: String,
    enum: Object.values(MemoryTypeEnum),
    required: true,
  },

  category: {
    type: String,
    enum: Object.values(LongTermMemoryCategoryEnum),
  },

  value: { type: String, required: true },

  metadata: {
    type: MemoryMetadataSchema,
    default: () => ({}),
  },

  topics: {
    type: [String],
    default: [],
  },

  embedding: {
    type: [Number],
    default: [],
  },

  messageId: { type: String },
  fromMessageCount: Number,
  toMessageCount: Number,

  lastUpdated: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

MemorySchema.index({
  personaId: 1,
  "metadata.importance": -1,
  "metadata.lastReferencedAt": -1,
});

MemorySchema.index({ personaId: 1, "metadata.lastReferencedAt": -1 });

MemorySchema.index({ personaId: 1, topics: 1 });

export const Memory: Model<Memory> =
  mongoose.models.Memory || mongoose.model<Memory>("Memory", MemorySchema);
