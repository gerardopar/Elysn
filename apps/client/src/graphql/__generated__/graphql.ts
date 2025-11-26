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
  lastMessage: Maybe<Message>;
  messagesCount: Scalars['Int']['output'];
  personaId: Scalars['ID']['output'];
  summary: Maybe<Scalars['String']['output']>;
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

export type Message = {
  __typename: 'Message';
  chatId: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  metadata: Maybe<MessageMetadata>;
  personaId: Maybe<Scalars['ID']['output']>;
  sender: MessageSenderEnum;
  text: Scalars['String']['output'];
  timestamp: Scalars['Float']['output'];
  userId: Scalars['ID']['output'];
};

export type MessageInput = {
  chatId?: InputMaybe<Scalars['ID']['input']>;
  sender: MessageSenderEnum;
  text: Scalars['String']['input'];
  timestamp: Scalars['Float']['input'];
};

export type MessageMetadata = {
  __typename: 'MessageMetadata';
  emotion: Maybe<Scalars['String']['output']>;
  intent: Maybe<Scalars['String']['output']>;
  isMemoryWorthy: Maybe<Scalars['Boolean']['output']>;
  memoryTag: Maybe<Scalars['String']['output']>;
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
  deleteChat: Scalars['Boolean']['output'];
  deleteMessage: Message;
  deleteUser: User;
  updateChat: Chat;
  updateMessage: Message;
  updatePersona: Persona;
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


export type MutationDeleteChatArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateChatArgs = {
  id: Scalars['ID']['input'];
  input: UpdateChatInput;
};


export type MutationUpdateMessageArgs = {
  id: Scalars['ID']['input'];
  input: MessageInput;
};


export type MutationUpdatePersonaArgs = {
  id: Scalars['ID']['input'];
  input: UpdatePersonaInput;
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

export type Persona = {
  __typename: 'Persona';
  avatarUrl: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  emotion: Maybe<PersonaEmotion>;
  id: Scalars['ID']['output'];
  memoryIndex: Maybe<PersonaMemoryIndex>;
  meta: Maybe<PersonaMeta>;
  name: Maybe<Scalars['String']['output']>;
  persona: Maybe<PersonaData>;
  relationship: Maybe<PersonaRelationship>;
  settings: Maybe<PersonaSettings>;
  state: Maybe<PersonaState>;
  updatedAt: Scalars['Float']['output'];
};

export type PersonaData = {
  __typename: 'PersonaData';
  archetype: Maybe<Scalars['String']['output']>;
  baseSystemPrompt: Maybe<Scalars['String']['output']>;
  coreTraits: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  dynamicSystemPrompt: Maybe<Scalars['String']['output']>;
  tone: Maybe<Scalars['String']['output']>;
};

export type PersonaEmotion = {
  __typename: 'PersonaEmotion';
  current: Maybe<Scalars['String']['output']>;
  lastUpdated: Maybe<Scalars['Float']['output']>;
};

export type PersonaMemoryIndex = {
  __typename: 'PersonaMemoryIndex';
  longTermMemories: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  shortTermSummary: Maybe<Scalars['String']['output']>;
};

export type PersonaMeta = {
  __typename: 'PersonaMeta';
  interactions: Maybe<Scalars['Int']['output']>;
  tokensUsed: Maybe<Scalars['Int']['output']>;
  version: Maybe<Scalars['String']['output']>;
};

export type PersonaRelationship = {
  __typename: 'PersonaRelationship';
  closeness: Maybe<Scalars['Float']['output']>;
  history: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  trust: Maybe<Scalars['Float']['output']>;
};

export type PersonaSettings = {
  __typename: 'PersonaSettings';
  memoryRetention: Maybe<Scalars['Float']['output']>;
  model: Maybe<Scalars['String']['output']>;
  openness: Maybe<Scalars['Float']['output']>;
  temperature: Maybe<Scalars['Float']['output']>;
};

export type PersonaState = {
  __typename: 'PersonaState';
  attention: Maybe<Scalars['Float']['output']>;
  availability: Maybe<Scalars['String']['output']>;
  energy: Maybe<Scalars['Float']['output']>;
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
  persona: Maybe<Persona>;
  personas: Maybe<Array<Persona>>;
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


export type QueryPersonaArgs = {
  id: Scalars['ID']['input'];
};

export type Subscription = {
  __typename: 'Subscription';
  _empty: Maybe<Scalars['String']['output']>;
  newMessage: Message;
};


export type SubscriptionNewMessageArgs = {
  chatId: Scalars['ID']['input'];
};

export type UpdateChatInput = {
  title?: InputMaybe<Scalars['String']['input']>;
  topic?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePersonaInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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


export type CreateChatWithMessageMutation = { createChatWithMessage: { __typename: 'Chat', id: string, userId: string, title: string | null, topic: string | null, createdAt: number, updatedAt: number, lastMessage: { __typename: 'Message', id: string, text: string } | null } };

export type DeleteChatMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteChatMutation = { deleteChat: boolean };

export type UpdateChatMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateChatInput;
}>;


export type UpdateChatMutation = { updateChat: { __typename: 'Chat', id: string, userId: string, title: string | null, topic: string | null, createdAt: number, updatedAt: number } };

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


export type GetChatsQuery = { chats: Array<{ __typename: 'Chat', id: string, title: string | null, topic: string | null, createdAt: number, updatedAt: number, lastMessage: { __typename: 'Message', id: string, text: string } | null }> };

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


export type GetMessagesQuery = { messages: Array<{ __typename: 'Message', id: string, chatId: string | null, personaId: string | null, text: string, sender: MessageSenderEnum, timestamp: number, userId: string }> | null };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { getCurrentUser: { __typename: 'User', id: string, firebaseUid: string, name: string | null, bio: string | null, picture: string | null, email: string, createdAt: number | null, updatedAt: number | null } | null };

export type NewMessageSubscriptionVariables = Exact<{
  chatId: Scalars['ID']['input'];
}>;


export type NewMessageSubscription = { newMessage: { __typename: 'Message', id: string, userId: string, sender: MessageSenderEnum, text: string, timestamp: number } };
