import { Persona } from "../../models/persona.js";
import { Memory } from "../../models/memory.js";

import { applyDecay } from "@elysn/core";

import { MemoryTypeEnum } from "@elysn/shared";

const BATCH_SIZE = 500;

/**
 * Applies natural memory decay to all personas' memories.
 *
 * @example
 * Triggered via API endpoint with cron secret authentication
 * POST /jobs/memory-decay
 * Headers: { "x-cron-secret": "..." }
 */
export const runMemoryDecayForAllPersonas = async () => {
  const now = new Date();

  // Fetch all persona IDs (lightweight query)
  const personas = await Persona.find({}, { _id: 1 }).lean();

  // Process each persona's memories independently
  for (const p of personas) {
    const personaId = String(p._id);

    let skip = 0;

    // Batch processing to avoid loading all memories into memory at once
    while (true) {
      const memories = await Memory.find({ personaId })
        .sort({ _id: 1 })
        .skip(skip)
        .limit(BATCH_SIZE)
        .lean();

      if (memories.length === 0) break;

      for (const m of memories) {
        // Apply decay
        const { updatedMetadata, shouldDelete } = applyDecay(m.metadata, now);

        // Never delete LTMs
        if (shouldDelete && m.type !== MemoryTypeEnum.LTM) {
          await Memory.deleteOne({ _id: m._id });
        } else {
          // Update metadata with decayed metadata
          await Memory.updateOne(
            { _id: m._id },
            {
              $set: {
                metadata: updatedMetadata,
                lastUpdated: now,
              },
            }
          );
        }
      }

      skip += memories.length;
    }
  }
};
