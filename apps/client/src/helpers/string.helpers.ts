import { sample } from "lodash";

export const getRandomString = (
  placeholders: string[],
  exclude?: string
): string => {
  if (!placeholders.length) return "";

  // If no exclusion, just return a random item
  if (!exclude) return sample(placeholders)!;

  // Filter out the excluded value
  const filtered = placeholders.filter((p) => p !== exclude);

  // Fallback: if exclusion removes everything, return original random
  return sample(filtered.length ? filtered : placeholders)!;
};

export default getRandomString;
