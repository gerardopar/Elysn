import mongoose from "mongoose";

import {
  createChat,
  getChat,
  getChats,
  deleteChat,
  updateChat as updateChatRecord,
  getLastChatMessage,
} from "../access-layer/chat";
import { getOrCreatePersona } from "../access-layer/persona";
import { createMessage, updateMessageTopics } from "../access-layer/message";
import { getUserByFirebaseUid } from "src/access-layer/user";

import {
  Resolvers,
  QueryChatArgs,
  MutationCreateChatArgs,
  MutationCreateChatWithMessageArgs,
  MutationDeleteChatArgs,
  MutationUpdateChatArgs,
} from "../graphql/__generated__/graphql";

import { isChatOwner } from "../helpers/chat.helpers";
import { extractTopics } from "src/helpers/memory.helpers";
import { createPersonaMessage } from "../helpers/persona.helpers";

import { pubsub, MESSAGE_CHANNEL } from "../pubsub/pubsub";

export const chatResolvers: Resolvers = {
  Query: {
    chats: async (_parent, _args, ctx) => {
      if (!ctx.user?.uid) throw new Error("Must be authenticated");

      const user = await getUserByFirebaseUid(ctx.user.uid);
      if (!user) throw new Error("User not found");

      const chats = await getChats(String(user._id));

      // TODO: implement  pagination
      return chats.map((chat) => ({
        id: String(chat._id),
        userId: chat.userId,
        personaId: chat.personaId,
        title: chat.title,
        topic: chat.topic || null,
        createdAt: chat.createdAt.getTime(),
        updatedAt: chat.updatedAt.getTime(),
        messagesCount: chat.messagesCount,
      }));
    },
    chat: async (_parent, { id }: QueryChatArgs, ctx) => {
      if (!ctx.user?.uid) throw new Error("Must be authenticated");

      const user = await getUserByFirebaseUid(ctx.user.uid);
      if (!user) throw new Error("User not found");

      const chat = await getChat(id);
      if (!chat) return null;

      if (!isChatOwner(chat, String(user._id))) {
        throw new Error("User not authorized");
      }

      return {
        id: String(chat._id),
        userId: chat.userId,
        personaId: chat.personaId,
        title: chat.title,
        topic: chat.topic || null,
        createdAt: chat.createdAt.getTime(),
        updatedAt: chat.updatedAt.getTime(),
        messagesCount: chat.messagesCount,
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

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const persona = await getOrCreatePersona(String(user._id), session);

        const chat = await createChat(
          {
            userId: String(user._id),
            personaId: String(persona._id),
            title: title?.trim() || "New Chat",
            topic: topic?.trim() || null,
          },
          session
        );

        return {
          id: String(chat._id),
          userId: chat.userId,
          personaId: chat.personaId,
          title: chat.title,
          topic: chat.topic,
          createdAt: chat.createdAt.getTime(),
          updatedAt: chat.updatedAt.getTime(),
          messagesCount: chat.messagesCount,
        };
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
      } finally {
        session.endSession();
      }
    },

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

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const persona = await getOrCreatePersona(String(user._id), session);

        const chat = await createChat(
          {
            userId: String(user._id),
            personaId: String(persona._id),
            title: title?.trim() || "New Chat",
            topic: topic?.trim() || null,
          },
          session
        );

        const createdMessage = await createMessage(
          {
            chatId: String(chat._id),
            userId: String(user._id),
            personaId: String(persona._id),
            sender: message.sender,
            text: message.text,
          },
          session
        );

        await session.commitTransaction();

        // Publish user message to any active subscribers
        await pubsub.publish(`${MESSAGE_CHANNEL}_${chat._id}`, {
          newMessage: {
            id: String(createdMessage._id),
            userId: createdMessage.userId,
            personaId: createdMessage.personaId,
            chatId: createdMessage.chatId,
            sender: createdMessage.sender,
            text: createdMessage.text,
            timestamp: createdMessage.timestamp.getTime(),
            metadata: createdMessage.metadata,
          },
        });

        const topics = await extractTopics(createdMessage.text);
        if (topics) {
          await updateMessageTopics(String(createdMessage._id), topics);
        }

        // Trigger AI response directly instead of relying on subscription's resolve function.
        // Why: When creating a new chat, no WebSocket subscribers exist yet since the client
        // hasn't navigated to the chat view. The subscription's resolve function only runs
        // when there are active subscribers, so we must trigger AI generation directly here.
        // The AI message will still be published via pubsub for any future subscribers.
        await createPersonaMessage(
          String(chat._id),
          String(persona._id),
          String(user._id),
          createdMessage.id,
          topics
        );

        return {
          id: String(chat._id),
          userId: chat.userId,
          personaId: chat.personaId,
          title: chat.title,
          topic: chat.topic,
          createdAt: chat.createdAt.getTime(),
          updatedAt: chat.updatedAt.getTime(),
          messagesCount: chat.messagesCount,
        };
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        session.endSession();
      }
    },

    deleteChat: async (_parent, { id }: MutationDeleteChatArgs, ctx) => {
      if (!ctx.user?.uid) throw new Error("Must be authenticated");

      const user = await getUserByFirebaseUid(ctx.user.uid);
      if (!user) throw new Error("User not found");

      const chat = await getChat(id);
      if (!chat) throw new Error("Chat not found");

      if (!isChatOwner(chat, String(user._id))) {
        throw new Error("User not authorized");
      }

      try {
        await deleteChat(id);
      } catch (error) {
        console.error("Error deleting chat:", error);
        throw new Error("Failed to delete chat");
      }

      return true;
    },

    updateChat: async (_parent, { id, input }: MutationUpdateChatArgs, ctx) => {
      if (!ctx.user?.uid) throw new Error("Must be authenticated");

      const user = await getUserByFirebaseUid(ctx.user.uid);
      if (!user) throw new Error("User not found");

      const chat = await getChat(id);
      if (!chat) throw new Error("Chat not found");

      if (!isChatOwner(chat, String(user._id))) {
        throw new Error("User not authorized");
      }

      const updatedChat = await updateChatRecord(id, input);
      if (!updatedChat) throw new Error("Chat not found");

      return {
        id: String(updatedChat._id),
        userId: updatedChat.userId,
        personaId: updatedChat.personaId,
        title: updatedChat.title,
        topic: updatedChat.topic,
        createdAt: updatedChat.createdAt.getTime(),
        updatedAt: updatedChat.updatedAt.getTime(),
        messagesCount: updatedChat.messagesCount,
      };
    },
  },
  Chat: {
    lastMessage: async (parent: { id: string }) => {
      const msg = await getLastChatMessage(parent.id);

      if (!msg) return null;

      return {
        id: String(msg._id),
        chatId: msg.chatId,
        userId: msg.userId,
        personaId: msg.personaId,
        sender: msg.sender,
        text: msg.text,
        timestamp: msg.timestamp.getTime(),
        metadata: msg.metadata,
      };
    },
  },
};
