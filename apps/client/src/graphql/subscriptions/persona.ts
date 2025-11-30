import { gql } from "@apollo/client";
import { useSubscription } from "@apollo/client/react";
import type { TypedDocumentNode } from "@apollo/client";

import type {
  PersonaStatusSubscription,
  PersonaStatusSubscriptionVariables,
} from "../__generated__/graphql";

export const PERSONA_STATUS_SUBSCRIPTION: TypedDocumentNode<
  PersonaStatusSubscription,
  PersonaStatusSubscriptionVariables
> = gql`
  subscription PersonaStatus($chatId: ID!) {
    personaStatus(chatId: $chatId) {
      typing
      chatId
    }
  }
`;

export const usePersonaStatusSubscription = (chatId: string) => {
  return useSubscription(PERSONA_STATUS_SUBSCRIPTION, {
    variables: { chatId },
  });
};
