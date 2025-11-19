import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import type { TypedDocumentNode } from "@apollo/client";

import type {
  CreateChatMutation,
  CreateChatMutationVariables,
  CreateChatWithMessageMutation,
  CreateChatWithMessageMutationVariables,
  DeleteChatMutation,
  DeleteChatMutationVariables,
  UpdateChatMutation,
  UpdateChatMutationVariables,
} from "../__generated__/graphql";

export const CREATE_CHAT_MUTATION: TypedDocumentNode<
  CreateChatMutation,
  CreateChatMutationVariables
> = gql`
  mutation CreateChat($input: CreateChatInput!) {
    createChat(input: $input) {
      id
      userId
      title
      topic
      createdAt
      updatedAt
    }
  }
`;

export const useCreateChatMutation = () => {
  return useMutation<CreateChatMutation, CreateChatMutationVariables>(
    CREATE_CHAT_MUTATION
  );
};

export const CREATE_CHAT_WITH_MESSAGE_MUTATION: TypedDocumentNode<
  CreateChatWithMessageMutation,
  CreateChatWithMessageMutationVariables
> = gql`
  mutation CreateChatWithMessage($input: CreateChatWithMessageInput!) {
    createChatWithMessage(input: $input) {
      id
      userId
      title
      topic
      createdAt
      updatedAt
    }
  }
`;

export const useCreateChatWithMessageMutation = () => {
  return useMutation<
    CreateChatWithMessageMutation,
    CreateChatWithMessageMutationVariables
  >(CREATE_CHAT_WITH_MESSAGE_MUTATION);
};

export const DELETE_CHAT_MUTATION: TypedDocumentNode<
  DeleteChatMutation,
  DeleteChatMutationVariables
> = gql`
  mutation DeleteChat($id: ID!) {
    deleteChat(id: $id)
  }
`;

export const useDeleteChatMutation = () => {
  return useMutation<DeleteChatMutation, DeleteChatMutationVariables>(
    DELETE_CHAT_MUTATION
  );
};

export const UPDATE_CHAT_MUTATION: TypedDocumentNode<
  UpdateChatMutation,
  UpdateChatMutationVariables
> = gql`
  mutation UpdateChat($id: ID!, $input: UpdateChatInput!) {
    updateChat(id: $id, input: $input) {
      id
      userId
      title
      topic
      createdAt
      updatedAt
    }
  }
`;

export const useUpdateChatMutation = () => {
  return useMutation<UpdateChatMutation, UpdateChatMutationVariables>(
    UPDATE_CHAT_MUTATION
  );
};
