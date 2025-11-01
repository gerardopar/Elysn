import {
  Resolvers,
  QueryGetUserArgs,
  MutationCreateUserArgs,
  MutationUpdateUserArgs,
  MutationDeleteUserArgs,
  MutationUpsertUserArgs,
} from "../graphql/__generated__/graphql.js";

import {
  createUser,
  getUser,
  getUserByFirebaseUid,
} from "../access-layer/user";
import { User } from "../models/user";

export const userResolvers: Resolvers = {
  Query: {
    users: async (_parent, _args, _ctx) => {
      const users = await User.find();
      return users.map((user) => ({
        firebaseUid: user.firebaseUid,
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
        firebaseUid: user.firebaseUid,
        id: String(user._id),
        name: user.name,
        bio: user.bio,
        picture: user.picture,
        email: user.email,
        createdAt: user.createdAt.getTime(),
        updatedAt: user.updatedAt.getTime(),
      };
    },

    getCurrentUser: async (_parent, _args, _ctx) => {
      const user = await getUserByFirebaseUid(_ctx?.user?.uid);

      if (!user) return null;

      return {
        firebaseUid: user.firebaseUid,
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
      const user = await createUser({
        name: args?.name || "",
        picture: args?.picture || "",
        email: args?.email,
        firebaseUid: args?.firebaseUid,
      });

      return {
        id: String(user._id),
        firebaseUid: user.firebaseUid,
        name: user.name,
        bio: user.bio,
        picture: user.picture,
        email: user.email,
        createdAt: user.createdAt.getTime(),
        updatedAt: user.updatedAt.getTime(),
      };
    },

    upsertUser: async (_parent, args: MutationUpsertUserArgs, _ctx) => {
      console.log("args", args);
      const { firebaseUid, name, email, picture } = args;

      const user = await User.findOneAndUpdate(
        { firebaseUid },
        {
          $set: {
            name,
            email,
            picture,
          },
        },
        {
          new: true,
          upsert: true, // create if not exists
          setDefaultsOnInsert: true,
        }
      );

      return {
        id: String(user._id),
        firebaseUid: user.firebaseUid,
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
          ...(args?.name && { name: args.name }),
          ...(args?.picture && { picture: args.picture }),
        },
        { new: true }
      );

      if (!user) throw new Error("User not found");

      return {
        firebaseUid: user.firebaseUid,
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
        firebaseUid: user.firebaseUid,
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
