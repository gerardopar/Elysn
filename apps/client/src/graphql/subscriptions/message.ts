import { useState } from "react";

import { gql } from "@apollo/client";
import { useSubscription } from "@apollo/client/react";
import type { TypedDocumentNode } from "@apollo/client";

import type {
  NewMessageStreamSubscription,
  NewMessageStreamSubscriptionVariables,
  NewMessageSubscription,
  NewMessageSubscriptionVariables,
} from "../__generated__/graphql";
import { MessageSenderEnum } from "@elysn/shared";

export const NEW_MESSAGE_SUBSCRIPTION: TypedDocumentNode<
  NewMessageSubscription,
  NewMessageSubscriptionVariables
> = gql`
  subscription NewMessage($chatId: ID!) {
    newMessage(chatId: $chatId) {
      id
      userId
      sender
      text
      timestamp
    }
  }
`;

export const useNewMessageSubscription = (
  chatId: string,
  onStreamCompleted?: () => void
) => {
  return useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { chatId },

    onData: ({ client, data }) => {
      const newMessage = data?.data?.newMessage;
      if (!newMessage) return;

      if (onStreamCompleted && newMessage.sender === MessageSenderEnum.AI) {
        onStreamCompleted?.();
      }

      const chatCacheId = client.cache.identify({
        __typename: "Chat",
        id: chatId,
      });

      client.cache.modify({
        fields: {
          messages(existing = [], { toReference }) {
            const ref = toReference(newMessage);
            if (existing.some((e: any) => e.__ref === ref?.__ref)) {
              return existing;
            }
            return [...existing, ref];
          },
        },
      });

      client.cache.modify({
        id: chatCacheId,
        fields: {
          lastMessage() {
            return {
              __typename: "Message",
              id: newMessage.id,
              text: newMessage.text,
              timestamp: newMessage.timestamp,
            };
          },
        },
      });
    },
  });
};

export const NEW_MESSAGE_STREAM_SUB: TypedDocumentNode<
  NewMessageStreamSubscription,
  NewMessageStreamSubscriptionVariables
> = gql`
  subscription NewMessageStream($chatId: ID!) {
    newMessageStream(chatId: $chatId) {
      event
      token
      outputText
      error
    }
  }
`;

export const useNewMessageStreamSubscription = (chatId: string) => {
  return useSubscription(NEW_MESSAGE_STREAM_SUB, {
    variables: { chatId },
  });
};

export const useNewMessageStream = (chatId: string) => {
  const [streamText, setStreamText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  useSubscription(NEW_MESSAGE_STREAM_SUB, {
    variables: { chatId },
    onData: ({ data }) => {
      const evt = data?.data?.newMessageStream;
      if (!evt) return;

      if (evt.event === "token" && evt.token) {
        setIsStreaming(true);
        setStreamText((prev) => prev + evt.token);
      }

      if (evt.event === "error") {
        console.warn("AI stream error:", evt.error);
        setIsStreaming(false);
      }

      if (evt.event === "completed") {
        // wait for final newMessage to arrive from regular subscription
        // setIsStreaming(false);
      }
    },
  });

  const clear = () => {
    setIsStreaming(false);
    setStreamText("");
  };

  return { streamText, isStreaming, clear };
};
