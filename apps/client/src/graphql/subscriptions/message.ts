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
      metadata
    }
  }
`;

export const useNewMessageSubscription = (chatId: string) => {
  return useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: {
      chatId,
    },
    onData: ({ client, data }) => {
      const newMessage = data?.data?.newMessage;
      if (!newMessage) return;

      client.cache.modify({
        fields: {
          messages(existingMessageRefs = [], { toReference }) {
            const newRef = toReference(newMessage as any);
            // avoid duplicates:
            if (
              existingMessageRefs.some(
                (ref: any) => ref.__ref === newRef?.__ref
              )
            ) {
              return existingMessageRefs;
            }
            return [...existingMessageRefs, newRef];
          },
        },
      });
    },
  });
};
