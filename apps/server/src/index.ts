import "dotenv/config";

import path from "path";
import { ApolloServer } from "@apollo/server";
import { loadSchema } from "@graphql-tools/load";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

import { connectRedis } from "./cache/redisClient";
import { connectDB } from "./db/db";

import { resolvers } from "./resolvers/resolvers";

const schemaPath = path.resolve("src/schema/**/*.graphql");

export const startServer = async () => {
  await connectDB();
  await connectRedis();

  const typeDefs = await loadSchema(schemaPath, {
    loaders: [new GraphQLFileLoader()],
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) || 4000 },
  });

  console.log(`🚀 Schema-first server ready at ${url}`);
};

startServer();
