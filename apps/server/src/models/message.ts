import mongoose, { Schema, Document, Model } from "mongoose";

import { MessageSenderEnum } from "@elysn/shared";

export interface Message extends Document {
  chatId: mongoose.Types.ObjectId;
  userId: string;
  sender: MessageSenderEnum;
  text: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

const MessageSchema = new Schema<Message>(
  {
    chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
    userId: { type: String, required: true },
    sender: {
      type: String,
      enum: [MessageSenderEnum.USER, MessageSenderEnum.AI],
      required: true,
    },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

MessageSchema.index({ chatId: 1, timestamp: -1 }); // fetch messages by chat
MessageSchema.index({ userId: 1, timestamp: -1 });

export const Message: Model<Message> =
  mongoose.models.Message || mongoose.model<Message>("Message", MessageSchema);
