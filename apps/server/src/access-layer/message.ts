import { Message } from "../models/message";
import { Chat } from "../models/chat";
import { MessageSenderEnum } from "@elysn/shared";

/**
 * Create a new message and update its parent chat's timestamp.
 */
export const createMessage = async ({
  chatId,
  userId,
  sender,
  text,
  metadata,
}: {
  chatId: string;
  userId: string;
  sender: MessageSenderEnum;
  text: string;
  metadata?: Record<string, any>;
}) => {
  const message = new Message({
    chatId,
    userId,
    sender,
    text: text.trim(),
    metadata,
  });

  await message.save();

  // Update chat's updatedAt timestamp
  await Chat.findByIdAndUpdate(chatId, { $set: { updatedAt: new Date() } });

  return message;
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

export const getMessage = async (id: string) => {
  return Message.findById(id).lean();
};
