import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type Chat = {
  __typename?: 'Chat';
  createdAt: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
  topic?: Maybe<Scalars['String']['output']>;
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
  __typename?: 'Memory';
  history: Array<Message>;
  lastMessage?: Maybe<Scalars['String']['output']>;
  lastTopic?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Float']['output'];
  userId: Scalars['ID']['output'];
};

export type Message = {
  __typename?: 'Message';
  chatId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
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
};

export enum MessageSenderEnum {
  AI = 'AI',
  USER = 'USER'
}

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
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
  __typename?: 'Query';
  chat?: Maybe<Chat>;
  chats: Array<Chat>;
  getCurrentUser?: Maybe<User>;
  getUser?: Maybe<User>;
  hello?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Message>;
  messages?: Maybe<Array<Message>>;
  users?: Maybe<Array<User>>;
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

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']['output']>;
  newMessage: Message;
};


export type SubscriptionNewMessageArgs = {
  chatId: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  email: Scalars['String']['output'];
  firebaseUid: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Chat: ResolverTypeWrapper<Chat>;
  CreateChatInput: CreateChatInput;
  CreateChatWithMessageInput: CreateChatWithMessageInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Memory: ResolverTypeWrapper<Memory>;
  Message: ResolverTypeWrapper<Message>;
  MessageInput: MessageInput;
  MessageSenderEnum: MessageSenderEnum;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<Record<PropertyKey, never>>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Chat: Chat;
  CreateChatInput: CreateChatInput;
  CreateChatWithMessageInput: CreateChatWithMessageInput;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  JSON: Scalars['JSON']['output'];
  Memory: Memory;
  Message: Message;
  MessageInput: MessageInput;
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
  Subscription: Record<PropertyKey, never>;
  User: User;
};

export type ChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = {
  createdAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MemoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Memory'] = ResolversParentTypes['Memory']> = {
  history?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  lastMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastTopic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  chatId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['MessageSenderEnum'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createChat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType, RequireFields<MutationCreateChatArgs, 'input'>>;
  createChatWithMessage?: Resolver<ResolversTypes['Chat'], ParentType, ContextType, RequireFields<MutationCreateChatWithMessageArgs, 'input'>>;
  createMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationCreateMessageArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'firebaseUid'>>;
  deleteMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationDeleteMessageArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  updateMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationUpdateMessageArgs, 'id' | 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id'>>;
  upsertUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpsertUserArgs, 'email' | 'firebaseUid'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  chat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<QueryChatArgs, 'id'>>;
  chats?: Resolver<Array<ResolversTypes['Chat']>, ParentType, ContextType>;
  getCurrentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<QueryHelloArgs>>;
  message?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryMessageArgs, 'id'>>;
  messages?: Resolver<Maybe<Array<ResolversTypes['Message']>>, ParentType, ContextType, RequireFields<QueryMessagesArgs, 'chatId'>>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  _empty?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "_empty", ParentType, ContextType>;
  newMessage?: SubscriptionResolver<ResolversTypes['Message'], "newMessage", ParentType, ContextType, RequireFields<SubscriptionNewMessageArgs, 'chatId'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firebaseUid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Chat?: ChatResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Memory?: MemoryResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

