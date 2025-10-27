import {
  Resolvers,
  QueryGetUserArgs,
} from "../graphql/__generated__/graphql.js";

import { getUser } from "@accessLayer/user";

export const resolvers: Resolvers = {
  Query: {
    getUser: async (_parent, args: QueryGetUserArgs, _ctx) => {
      const user = await getUser(args.id);
      if (!user) return null;

      return {
        id: String(user._id),
        name: user.name,
        bio: user.bio,
        picture: user.picture,
        email: user.email,
        createdAt: user.createdAt.getTime(),
        updatedAt: user.updatedAt.getTime(),
      };
    },
  },
};
