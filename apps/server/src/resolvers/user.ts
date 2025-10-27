import {
  Resolvers,
  QueryGetUserArgs,
  MutationCreateUserArgs,
  MutationUpdateUserArgs,
  MutationDeleteUserArgs,
} from "../graphql/__generated__/graphql.js";

import { getUser } from "@accessLayer/user";
import { User } from "@models/user";

export const userResolvers: Resolvers = {
  Query: {
    users: async (_parent, _args, _ctx) => {
      const users = await User.find();
      return users.map((user) => ({
        id: String(user._id),
        name: user.name,
        bio: user.bio,
        picture: user.picture,
        email: user.email,
        createdAt: user.createdAt.getTime(),
        updatedAt: user.updatedAt.getTime(),
      }));
    },

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

  Mutation: {
    createUser: async (_parent, args: MutationCreateUserArgs, _ctx) => {
      const user = await User.create({
        name: args.name,
        picture: args.image,
        email: "", // You may want to add email to the mutation args
      });

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

    updateUser: async (_parent, args: MutationUpdateUserArgs, _ctx) => {
      const user = await User.findByIdAndUpdate(
        args.id,
        {
          ...(args.name && { name: args.name }),
          ...(args.image && { picture: args.image }),
        },
        { new: true }
      );

      if (!user) throw new Error("User not found");

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

    deleteUser: async (_parent, args: MutationDeleteUserArgs, _ctx) => {
      const user = await User.findByIdAndDelete(args.id);
      if (!user) throw new Error("User not found");

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
