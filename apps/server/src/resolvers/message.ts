import { getUserByFirebaseUid } from "../access-layer/user.js";

import {
  createMessage,
  deleteMessage,
  updateMessage,
  getMessages,
  getMessage,
} from "../access-layer/message.js";
import { getChat } from "../access-layer/chat.js";

import {
  Resolvers,
  MutationCreateMessageArgs,
  MutationUpdateMessageArgs,
  MutationDeleteMessageArgs,
  SubscriptionNewMessageArgs,
  QueryMessagesArgs,
  QueryMessageArgs,
  Message,
  MessageSenderEnum,
  SubscriptionNewMessageStreamArgs,
} from "../graphql/__generated__/graphql.js";

import { createPersonaMessage } from "../helpers/persona.helpers.js";
import {
  extractLongTermMemory,
  maybeExtractShortTermMemory,
} from "../helpers/memory.helpers.js";

import {
  pubsub,
  MESSAGE_CHANNEL,
  PERSONA_STATUS_CHANNEL,
  MESSAGE_STREAM_CHANNEL,
} from "../pubsub/pubsub.js";

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
      pubsub.publish(`${MESSAGE_CHANNEL}_${chat._id}`, {
        newMessage: {
          id: String(message._id),
          userId: message.userId,
          personaId: message.personaId,
          chatId: message.chatId,
          sender: message.sender,
          text: message.text,
          timestamp: message.timestamp.getTime(),
          metadata: message.metadata,
        },
      });

      return {
        id: String(message._id),
        chatId: String(message.chatId),
        personaId: String(message.personaId),
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
      subscribe: (_parent, { chatId }: SubscriptionNewMessageArgs) => {
        return pubsub.asyncIterableIterator(`${MESSAGE_CHANNEL}_${chatId}`);
      },

      resolve: async (payload: { newMessage: Message }) => {
        const msg = payload.newMessage;

        if (msg.sender === MessageSenderEnum.AI) return msg;

        // USER messages → trigger memory pipeline + AI reply
        if (msg.sender === MessageSenderEnum.USER) {
          // publish persona status
          pubsub.publish(`${PERSONA_STATUS_CHANNEL}_${msg.chatId}`, {
            personaStatus: {
              typing: true,
              chatId: msg.chatId,
            },
          });

          createPersonaMessage(
            String(msg.chatId),
            String(msg.personaId),
            String(msg.userId),
            msg.id
          ).catch((error) =>
            console.warn("Failed to create persona message", error)
          );

          // STM extraction
          maybeExtractShortTermMemory(
            String(msg.chatId),
            String(msg.personaId!)
          ).catch((error) =>
            console.warn("Failed to extract short term memory", error)
          );

          // LTM extraction
          extractLongTermMemory({
            messageId: msg.id,
            personaId: msg.personaId!,
          }).catch((error) =>
            console.warn("Failed to extract long term memory", error)
          );
        }

        return msg;
      },
    },
    newMessageStream: {
      subscribe: (_parent, { chatId }: SubscriptionNewMessageStreamArgs) => {
        return pubsub.asyncIterableIterator(
          `${MESSAGE_STREAM_CHANNEL}_${chatId}`
        );
      },
    },
  },
};
