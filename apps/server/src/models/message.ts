import mongoose, { Schema, Document, Model } from "mongoose";
import { MessageSenderEnum } from "@elysn/shared";

import { type Message as MessageCore } from "@elysn/core";

export interface Message extends MessageCore, Document {}

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
      type: new Schema(
        {
          emotion: { type: String },
          intent: { type: String },
          memoryTag: { type: String },
          isMemoryWorthy: { type: Boolean },
          topics: { type: [String], default: [] },
          embedding: { type: [Number], default: [] },
        },
        { _id: false }
      ),
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
