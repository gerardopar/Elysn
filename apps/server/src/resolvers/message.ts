import { getUserByFirebaseUid } from "src/access-layer/user";

import {
  createMessage,
  deleteMessage,
  updateMessage,
  getMessages,
  getMessage,
  getRecentMessages,
} from "../access-layer/message";
import { getChat } from "../access-layer/chat";
import { getPersona } from "src/access-layer/persona";

import {
  Resolvers,
  MutationCreateMessageArgs,
  MutationUpdateMessageArgs,
  MutationDeleteMessageArgs,
  SubscriptionNewMessageArgs,
  QueryMessagesArgs,
  QueryMessageArgs,
} from "../graphql/__generated__/graphql";

import { createPersonaMessage } from "../helpers/persona.helpers";
import { extractLongTermMemory } from "../helpers/longTermMemory";

import { pubsub, MESSAGE_CHANNEL } from "../pubsub/pubsub";

export const messageResolvers: Resolvers = {
  Query: {
    messages: async (_parent, { chatId }: QueryMessagesArgs, ctx) => {
      if (!ctx.user?.uid) throw new Error("Must be authenticated");

      const user = await getUserByFirebaseUid(ctx.user.uid);
      if (!user) throw new Error("User not found");

      const messages = await getMessages(chatId);
      return messages.map((message) => ({
        id: String(message._id),
        chatId: String(message.chatId),
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
        chatId: String(message.chatId),
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

      const user = await getUserByFirebaseUid(ctx.user.uid);
      if (!user) throw new Error("User not found");

      const chat = await getChat(String(input.chatId));
      if (!chat) throw new Error("Chat not found");

      // save user message
      const message = await createMessage({
        chatId: String(chat._id),
        personaId: String(chat.personaId),
        userId: String(user._id),
        sender: input.sender,
        text: input.text,
      });
      if (!message) throw new Error("Failed to create message");

      // save and publish user message
      await pubsub.publish(`${MESSAGE_CHANNEL}_${chat._id}`, {
        newMessage: {
          id: String(message._id),
          userId: message.userId,
          sender: message.sender,
          text: message.text,
          timestamp: message.timestamp.getTime(),
          metadata: message.metadata,
        },
      });

      // save and extract long-term memory
      try {
        const mem = await extractLongTermMemory({
          messageId: String(message._id),
          personaId: String(chat.personaId),
        });

        console.log("Memory extraction result", mem);
      } catch (error) {
        console.error("Failed to extract long-term memory:", error);
      }

      // load and use persona AFTER memory update
      const persona = await getPersona(String(chat.personaId));
      if (!persona) throw new Error("Persona not found");

      // load recent chat messages
      let recentMessages = await getRecentMessages(String(chat._id));
      recentMessages = [...recentMessages.slice(-10), message];

      // update short term summary
      const aiMsg = await createPersonaMessage(
        chat,
        persona,
        user,
        recentMessages,
        input.text
      );
      if (!aiMsg) throw new Error("Failed to save AI message");

      // Publish AI message
      await pubsub.publish(`${MESSAGE_CHANNEL}_${chat._id}`, {
        newMessage: {
          id: String(aiMsg._id),
          userId: aiMsg.userId,
          sender: aiMsg.sender,
          text: aiMsg.text,
          timestamp: aiMsg.timestamp.getTime(),
          metadata: aiMsg.metadata,
        },
      });

      return {
        id: String(message._id),
        chatId: String(message.chatId),
        userId: message.userId,
        sender: message.sender,
        text: message.text,
        timestamp: message.timestamp.getTime(),
        metadata: message.metadata,
      };
    },
    updateMessage: async (_parent, args: MutationUpdateMessageArgs, ctx) => {
      if (!ctx.user?.uid) throw new Error("Must be authenticated");

      const message = await updateMessage(args.id, args.input);
      if (!message) throw new Error("Message not found");

      return {
        id: String(message._id),
        chatId: String(message.chatId),
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
        chatId: String(message.chatId),
        userId: message.userId,
        sender: message.sender,
        text: message.text,
        timestamp: message.timestamp.getTime(),
        metadata: message.metadata,
      };
    },
  },

  Subscription: {
    newMessage: {
      // Subscription resolver — returns async iterator tied to chatId
      subscribe: (_parent, { chatId }: SubscriptionNewMessageArgs) => {
        return pubsub.asyncIterableIterator(`${MESSAGE_CHANNEL}_${chatId}`);
      },
    },
  },
};
