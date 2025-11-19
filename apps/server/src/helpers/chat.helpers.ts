import { Chat } from "../models/chat";

export const isChatOwner = (chat: Chat, userId: string): boolean => {
  return chat.userId === userId;
};
