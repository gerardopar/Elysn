import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import type { TypedDocumentNode } from "@apollo/client";
import type {
  CreateUserMutation,
  CreateUserMutationVariables,
  UpsertUserMutation,
  UpsertUserMutationVariables,
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

const UPSERT_USER_MUTATION: TypedDocumentNode<
  UpsertUserMutation,
  UpsertUserMutationVariables
> = gql`
  mutation UpsertUser(
    $firebaseUid: String!
    $email: String!
    $name: String
    $picture: String
  ) {
    upsertUser(
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

export const useUpsertUserMutation = () => {
  return useMutation<UpsertUserMutation, UpsertUserMutationVariables>(
    UPSERT_USER_MUTATION
  );
};
