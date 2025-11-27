import mongoose, { Schema, Document, Model } from "mongoose";

import { LongTermMemoryCategoryEnum, MemoryTypeEnum } from "@elysn/shared";

import { type Memory as MemoryCore } from "@elysn/core";

export interface Memory extends MemoryCore, Document {}

const MemorySchema = new Schema({
  personaId: { type: String, index: true },
  chatId: { type: String, index: true }, // optional for chat-scoped memory

  // What type of memory is this?
  type: {
    type: String,
    enum: MemoryTypeEnum,
    required: true,
  },

  // Categorization for LTM
  category: {
    type: String,
    enum: LongTermMemoryCategoryEnum,
  },

  // The content of the memory
  value: { type: String, required: true },

  // Metadata
  importance: { type: Number, default: 0.5 }, // how "strong" this memory is
  weight: { type: Number, default: 1.0 }, // decays over time
  sentiment: { type: Number }, // -1 to 1
  emotion: { type: String }, // "stressed", "happy", etc.
  topics: [String],

  messageId: { type: String }, // where it came from
  fromMessageCount: Number,
  toMessageCount: Number,

  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
});

// index for fast persona memory retrieval
MemorySchema.index({ personaId: 1, importance: -1 });

export const Memory: Model<Memory> =
  mongoose.models.Memory || mongoose.model<Memory>("Memory", MemorySchema);
