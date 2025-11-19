import { type TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

import type {
  GetMessagesQuery,
  GetMessagesQueryVariables,
} from "../__generated__/graphql";

import { gql } from "@apollo/client";

const GET_MESSAGES_QUERY: TypedDocumentNode<
  GetMessagesQuery,
  GetMessagesQueryVariables
> = gql`
  query getMessages($chatId: ID!) {
    messages(chatId: $chatId) {
      id
      chatId
      personaId
      text
      sender
      timestamp
      userId
    }
  }
`;

export const useGetMessagesQuery = (variables: GetMessagesQueryVariables) => {
  return useQuery<GetMessagesQuery, GetMessagesQueryVariables>(
    GET_MESSAGES_QUERY,
    {
      variables,
      skip: !variables?.chatId,
    }
  );
};
