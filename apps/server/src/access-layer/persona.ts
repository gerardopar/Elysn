import { Persona } from "../models/persona";

import mongoose from "mongoose";

/**
 * Create a new persona
 */
export const createPersona = async (userId: string) => {
  const persona = new Persona({
    userId,
  });

  return persona.save();
};

/**
 * Get persona by ID
 */
export const getPersona = async (personaId: string) => {
  if (!mongoose.Types.ObjectId.isValid(personaId)) return null;
  return Persona.findById(personaId);
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
