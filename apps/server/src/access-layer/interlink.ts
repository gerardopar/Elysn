import { Interlink } from "../models/interlink.js";

import { PersonaArchetype } from "@elysn/shared";
import {
  ARCHETYPE_INTERLINK_BIAS,
  INTERLINK_DEFAULTS,
  PERSONA_DEFAULTS,
} from "@elysn/core";

export const getInterlink = async (userId: string, personaId: string) => {
  return Interlink.findOne({ userId, personaId });
};

export const createInterlink = async (
  userId: string,
  personaId: string,
  personaArchetype: PersonaArchetype = PERSONA_DEFAULTS.archetype
): Promise<Interlink> => {
  const archetype = personaArchetype || PERSONA_DEFAULTS.archetype;
  const archetypeBias = ARCHETYPE_INTERLINK_BIAS?.[archetype];

  return Interlink.create({
    userId,
    personaId,
    trust: INTERLINK_DEFAULTS.trust + (archetypeBias?.trust || 0),
    safety: INTERLINK_DEFAULTS.safety + (archetypeBias?.safety || 0),
    warmth: INTERLINK_DEFAULTS.warmth + (archetypeBias?.warmth || 0),
    tension: INTERLINK_DEFAULTS.tension + (archetypeBias?.tension || 0),
    attunement:
      INTERLINK_DEFAULTS.attunement + (archetypeBias?.attunement || 0),
    rapport: INTERLINK_DEFAULTS.rapport + (archetypeBias?.rapport || 0),
    openness: INTERLINK_DEFAULTS.openness + (archetypeBias?.openness || 0),
  });
};

export const updateInterlink = async (
  userId: string,
  personaId: string,
  updates: Partial<Interlink>
): Promise<Interlink | null> => {
  return Interlink.findOneAndUpdate(
    { userId, personaId },
    { $set: updates },
    {
      new: true,
      runValidators: true,
    }
  );
};
