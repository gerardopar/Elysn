import { gql } from "@apollo/client";
import { useSubscription } from "@apollo/client/react";
import type { TypedDocumentNode } from "@apollo/client";

import type {
  NewMessageSubscription,
  NewMessageSubscriptionVariables,
} from "../__generated__/graphql";

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

export const useNewMessageSubscription = (chatId: string) => {
  return useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { chatId },

    onData: ({ client, data }) => {
      const newMessage = data?.data?.newMessage;
      if (!newMessage) return;

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
