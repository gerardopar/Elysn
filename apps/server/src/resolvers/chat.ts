import { createChat, getChat, getChats } from "../access-layer/chat";
import { getUserByFirebaseUid } from "src/access-layer/user";
import { createMessage } from "../access-layer/message";

import {
  Resolvers,
  MutationCreateChatArgs,
  MutationCreateChatWithMessageArgs,
  QueryChatArgs,
} from "../graphql/__generated__/graphql";

export const chatResolvers: Resolvers = {
  Query: {
    chats: async (_parent, _args, ctx) => {
      if (!ctx.user?.uid) throw new Error("Must be authenticated");

      const user = await getUserByFirebaseUid(ctx.user.uid);
      if (!user) throw new Error("User not found");

      const chats = await getChats(String(user._id));

      // TODO: implement pagination
      return chats.map((chat) => ({
        id: String(chat._id),
        userId: chat.userId,
        title: chat.title,
        topic: chat.topic || null,
        createdAt: chat.createdAt.getTime(),
        updatedAt: chat.updatedAt.getTime(),
      }));
    },
    chat: async (_parent, { id }: QueryChatArgs, ctx) => {
      if (!ctx.user?.uid) throw new Error("Must be authenticated");

      const user = await getUserByFirebaseUid(ctx.user.uid);
      if (!user) throw new Error("User not found");

      const chat = await getChat(id);
      if (!chat) return null;

      if (chat.userId !== String(user._id)) {
        throw new Error("User not authorized");
      }

      return {
        id: String(chat._id),
        userId: chat.userId,
        title: chat.title,
        topic: chat.topic || null,
        createdAt: chat.createdAt.getTime(),
        updatedAt: chat.updatedAt.getTime(),
      };
    },
  },
  Mutation: {
    createChat: async (_parent, args: MutationCreateChatArgs, ctx) => {
      const { title, topic } = args.input;

      if (!ctx?.user?.uid) {
        throw new Error("Must be authenticated to create a chat");
      }

      const user = await getUserByFirebaseUid(ctx.user.uid);
      if (!user) throw new Error("User not found");

      const chat = await createChat({
        userId: String(user._id),
        title: title?.trim() || "New Chat",
        topic: topic?.trim() || null,
      });

      return {
        id: String(chat._id),
        userId: chat.userId,
        title: chat.title,
        topic: chat.topic,
        createdAt: chat.createdAt.getTime(),
        updatedAt: chat.updatedAt.getTime(),
      };
    },

    // TODO: implement session / transaction
    createChatWithMessage: async (
      _parent,
      args: MutationCreateChatWithMessageArgs,
      ctx
    ) => {
      const { title, topic, message } = args.input;

      if (!ctx?.user?.uid) {
        throw new Error("Must be authenticated to create a chat");
      }

      const user = await getUserByFirebaseUid(ctx.user.uid);
      if (!user) throw new Error("User not found");

      const chat = await createChat({
        userId: String(user._id),
        title: title?.trim() || "New Chat",
        topic: topic?.trim() || null,
      });

      await createMessage({
        chatId: String(chat._id),
        userId: String(user._id),
        sender: message.sender,
        text: message.text,
        metadata: message.metadata,
      });

      return {
        id: String(chat._id),
        userId: chat.userId,
        title: chat.title,
        topic: chat.topic,
        createdAt: chat.createdAt.getTime(),
        updatedAt: chat.updatedAt.getTime(),
      };
    },
  },
};
