import { type TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

import { type GetCurrentUserQuery } from "../__generated__/graphql";

import { gql } from "@apollo/client";

const GET_CURRENT_USER_QUERY: TypedDocumentNode<GetCurrentUserQuery> = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      firebaseUid
      name
      bio
      picture
      email
      createdAt
      updatedAt
    }
  }
`;

export const useGetCurrentUserQuery = () => {
  return useQuery<GetCurrentUserQuery>(GET_CURRENT_USER_QUERY);
};
