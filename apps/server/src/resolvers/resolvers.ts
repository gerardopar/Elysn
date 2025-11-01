import { Resolvers } from "../graphql/__generated__/graphql.js";
import { userResolvers } from "./user";
import { chatResolvers } from "./chat";

export const resolvers: Resolvers = {
  Query: {
    hello: (_parent, args, _ctx) => {
      return `Hello ${args.name ?? "stranger"}`;
    },
    ...userResolvers.Query,
    ...chatResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...chatResolvers.Mutation,
  },
};
