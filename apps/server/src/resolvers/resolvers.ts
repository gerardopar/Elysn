import { userResolvers } from "./user";
import { chatResolvers } from "./chat";
import { messageResolvers } from "./message";

import { Resolvers } from "../graphql/__generated__/graphql";

export const resolvers: Resolvers = {
  Query: {
    hello: (_parent, args, _ctx) => {
      return `Hello ${args.name ?? "stranger"}`;
    },
    ...userResolvers.Query,
    ...chatResolvers.Query,
    ...messageResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...chatResolvers.Mutation,
    ...messageResolvers.Mutation,
  },
  Subscription: {
    ...messageResolvers.Subscription,
  },
  // Type-level field resolvers
  Chat: chatResolvers.Chat,
};
