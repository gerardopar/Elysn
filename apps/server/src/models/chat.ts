import mongoose, { Schema, Document, Model } from "mongoose";

export interface Chat extends Document {
  userId: string;
  personaId: string;
  title?: string;
  topic?: string;
  summary?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<Chat>(
  {
    userId: { type: String, required: true },
    personaId: { type: String, required: true },
    title: { type: String },
    topic: { type: String },
    summary: { type: String },
  },
  { timestamps: true }
);

ChatSchema.index({ userId: 1, updatedAt: -1 });

export const Chat: Model<Chat> =
  mongoose.models.Chat || mongoose.model<Chat>("Chat", ChatSchema);
