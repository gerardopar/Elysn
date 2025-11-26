import mongoose from "mongoose";

import { Chat } from "../models/chat";
import { Message } from "../models/message";

/**
 * Fetch all chats for a specific user.
 * Sorted by most recently updated.
 */
export const getChats = async (userId: string) => {
  return Chat.find({ userId }).sort({ updatedAt: -1 });
};

/**
 * Fetch a single chat by ID.
 */
export const getChat = async (id: string) => {
  return Chat.findById(id);
};

/**
 * Create a new chat for a user.
 */
export const createChat = async (
  {
    userId,
    personaId,
    title,
    topic,
  }: {
    userId: string;
    personaId: string;
    title?: string;
    topic?: string | null;
  },
  session?: mongoose.ClientSession
) => {
  const chat = new Chat({
    userId,
    personaId,
    title: title?.trim() || "New Chat",
    topic: topic?.trim() || null,
  });

  if (session) {
    return await chat.save({ session });
  }

  return await chat.save();
};

/**
 * Update an existing chat's properties.
 */
export const updateChat = async (
  id: string,
  {
    title,
    topic,
  }: {
    title?: string | null;
    topic?: string | null;
  }
) => {
  const update: Record<string, unknown> = {};

  if (title !== undefined) {
    const trimmed = title?.trim();
    update.title = trimmed && trimmed.length > 0 ? trimmed : "New Chat";
  }

  if (topic !== undefined) {
    const trimmed = topic?.trim();
    update.topic = trimmed && trimmed.length > 0 ? trimmed : null;
  }

  return Chat.findByIdAndUpdate(
    id,
    { $set: update },
    {
      new: true,
      runValidators: true,
    }
  );
};

/**
 * Delete a chat and cascade delete its messages.
 */
export const deleteChat = async (id: string) => {
  const session = await Chat.startSession();
  session.startTransaction();

  try {
    // Remove all messages for this chat
    await Message.deleteMany({ chatId: id }).session(session);

    // Remove the chat itself
    const deletedChat = await Chat.findByIdAndDelete(id).session(session);

    await session.commitTransaction();
    session.endSession();

    return deletedChat;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

/**
 * Fetch the last message of a chat.
 */
export const getLastChatMessage = async (chatId: string) => {
  const lastMessage = await Message.findOne({ chatId })
    .sort({ timestamp: -1 })
    .lean();
  return lastMessage;
};
