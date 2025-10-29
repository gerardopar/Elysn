import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: unknown; output: unknown; }
};

export type Chat = {
  __typename: 'Chat';
  createdAt: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  messages: Array<Message>;
  title: Maybe<Scalars['String']['output']>;
  topic: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Float']['output'];
  userId: Scalars['ID']['output'];
};

export type Memory = {
  __typename: 'Memory';
  history: Array<Message>;
  lastMessage: Maybe<Scalars['String']['output']>;
  lastTopic: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Float']['output'];
  userId: Scalars['ID']['output'];
};

export type Message = {
  __typename: 'Message';
  id: Scalars['ID']['output'];
  metadata: Maybe<Scalars['JSON']['output']>;
  sender: Scalars['String']['output'];
  text: Scalars['String']['output'];
  timestamp: Scalars['Float']['output'];
  userId: Scalars['ID']['output'];
};

export type MessageInput = {
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  sender: Scalars['String']['input'];
  text: Scalars['String']['input'];
  timestamp: Scalars['Float']['input'];
  userId: Scalars['ID']['input'];
};

export type Mutation = {
  __typename: 'Mutation';
  _empty: Maybe<Scalars['String']['output']>;
  createChat: Chat;
  createMessage: Message;
  createUser: User;
  deleteChat: Scalars['Boolean']['output'];
  deleteMessage: Message;
  deleteUser: User;
  updateMessage: Message;
  updateUser: User;
};


export type MutationCreateChatArgs = {
  title?: InputMaybe<Scalars['String']['input']>;
  topic?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};


export type MutationCreateMessageArgs = {
  input: MessageInput;
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  firebaseUid: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteChatArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateMessageArgs = {
  id: Scalars['ID']['input'];
  input: MessageInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename: 'Query';
  chat: Maybe<Chat>;
  chats: Array<Chat>;
  getUser: Maybe<User>;
  hello: Maybe<Scalars['String']['output']>;
  message: Maybe<Message>;
  messages: Maybe<Array<Message>>;
  users: Maybe<Array<User>>;
};


export type QueryChatArgs = {
  id: Scalars['ID']['input'];
};


export type QueryChatsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryHelloArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMessageArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename: 'User';
  bio: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['Float']['output']>;
  email: Scalars['String']['output'];
  firebaseUid: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Maybe<Scalars['String']['output']>;
  picture: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['Float']['output']>;
};

export type CreateUserMutationVariables = Exact<{
  firebaseUid: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateUserMutation = { createUser: { __typename: 'User', id: string, name: string | null, bio: string | null, picture: string | null, email: string, createdAt: number | null, updatedAt: number | null } };

export type HelloQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type HelloQuery = { hello: string | null };


export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firebaseUid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"picture"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"firebaseUid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firebaseUid"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"picture"},"value":{"kind":"Variable","name":{"kind":"Name","value":"picture"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const HelloDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Hello"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hello"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}]}}]} as unknown as DocumentNode<HelloQuery, HelloQueryVariables>;