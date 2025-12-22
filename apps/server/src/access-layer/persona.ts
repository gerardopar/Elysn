import { PERSONA_DEFAULTS } from "@elysn/core";
import { Persona } from "../models/persona.js";

import { PersonaArchetype } from "@elysn/shared";

import mongoose from "mongoose";

/**
 * Create a new persona
 */
export const createPersona = async (
  userId: string,
  session?: mongoose.ClientSession,
  archetype?: PersonaArchetype,
  coreTraits?: string[],
  tone?: string
) => {
  const _archetype = archetype ?? PERSONA_DEFAULTS.archetype;
  const _coreTraits = coreTraits ?? PERSONA_DEFAULTS.coreTraits;
  const _tone = tone ?? PERSONA_DEFAULTS.tone;

  const persona = new Persona({
    userId,
    persona: {
      archetype: _archetype,
      coreTraits: _coreTraits,
      tone: _tone,
    },
  });

  if (session) {
    return await persona.save({ session });
  }

  return await persona.save();
};

/**
 * Get or create persona
 */
export const getOrCreatePersona = async (
  userId: string,
  session?: any,
  archetype?: PersonaArchetype,
  coreTraits?: string[],
  tone?: string
) => {
  const existing = await Persona.findOne({ userId }).session(session);
  if (existing) return existing;

  return createPersona(userId, session, archetype, coreTraits, tone);
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
