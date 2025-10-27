import {
  Resolvers,
  QueryChatsArgs,
  QueryChatArgs,
  MutationCreateChatArgs,
  MutationDeleteChatArgs,
} from "../graphql/__generated__/graphql.js";
import { Chat } from "../models/chat";

export const chatResolvers: Resolvers = {
  Query: {
    chats: async (_parent, args: QueryChatsArgs, _ctx) => {
      const chats = await Chat.find({ userId: args.userId })
        .sort({ updatedAt: -1 })
        .populate("messages");
      
      return chats.map((chat) => ({
        id: String(chat._id),
        userId: chat.userId,
        title: chat.title,
        topic: chat.topic,
        messages: chat.messages.map((msg: any) => ({
          id: String(msg._id),
          userId: msg.userId,
          sender: msg.sender,
          text: msg.text,
          timestamp: msg.timestamp,
          metadata: msg.metadata,
        })),
        createdAt: chat.createdAt.getTime(),
        updatedAt: chat.updatedAt.getTime(),
      }));
    },

    chat: async (_parent, args: QueryChatArgs, _ctx) => {
      const chat = await Chat.findById(args.id).populate("messages");
      if (!chat) return null;
      
      return {
        id: String(chat._id),
        userId: chat.userId,
        title: chat.title,
        topic: chat.topic,
        messages: chat.messages.map((msg: any) => ({
          id: String(msg._id),
          userId: msg.userId,
          sender: msg.sender,
          text: msg.text,
          timestamp: msg.timestamp,
          metadata: msg.metadata,
        })),
        createdAt: chat.createdAt.getTime(),
        updatedAt: chat.updatedAt.getTime(),
      };
    },
  },

  Mutation: {
    createChat: async (_parent, args: MutationCreateChatArgs, _ctx) => {
      const chat = await Chat.create({
        userId: args.userId,
        title: args.title || "New Chat",
        topic: args.topic || null,
      });
      
      return {
        id: String(chat._id),
        userId: chat.userId,
        title: chat.title,
        topic: chat.topic,
        messages: [],
        createdAt: chat.createdAt.getTime(),
        updatedAt: chat.updatedAt.getTime(),
      };
    },

    deleteChat: async (_parent, args: MutationDeleteChatArgs, _ctx) => {
      await Chat.findByIdAndDelete(args.id);
      return true;
    },
  },
};
