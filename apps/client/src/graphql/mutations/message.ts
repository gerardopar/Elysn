import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import type { TypedDocumentNode } from "@apollo/client";

import type {
  CreateMessageMutation,
  CreateMessageMutationVariables,
  UpdateMessageMutation,
  UpdateMessageMutationVariables,
  DeleteMessageMutation,
  DeleteMessageMutationVariables,
} from "../__generated__/graphql";

export const CREATE_MESSAGE_MUTATION: TypedDocumentNode<
  CreateMessageMutation,
  CreateMessageMutationVariables
> = gql`
  mutation CreateMessage($input: MessageInput!) {
    createMessage(input: $input) {
      id
      chatId
      text
      sender
      timestamp
      userId
    }
  }
`;

export const useCreateMessageMutation = () => {
  return useMutation<CreateMessageMutation, CreateMessageMutationVariables>(
    CREATE_MESSAGE_MUTATION
  );
};

export const UPDATE_MESSAGE_MUTATION: TypedDocumentNode<
  UpdateMessageMutation,
  UpdateMessageMutationVariables
> = gql`
  mutation UpdateMessage($id: ID!, $input: MessageInput!) {
    updateMessage(id: $id, input: $input) {
      id
      chatId
      text
      sender
      timestamp
      userId
    }
  }
`;

export const useUpdateMessageMutation = () => {
  return useMutation<UpdateMessageMutation, UpdateMessageMutationVariables>(
    UPDATE_MESSAGE_MUTATION
  );
};

export const DELETE_MESSAGE_MUTATION: TypedDocumentNode<
  DeleteMessageMutation,
  DeleteMessageMutationVariables
> = gql`
  mutation DeleteMessage($id: ID!) {
    deleteMessage(id: $id) {
      id
      chatId
      text
      sender
      timestamp
      userId
    }
  }
`;

export const useDeleteMessageMutation = () => {
  return useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(
    DELETE_MESSAGE_MUTATION
  );
};
