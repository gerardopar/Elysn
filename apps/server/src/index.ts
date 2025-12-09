import "dotenv/config";

import path from "path";
import http from "http";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { connectDB } from "./db/db.js";
import { connectRedis } from "./cache/redisClient.js";
import { resolvers } from "./resolvers/resolvers.js";
import { firebaseAdmin } from "./firebase/firebase.js";
import { loadSchema } from "@graphql-tools/load";
import { GraphQLContext } from "./context/context.js";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

// MCP
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { setupMcpServer } from "./mcp/index.js";

// Jobs
import { jobsRouter } from "./jobs/jobsRouter.js";

const schemaPath = path.resolve("src/schema/**/*.graphql");

export const startServer = async () => {
  await connectDB();
  await connectRedis();

  // Load and build schema
  const typeDefs = await loadSchema(schemaPath, {
    loaders: [new GraphQLFileLoader()],
  });
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Express + HTTP server
  const app = express();
  app.use(express.json());
  const httpServer = http.createServer(app);

  // MCP
  const mcpServer = await setupMcpServer();

  app.post("/mcp", async (req, res) => {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });

    res.on("close", () => {
      transport.close();
    });

    await mcpServer.connect(transport);
    await transport.handleRequest(req, res, req.body);
  });

  // WebSocket server for subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  // Bind GraphQL schema to WS
  const serverCleanup = useServer({ schema }, wsServer);

  // Apollo server
  const server = new ApolloServer<GraphQLContext>({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  // Express middleware for GraphQL endpoint
  app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    // Cast to any to work around Express v4/v5 RequestHandler type mismatch
    expressMiddleware(server, {
      context: async ({ req }): Promise<GraphQLContext> => {
        const authHeader = req.headers.authorization || "";
        let user = null;

        if (authHeader.startsWith("Bearer ")) {
          const token = authHeader.split("Bearer ")[1];
          try {
            const decoded = await firebaseAdmin.auth().verifyIdToken(token);
            user = decoded;
          } catch (error) {
            console.error("Invalid Firebase token:", error);
          }
        }

        return { user, mcpServer };
      },
    }) as any
  );

  // Health check
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  // Jobs
  app.use("/jobs", jobsRouter);

  // Start everything
  const PORT = Number(process.env.PORT) || 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 GraphQL endpoint: http://localhost:${PORT}/graphql`);
    console.log(`🔌 Subscriptions endpoint: ws://localhost:${PORT}/graphql`);
  });
};

startServer();
