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
  title: Maybe<Scalars['String']['output']>;
  topic: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Float']['output'];
  userId: Scalars['ID']['output'];
};

export type CreateChatInput = {
  title?: InputMaybe<Scalars['String']['input']>;
  topic?: InputMaybe<Scalars['String']['input']>;
};

export type CreateChatWithMessageInput = {
  message: MessageInput;
  title?: InputMaybe<Scalars['String']['input']>;
  topic?: InputMaybe<Scalars['String']['input']>;
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
  chatId: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  metadata: Maybe<Scalars['JSON']['output']>;
  sender: MessageSenderEnum;
  text: Scalars['String']['output'];
  timestamp: Scalars['Float']['output'];
  userId: Scalars['ID']['output'];
};

export type MessageInput = {
  chatId?: InputMaybe<Scalars['ID']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  sender: MessageSenderEnum;
  text: Scalars['String']['input'];
  timestamp: Scalars['Float']['input'];
  userId: Scalars['ID']['input'];
};

export enum MessageSenderEnum {
  AI = 'AI',
  USER = 'USER'
}

export type Mutation = {
  __typename: 'Mutation';
  _empty: Maybe<Scalars['String']['output']>;
  createChat: Chat;
  createChatWithMessage: Chat;
  createMessage: Message;
  createUser: User;
  deleteMessage: Message;
  deleteUser: User;
  updateMessage: Message;
  updateUser: User;
  upsertUser: User;
};


export type MutationCreateChatArgs = {
  input: CreateChatInput;
};


export type MutationCreateChatWithMessageArgs = {
  input: CreateChatWithMessageInput;
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


export type MutationUpsertUserArgs = {
  email: Scalars['String']['input'];
  firebaseUid: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename: 'Query';
  chat: Maybe<Chat>;
  chats: Array<Chat>;
  getCurrentUser: Maybe<User>;
  getUser: Maybe<User>;
  hello: Maybe<Scalars['String']['output']>;
  message: Maybe<Message>;
  messages: Maybe<Array<Message>>;
  users: Maybe<Array<User>>;
};


export type QueryChatArgs = {
  id: Scalars['ID']['input'];
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


export type QueryMessagesArgs = {
  chatId: Scalars['ID']['input'];
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

export type CreateChatMutationVariables = Exact<{
  input: CreateChatInput;
}>;


export type CreateChatMutation = { createChat: { __typename: 'Chat', id: string, userId: string, title: string | null, topic: string | null, createdAt: number, updatedAt: number } };

export type CreateChatWithMessageMutationVariables = Exact<{
  input: CreateChatWithMessageInput;
}>;


export type CreateChatWithMessageMutation = { createChatWithMessage: { __typename: 'Chat', id: string, userId: string, title: string | null, topic: string | null, createdAt: number, updatedAt: number } };

export type CreateMessageMutationVariables = Exact<{
  input: MessageInput;
}>;


export type CreateMessageMutation = { createMessage: { __typename: 'Message', id: string, chatId: string | null, text: string, sender: MessageSenderEnum, timestamp: number, userId: string } };

export type UpdateMessageMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: MessageInput;
}>;


export type UpdateMessageMutation = { updateMessage: { __typename: 'Message', id: string, chatId: string | null, text: string, sender: MessageSenderEnum, timestamp: number, userId: string } };

export type DeleteMessageMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteMessageMutation = { deleteMessage: { __typename: 'Message', id: string, chatId: string | null, text: string, sender: MessageSenderEnum, timestamp: number, userId: string } };

export type CreateUserMutationVariables = Exact<{
  firebaseUid: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateUserMutation = { createUser: { __typename: 'User', id: string, name: string | null, bio: string | null, picture: string | null, email: string, createdAt: number | null, updatedAt: number | null } };

export type UpsertUserMutationVariables = Exact<{
  firebaseUid: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpsertUserMutation = { upsertUser: { __typename: 'User', id: string, name: string | null, bio: string | null, picture: string | null, email: string, createdAt: number | null, updatedAt: number | null } };

export type GetChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatsQuery = { chats: Array<{ __typename: 'Chat', id: string, title: string | null, topic: string | null, createdAt: number, updatedAt: number }> };

export type GetChatQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetChatQuery = { chat: { __typename: 'Chat', id: string, title: string | null, topic: string | null, createdAt: number, updatedAt: number } | null };

export type HelloQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type HelloQuery = { hello: string | null };

export type GetMessagesQueryVariables = Exact<{
  chatId: Scalars['ID']['input'];
}>;


export type GetMessagesQuery = { messages: Array<{ __typename: 'Message', id: string, chatId: string | null, text: string, sender: MessageSenderEnum, timestamp: number, userId: string }> | null };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { getCurrentUser: { __typename: 'User', id: string, firebaseUid: string, name: string | null, bio: string | null, picture: string | null, email: string, createdAt: number | null, updatedAt: number | null } | null };
