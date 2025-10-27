import { Chat } from "../models/chat";

export const chatResolvers = {
  Query: {
    chats: async (_: any, { userId }: { userId: string }) =>
      Chat.find({ userId }).sort({ updatedAt: -1 }).populate("messages"),

    chat: async (_: any, { id }: { id: string }) =>
      Chat.findById(id).populate("messages"),
  },

  Mutation: {
    createChat: async (_: any, { userId, title, topic }: any) => {
      const chat = await Chat.create({
        userId,
        title: title || "New Chat",
        topic: topic || null,
      });
      return chat;
    },

    deleteChat: async (_: any, { id }: { id: string }) => {
      await Chat.findByIdAndDelete(id);
      return true;
    },
  },
};
