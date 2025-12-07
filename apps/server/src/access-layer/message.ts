import mongoose from "mongoose";

import { Message } from "../models/message";
import { Chat } from "../models/chat";

import { MessageSenderEnum } from "@elysn/shared";

/**
 * Create a new message and update its parent chat's timestamp.
 */
export const createMessage = async (
  {
    chatId,
    userId,
    personaId,
    sender,
    text,
    metadata,
    embedding,
  }: {
    chatId: string;
    userId: string;
    personaId: string;
    sender: MessageSenderEnum;
    text: string;
    metadata?: Record<string, any> | null;
    embedding?: number[] | null;
  },
  session?: mongoose.ClientSession
) => {
  const message = new Message({
    chatId,
    userId,
    personaId,
    sender,
    text: text.trim(),
    metadata,
    embedding,
  });

  // Save message (in or out of transaction)
  if (session) {
    await message.save({ session });

    // Also update the chat timestamp WITH session
    await Chat.findByIdAndUpdate(
      chatId,
      { $set: { updatedAt: new Date() }, $inc: { messagesCount: 1 } },
      { session }
    );
  } else {
    await message.save();

    await Chat.findByIdAndUpdate(chatId, {
      $set: { updatedAt: new Date() },
      $inc: { messagesCount: 1 },
    });
  }

  return message;
};

export const getRecentMessages = async (
  chatId: string,
  limit: number = 10
): Promise<Message[]> => {
  const messages = await Message.find({ chatId })
    .sort({ timestamp: -1 })
    .limit(limit)
    .lean<Message[]>();

  return messages.reverse();
};

/**
 * Delete a message by ID.
 */
export const deleteMessage = async (id: string) => {
  return Message.findByIdAndDelete(id);
};

/**
 * Update a message's fields and return the updated document.
 */
export const updateMessage = async (
  id: string,
  update: Partial<Record<string, any>>
) => {
  return Message.findByIdAndUpdate(id, update, { new: true });
};

export const getMessages = async (chatId: string, limit: number = 100) => {
  return Message.find({ chatId })
    .sort({ timestamp: 1 }) // chronological order
    .limit(limit) // optional pagination
    .lean();
};

export const getMessage = async (message: Message | string) => {
  if (message instanceof Message || typeof message !== "string") return message;
  return Message.findById(message).lean();
};

export const updateMessageTopics = async (id: string, topics: string[]) => {
  const message = await getMessage(id);
  if (!message) return null;

  return Message.findByIdAndUpdate(
    id,
    { metadata: { ...message.metadata, topics } },
    { new: true }
  );
};
