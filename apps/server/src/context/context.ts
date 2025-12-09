import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { DecodedIdToken } from "firebase-admin/auth";
import { Request } from "express";

import { firebaseAdmin } from "../firebase/firebase.js";

export interface GraphQLContext {
  user: DecodedIdToken | null;
  mcpServer: McpServer;
}

export const getContext = async ({ req }: { req: Request }) => {
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

  return { user };
};
