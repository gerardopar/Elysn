import { Interlink } from "../models/interlink.js";

export const getInterlink = async (userId: string, personaId: string) => {
  return Interlink.findOne({ userId, personaId });
};

export const createInterlink = async (userId: string, personaId: string) => {
  return Interlink.create({ userId, personaId });
};

export const updateInterlink = async (
  userId: string,
  personaId: string,
  updates: Partial<Interlink>
) => {
  return Interlink.updateOne({ userId, personaId }, updates);
};
