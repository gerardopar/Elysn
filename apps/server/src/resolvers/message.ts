import { getUserByFirebaseUid } from "src/access-layer/user";

import {
  createMessage,
  deleteMessage,
  updateMessage,
  getMessages,
  getMessage,
} from "../access-layer/message";
import { getChat } from "../access-layer/chat";

import {
  Resolvers,
  MutationCreateMessageArgs,
  MutationUpdateMessageArgs,
  MutationDeleteMessageArgs,
  QueryMessagesArgs,
  QueryMessageArgs,
} from "../graphql/__generated__/graphql";

export const messageResolvers: Resolvers = {
  Query: {
    messages: async (_parent, { chatId }: QueryMessagesArgs, ctx) => {
      if (!ctx.user?.uid) throw new Error("Must be authenticated");

      const user = await getUserByFirebaseUid(ctx.user.uid);
      if (!user) throw new Error("User not found");

      const messages = await getMessages(chatId);
      return messages.map((message) => ({
        id: String(message._id),
        userId: message.userId,
        sender: message.sender,
        text: message.text,
        timestamp: message.timestamp.getTime(),
        metadata: message.metadata,
      }));
    },
    message: async (_parent, { id }: QueryMessageArgs, ctx) => {
      if (!ctx.user?.uid) throw new Error("Must be authenticated");

      const user = await getUserByFirebaseUid(ctx.user.uid);
      if (!user) throw new Error("User not found");

      const message = await getMessage(id);
      if (!message) throw new Error("Message not found");

      return {
        id: String(message._id),
        userId: message.userId,
        sender: message.sender,
        text: message.text,
        timestamp: message.timestamp.getTime(),
        metadata: message.metadata,
      };
    },
  },
  Mutation: {
    createMessage: async (
      _parent,
      { input }: MutationCreateMessageArgs,
      ctx
    ) => {
      if (!ctx?.user?.uid) throw new Error("Must be authenticated");

      const user = await getUserByFirebaseUid(ctx?.user?.uid);
      if (!user) throw new Error("User not found");

      const chat = await getChat(input?.chatId!);
      if (!chat) throw new Error("Chat not found");

      const message = await createMessage({
        chatId: String(chat?._id),
        userId: String(user?._id),
        sender: input?.sender,
        text: input?.text,
        metadata: input?.metadata,
      });

      return {
        id: String(message?._id),
        userId: message?.userId,
        sender: message?.sender,
        text: message?.text,
        timestamp: message?.timestamp.getTime(),
        metadata: message?.metadata,
      };
    },
    updateMessage: async (_parent, args: MutationUpdateMessageArgs, ctx) => {
      if (!ctx.user?.uid) throw new Error("Must be authenticated");

      const message = await updateMessage(args.id, args.input);
      if (!message) throw new Error("Message not found");

      return {
        id: String(message._id),
        userId: message.userId,
        sender: message.sender,
        text: message.text,
        timestamp: message.timestamp.getTime(),
        metadata: message.metadata,
      };
    },
    deleteMessage: async (_parent, args: MutationDeleteMessageArgs, ctx) => {
      if (!ctx.user?.uid) throw new Error("Must be authenticated");

      const message = await deleteMessage(args.id);
      if (!message) throw new Error("Message not found");

      return {
        id: String(message._id),
        userId: message.userId,
        sender: message.sender,
        text: message.text,
        timestamp: message.timestamp.getTime(),
        metadata: message.metadata,
      };
    },
  },
};
