import mongoose, { Document, Model, Schema } from "mongoose";

import { type User as UserCore } from "@elysn/core";

export interface User extends UserCore, Document {}

const UserSchema = new Schema<User>(
  {
    firebaseUid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
      lowercase: true,
    },
    bio: {
      type: String,
      required: false,
      maxLength: 160,
    },
    picture: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export const User: Model<User> = mongoose.model<User>("User", UserSchema);
