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
  personaId: Scalars['ID']['output'];
  summary?: Maybe<Scalars['String']['output']>;
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

export type Message = {
  __typename?: 'Message';
  chatId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<MessageMetadata>;
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
  __typename?: 'MessageMetadata';
  emotion?: Maybe<Scalars['String']['output']>;
  intent?: Maybe<Scalars['String']['output']>;
  isMemoryWorthy?: Maybe<Scalars['Boolean']['output']>;
  memoryTag?: Maybe<Scalars['String']['output']>;
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
  __typename?: 'Persona';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  emotion?: Maybe<PersonaEmotion>;
  id: Scalars['ID']['output'];
  memoryIndex?: Maybe<PersonaMemoryIndex>;
  meta?: Maybe<PersonaMeta>;
  name?: Maybe<Scalars['String']['output']>;
  persona?: Maybe<PersonaData>;
  relationship?: Maybe<PersonaRelationship>;
  settings?: Maybe<PersonaSettings>;
  state?: Maybe<PersonaState>;
  updatedAt: Scalars['Float']['output'];
};

export type PersonaData = {
  __typename?: 'PersonaData';
  archetype?: Maybe<Scalars['String']['output']>;
  baseSystemPrompt?: Maybe<Scalars['String']['output']>;
  coreTraits?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  dynamicSystemPrompt?: Maybe<Scalars['String']['output']>;
  tone?: Maybe<Scalars['String']['output']>;
};

export type PersonaEmotion = {
  __typename?: 'PersonaEmotion';
  current?: Maybe<Scalars['String']['output']>;
  lastUpdated?: Maybe<Scalars['Float']['output']>;
};

export type PersonaMemoryIndex = {
  __typename?: 'PersonaMemoryIndex';
  longTermMemories?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  shortTermSummary?: Maybe<Scalars['String']['output']>;
};

