import mongoose, { Schema, Document, Model } from "mongoose";
import { LongTermMemoryCategoryEnum, MemoryTypeEnum } from "@elysn/shared";
import { type Memory as MemoryCore } from "@elysn/core";

export interface Memory extends MemoryCore, Document {}

const MemoryMetadataSchema = new Schema(
  {
    importance: { type: Number, default: 0.5 },
    confidence: { type: Number, default: 0.8 },
    usageCount: { type: Number, default: 0 },

    lastReferencedAt: { type: Date, default: Date.now },
    recencyWeight: { type: Number, default: 1.0 },

    sentiment: { type: Number, default: 0 },
    emotion: { type: String },

    source: { type: String, default: "user_message" },
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
