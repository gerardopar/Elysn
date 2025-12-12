import { getInterlink, createInterlink } from "../access-layer/interlink.js";

export const getOrCreateInterlink = async (
  userId: string,
  personaId: string
) => {
  const existingInterlink = await getInterlink(userId, personaId);
  if (existingInterlink) return existingInterlink;

  const interlink = await createInterlink(userId, personaId);
  return interlink;
};
