import mongoose, { Schema, Document, Model } from "mongoose";

import { type Chat as ChatCore } from "@elysn/core";

export interface Chat extends ChatCore, Document {}

const ChatSchema = new Schema<Chat>(
  {
    userId: { type: String, required: true },
    personaId: { type: String, required: true },
    title: { type: String },
    topic: { type: String },
    messagesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ChatSchema.index({ userId: 1, updatedAt: -1 });

export const Chat: Model<Chat> =
  mongoose.models.Chat || mongoose.model<Chat>("Chat", ChatSchema);
