import { Request } from "express";
import { firebaseAdmin } from "../firebase/firebase";

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
