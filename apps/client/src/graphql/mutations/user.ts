import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import type { TypedDocumentNode } from "@apollo/client";
import type {
  CreateUserMutation,
  CreateUserMutationVariables,
} from "../__generated__/graphql";

const CREATE_USER_MUTATION: TypedDocumentNode<
  CreateUserMutation,
  CreateUserMutationVariables
> = gql`
  mutation CreateUser(
    $firebaseUid: String!
    $email: String!
    $name: String
    $picture: String
  ) {
    createUser(
      firebaseUid: $firebaseUid
      email: $email
      name: $name
      picture: $picture
    ) {
      id
      name
      bio
      picture
      email
      createdAt
      updatedAt
    }
  }
`;

export const useCreateUserMutation = () => {
  return useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CREATE_USER_MUTATION
  );
};