export type PersonaMeta = {
  __typename?: 'PersonaMeta';
  interactions?: Maybe<Scalars['Int']['output']>;
  tokensUsed?: Maybe<Scalars['Int']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export type PersonaRelationship = {
  __typename?: 'PersonaRelationship';
  closeness?: Maybe<Scalars['Float']['output']>;
  history?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  trust?: Maybe<Scalars['Float']['output']>;
};

export type PersonaSettings = {
  __typename?: 'PersonaSettings';
  memoryRetention?: Maybe<Scalars['Float']['output']>;
  model?: Maybe<Scalars['String']['output']>;
  openness?: Maybe<Scalars['Float']['output']>;
  temperature?: Maybe<Scalars['Float']['output']>;
};

export type PersonaState = {
  __typename?: 'PersonaState';
  attention?: Maybe<Scalars['Float']['output']>;
  availability?: Maybe<Scalars['String']['output']>;
  energy?: Maybe<Scalars['Float']['output']>;
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
  persona?: Maybe<Persona>;
  personas?: Maybe<Array<Persona>>;
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


export type QueryPersonaArgs = {
  id: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']['output']>;
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
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Message: ResolverTypeWrapper<Message>;
  MessageInput: MessageInput;
  MessageMetadata: ResolverTypeWrapper<MessageMetadata>;
  MessageSenderEnum: MessageSenderEnum;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Persona: ResolverTypeWrapper<Persona>;
  PersonaData: ResolverTypeWrapper<PersonaData>;
  PersonaEmotion: ResolverTypeWrapper<PersonaEmotion>;
  PersonaMemoryIndex: ResolverTypeWrapper<PersonaMemoryIndex>;
  PersonaMeta: ResolverTypeWrapper<PersonaMeta>;
  PersonaRelationship: ResolverTypeWrapper<PersonaRelationship>;
  PersonaSettings: ResolverTypeWrapper<PersonaSettings>;
  PersonaState: ResolverTypeWrapper<PersonaState>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<Record<PropertyKey, never>>;
  UpdateChatInput: UpdateChatInput;
  UpdatePersonaInput: UpdatePersonaInput;
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
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Message: Message;
  MessageInput: MessageInput;
  MessageMetadata: MessageMetadata;
  Mutation: Record<PropertyKey, never>;
  Persona: Persona;
  PersonaData: PersonaData;
  PersonaEmotion: PersonaEmotion;
  PersonaMemoryIndex: PersonaMemoryIndex;
  PersonaMeta: PersonaMeta;
  PersonaRelationship: PersonaRelationship;
  PersonaSettings: PersonaSettings;
  PersonaState: PersonaState;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
  Subscription: Record<PropertyKey, never>;
  UpdateChatInput: UpdateChatInput;
  UpdatePersonaInput: UpdatePersonaInput;
  User: User;
};

export type ChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = {
  createdAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  personaId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  chatId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['MessageMetadata']>, ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['MessageSenderEnum'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type MessageMetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageMetadata'] = ResolversParentTypes['MessageMetadata']> = {
  emotion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  intent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isMemoryWorthy?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  memoryTag?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createChat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType, RequireFields<MutationCreateChatArgs, 'input'>>;
  createChatWithMessage?: Resolver<ResolversTypes['Chat'], ParentType, ContextType, RequireFields<MutationCreateChatWithMessageArgs, 'input'>>;
  createMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationCreateMessageArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'firebaseUid'>>;
  deleteChat?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteChatArgs, 'id'>>;
  deleteMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationDeleteMessageArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  updateChat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType, RequireFields<MutationUpdateChatArgs, 'id' | 'input'>>;
  updateMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationUpdateMessageArgs, 'id' | 'input'>>;
  updatePersona?: Resolver<ResolversTypes['Persona'], ParentType, ContextType, RequireFields<MutationUpdatePersonaArgs, 'id' | 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id'>>;
  upsertUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpsertUserArgs, 'email' | 'firebaseUid'>>;
};

export type PersonaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Persona'] = ResolversParentTypes['Persona']> = {
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  emotion?: Resolver<Maybe<ResolversTypes['PersonaEmotion']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  memoryIndex?: Resolver<Maybe<ResolversTypes['PersonaMemoryIndex']>, ParentType, ContextType>;
  meta?: Resolver<Maybe<ResolversTypes['PersonaMeta']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  persona?: Resolver<Maybe<ResolversTypes['PersonaData']>, ParentType, ContextType>;
  relationship?: Resolver<Maybe<ResolversTypes['PersonaRelationship']>, ParentType, ContextType>;
  settings?: Resolver<Maybe<ResolversTypes['PersonaSettings']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['PersonaState']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
};

export type PersonaDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['PersonaData'] = ResolversParentTypes['PersonaData']> = {
  archetype?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  baseSystemPrompt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coreTraits?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  dynamicSystemPrompt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type PersonaEmotionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PersonaEmotion'] = ResolversParentTypes['PersonaEmotion']> = {
  current?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastUpdated?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type PersonaMemoryIndexResolvers<ContextType = any, ParentType extends ResolversParentTypes['PersonaMemoryIndex'] = ResolversParentTypes['PersonaMemoryIndex']> = {
  longTermMemories?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  shortTermSummary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type PersonaMetaResolvers<ContextType = any, ParentType extends ResolversParentTypes['PersonaMeta'] = ResolversParentTypes['PersonaMeta']> = {
  interactions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tokensUsed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type PersonaRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['PersonaRelationship'] = ResolversParentTypes['PersonaRelationship']> = {
  closeness?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  history?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  trust?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type PersonaSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PersonaSettings'] = ResolversParentTypes['PersonaSettings']> = {
  memoryRetention?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  model?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  openness?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  temperature?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type PersonaStateResolvers<ContextType = any, ParentType extends ResolversParentTypes['PersonaState'] = ResolversParentTypes['PersonaState']> = {
  attention?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  availability?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  energy?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  chat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<QueryChatArgs, 'id'>>;
  chats?: Resolver<Array<ResolversTypes['Chat']>, ParentType, ContextType>;
  getCurrentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<QueryHelloArgs>>;
  message?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryMessageArgs, 'id'>>;
  messages?: Resolver<Maybe<Array<ResolversTypes['Message']>>, ParentType, ContextType, RequireFields<QueryMessagesArgs, 'chatId'>>;
  persona?: Resolver<Maybe<ResolversTypes['Persona']>, ParentType, ContextType, RequireFields<QueryPersonaArgs, 'id'>>;
  personas?: Resolver<Maybe<Array<ResolversTypes['Persona']>>, ParentType, ContextType>;
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
  Message?: MessageResolvers<ContextType>;
  MessageMetadata?: MessageMetadataResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Persona?: PersonaResolvers<ContextType>;
  PersonaData?: PersonaDataResolvers<ContextType>;
  PersonaEmotion?: PersonaEmotionResolvers<ContextType>;
  PersonaMemoryIndex?: PersonaMemoryIndexResolvers<ContextType>;
  PersonaMeta?: PersonaMetaResolvers<ContextType>;
  PersonaRelationship?: PersonaRelationshipResolvers<ContextType>;
  PersonaSettings?: PersonaSettingsResolvers<ContextType>;
  PersonaState?: PersonaStateResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

