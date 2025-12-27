import mongoose from "mongoose";

import { Engram } from "../models/engram.js";

export const getEngrams = async (userId: string) => {
  return Engram.find({ userId }).sort({ updatedAt: -1 });
};

export const createEngram = async (engram: Engram) => {
  return Engram.create({ ...engram });
};
