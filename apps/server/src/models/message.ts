import mongoose, { Schema, Document, Model } from "mongoose";

export interface Message extends Document {
  userId: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

const MessageSchema = new Schema<Message>(
  {
    userId: { type: String, required: true },
    sender: { type: String, enum: ["user", "ai"], required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

// Index to optimize user/message lookups
MessageSchema.index({ userId: 1, timestamp: -1 });

export const Message: Model<Message> =
  mongoose.models.Message || mongoose.model<Message>("Message", MessageSchema);
