import mongoose, { Schema, Document, Model } from "mongoose";
import {
  MessageSenderEnum,
  PersonaEmotionEnum,
  PersonaIntentEnum,
  PersonaToneShiftEnum,
} from "@elysn/shared";

import { type Message as MessageCore } from "@elysn/core";

export interface Message extends MessageCore, Document {}

const PersonaResponseMetaSchema = new Schema(
  {
    personaEmotion: {
      type: String,
      enum: Object.values(PersonaEmotionEnum),
      required: true,
    },

    dominantIntent: {
      type: String,
      enum: Object.values(PersonaIntentEnum),
      required: true,
    },

    toneShift: {
      type: String,
      enum: Object.values(PersonaToneShiftEnum),
    },

    interlinkDelta: {
      trust: { type: Number, required: true },
      warmth: { type: Number, required: true },
      tension: { type: Number, required: true },
      safety: { type: Number, required: true },
    },

    flags: {
      boundaryAsserted: { type: Boolean },
      boundaryTested: { type: Boolean },
      repairAttempted: { type: Boolean },
      repairSucceeded: { type: Boolean },
    },

    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  { _id: false }
);

export const MessageMetadataSchema = new Schema(
  {
    emotion: { type: String },
    intent: { type: String },
    memoryTag: { type: String },
    isMemoryWorthy: { type: Boolean },
    topics: { type: [String], default: [] },
    embedding: { type: [Number], default: [] },
    personaResponseMeta: {
      type: PersonaResponseMetaSchema,
      required: false,
    },
  },
  {
    _id: false,
  }
);

const MessageSchema = new Schema<Message>(
  {
    chatId: { type: String, ref: "Chat", required: true },
    userId: { type: String, required: true },
    personaId: { type: String, required: true },

    sender: {
      type: String,
      enum: [MessageSenderEnum.USER, MessageSenderEnum.AI],
      required: true,
    },

    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },

    metadata: {
      type: MessageMetadataSchema,
    },
  },
  { timestamps: true }
);

// Indexes for fast lookups
MessageSchema.index({ chatId: 1, personaId: 1, timestamp: -1 });
MessageSchema.index({ userId: 1, personaId: 1, timestamp: -1 });
MessageSchema.index({ personaId: 1 });

export const Message: Model<Message> =
  mongoose.models.Message || mongoose.model<Message>("Message", MessageSchema);
