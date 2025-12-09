import { Chat } from "../models/chat.js";

export const isChatOwner = (chat: Chat, userId: string): boolean => {
  return chat.userId === userId;
};
