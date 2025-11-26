import { type TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

import type {
  GetChatsQuery,
  GetChatsQueryVariables,
  GetChatQuery,
  GetChatQueryVariables,
} from "../__generated__/graphql";

import { gql } from "@apollo/client";

const GET_CHATS_QUERY: TypedDocumentNode<
  GetChatsQuery,
  GetChatsQueryVariables
> = gql`
  query getChats {
    chats {
      id
      title
      topic
      createdAt
      updatedAt
      lastMessage {
        id
        text
      }
    }
  }
`;

export const useGetChatsQuery = () => {
  return useQuery<GetChatsQuery, GetChatsQueryVariables>(GET_CHATS_QUERY);
};

const GET_CHAT_QUERY: TypedDocumentNode<
  GetChatQuery,
  GetChatQueryVariables
> = gql`
  query getChat($id: ID!) {
    chat(id: $id) {
      id
      title
      topic
      createdAt
      updatedAt
    }
  }
`;

export const useGetChatQuery = (variables: GetChatQueryVariables) => {
  return useQuery<GetChatQuery, GetChatQueryVariables>(GET_CHAT_QUERY, {
    variables,
  });
};
