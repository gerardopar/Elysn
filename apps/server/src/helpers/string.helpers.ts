// TODO: Support Markdown and other formatting options

export const sanitizeJSON = (raw: string): string => {
  if (!raw) return "";

  return raw
    .trim()
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .replace(/\s+$/, ""); // remove trailing whitespace
};

/**
 * Sanitizes raw AI output text for chat responses.
 *
 * Removes:
 * - Accidental code fences (``` or ```json)
 * - Rogue markdown indicators
 * - "json" or "text" headers
 * - Excessive newlines
 * - Leading/trailing whitespace
 */
export const sanitizeText = (raw: string): string => {
  if (!raw) return "";

  let cleaned = raw.trim();

  // Remove fenced code blocks (```json, ```text, ``` etc)
  cleaned = cleaned
    .replace(/```json/gi, "")
    .replace(/```text/gi, "")
    .replace(/```/g, "");

  // Remove accidental "json" / "text" prefixes from models
  cleaned = cleaned.replace(/^(json|text)\s*/i, "");

  // Collapse multiple blank lines into a single blank line
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");

  // Normalize CRLF and weird spacing
  cleaned = cleaned.replace(/\r\n/g, "\n").trim();

  return cleaned;
};
