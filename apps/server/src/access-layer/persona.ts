import { Persona } from "../models/persona.js";

import mongoose from "mongoose";

/**
 * Create a new persona
 */
export const createPersona = async (
  userId: string,
  session?: mongoose.ClientSession
) => {
  const persona = new Persona({
    userId,
  });

  if (session) {
    return await persona.save({ session });
  }

  return await persona.save();
};

/**
 * Get or create persona
 */
export const getOrCreatePersona = async (userId: string, session?: any) => {
  const existing = await Persona.findOne({ userId }).session(session);
  if (existing) return existing;

  return createPersona(userId, session);
};

/**
 * Get persona by ID
 */
export const getPersona = async (persona: Persona | string) => {
  if (persona instanceof Persona || typeof persona !== "string") return persona;
  return Persona.findById(persona).lean();
};

/**
 * Get all personas for a user
 */
export const getPersonasForUser = async (userId: string) => {
  return Persona.find({ userId }).sort({ createdAt: -1 });
};

/**
 * Update persona
 */
export const updatePersona = async (
  personaId: string,
  updates: Partial<any>
) => {
  if (!mongoose.Types.ObjectId.isValid(personaId)) return null;

  return Persona.findByIdAndUpdate(personaId, { $set: updates }, { new: true });
};

/**
 * Delete persona (soft or hard)
 */
export const deletePersona = async (personaId: string) => {
  if (!mongoose.Types.ObjectId.isValid(personaId)) return null;
  return Persona.findByIdAndDelete(personaId);
};
