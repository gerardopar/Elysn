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

import { connectDB } from "./db/db";
import { connectRedis } from "./cache/redisClient";
import { resolvers } from "./resolvers/resolvers";
import { firebaseAdmin } from "./firebase/firebase";
import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

// MCP imports
import { z } from "zod";
import { openaiClient as openai } from "./services/openAi";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

import { extractLongTermMemoryResponse } from "@elysn/core";
import { LongTermMemoryExtractionResponse } from "@elysn/shared";
import { sanitizeJSON } from "./helpers/string.helpers";

const schemaPath = path.resolve("src/schema/**/*.graphql");

/* --------------------------------------
   BUILD MCP SERVER + register tools
----------------------------------------- */
const setupMCPServer = () => {
  const mcp = new McpServer({
    name: "elysn-mcp",
    version: "1.0.0",
  });

  // 💾 memory extraction tool
  mcp.registerTool(
    "memory.extract",
    {
      title: "Memory Extraction",
      description: "Extract long-term memory from text",
      // @ts-expect-error zod typescript error
      inputSchema: z.object({
        text: z.string(),
      }),
      // @ts-expect-error zod typescript error
      outputSchema: z.object({
        success: z.boolean(),
        shouldWriteMemory: z.boolean(),
        memory: z
          .object({
            category: z.string(),
            value: z.string(),
            importance: z.number(),
          })
          .nullable(),
        error: z.string().nullable(),
      }),
    },

    async ({ text }: { text: string }) => {
      try {
        const payload = extractLongTermMemoryResponse({ text });

        if (!payload) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  success: false,
                  shouldWriteMemory: false,
                  memory: null,
                  error: "Failed to extract memory",
                }),
              },
            ],
            structuredContent: {
              success: false,
              shouldWriteMemory: false,
              memory: null,
              error: "Failed to extract memory",
            },
          };
        }

        const response = await openai.responses.create(payload);

        if (!response?.output_text) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  success: false,
                  shouldWriteMemory: false,
                  memory: null,
                  error: "Failed to extract memory",
                }),
              },
            ],
            structuredContent: {
              success: false,
              shouldWriteMemory: false,
              memory: null,
              error: "Failed to extract memory",
            },
          };
        }

        const sanitized = sanitizeJSON(response.output_text);
        const extracted: LongTermMemoryExtractionResponse =
          JSON.parse(sanitized);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                shouldWriteMemory: extracted.shouldWriteMemory,
                memory: extracted.memory,
                error: null,
              }),
            },
          ],
          structuredContent: {
            success: true,
            shouldWriteMemory: extracted.shouldWriteMemory,
            memory: extracted.memory,
            error: null,
          },
        };
      } catch (error) {
        console.error("Memory extraction error:", error);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: false,
                memory: null,
                shouldWriteMemory: false,
                error: error instanceof Error ? error.message : "Unknown error",
              }),
            },
          ],
          structuredContent: {
            success: false,
            shouldWriteMemory: false,
            memory: null,
            error: error instanceof Error ? error.message : "Unknown error",
          },
        };
      }
    }
  );

  return mcp;
};

/* --------------------------------------
            MAIN SERVER START
----------------------------------------- */
export const startServer = async () => {
  await connectDB();
  await connectRedis();

  // Load GraphQL schema
  const typeDefs = await loadSchema(schemaPath, {
    loaders: [new GraphQLFileLoader()],
  });
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Express base
  const app = express();
  const httpServer = http.createServer(app);

  // Important for MCP JSON-RPC requests
  app.use(express.json());

  /* --------------------------------------
               SOCKETS (GraphQL)
  ----------------------------------------- */
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  const serverCleanup = useServer({ schema }, wsServer);

  /* --------------------------------------
                Apollo Server
  ----------------------------------------- */
  const apollo = new ApolloServer({
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

  await apollo.start();

  /* --------------------------------------
                MCP SERVER
  ----------------------------------------- */
  const mcpServer = setupMCPServer();

  // CORS for MCP endpoint (important for ngrok/external access)
  app.use(
    "/mcp",
    cors({
      origin: "*",
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // MCP endpoint handler
  app.post("/mcp", async (req, res) => {
    console.log("📥 MCP Request:", {
      method: req.body?.method,
      id: req.body?.id,
      body: JSON.stringify(req.body, null, 2),
    });

    let transport: StreamableHTTPServerTransport | null = null;

    try {
      transport = new StreamableHTTPServerTransport({
        enableJsonResponse: true,
        sessionIdGenerator: undefined,
      });

      // Connect the transport to the MCP server
      await mcpServer.connect(transport);

      // Handle the request through the transport
      await transport.handleRequest(req, res);

      console.log("✅ MCP Request handled successfully");
    } catch (err) {
      console.error("❌ MCP Error:", {
        error: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined,
        requestBody: req.body,
      });

      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: "2.0",
          error: {
            code: -32603,
            message:
              err instanceof Error ? err.message : "Internal server error",
          },
          id: req.body?.id || null,
        });
      }
    } finally {
      // Clean up the transport
      if (transport) {
        res.on("finish", () => {
          transport?.close();
        });
      }
    }
  });

  // Health check endpoint
  app.get("/mcp/health", (req, res) => {
    res.json({
      status: "ok",
      name: "elysn-mcp",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    });
  });

  /* --------------------------------------
              GraphQL Route
  ----------------------------------------- */
  app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressMiddleware(apollo, {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization || "";
        let user = null;

        if (authHeader.startsWith("Bearer ")) {
          const token = authHeader.split("Bearer ")[1];
          try {
            user = await firebaseAdmin.auth().verifyIdToken(token);
          } catch (error) {
            console.error("Invalid Firebase token:", error);
          }
        }

        return { user };
      },
    }) as any
  );

  /* --------------------------------------
                START SERVER
  ----------------------------------------- */
  const PORT = Number(process.env.PORT) || 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 GraphQL:       http://localhost:${PORT}/graphql`);
    console.log(`🔌 Subscriptions: ws://localhost:${PORT}/graphql`);
    console.log(`🤖 MCP:           http://localhost:${PORT}/mcp`);
    console.log(`❤️  Health:        http://localhost:${PORT}/mcp/health`);
  });
};

startServer();
