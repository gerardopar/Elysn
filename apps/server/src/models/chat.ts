import mongoose, { Schema, Document, Model } from "mongoose";

export interface Chat extends Document {
  userId: string;
  title?: string;
  topic?: string;
  messages: string[]; // message IDs
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<Chat>(
  {
    userId: { type: String, required: true },
    title: { type: String, required: false },
    topic: { type: String, required: false },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);

export const Chat: Model<Chat> = mongoose.model<Chat>("Chat", ChatSchema);
