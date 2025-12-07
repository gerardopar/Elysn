import { Request, Response, Router } from "express";

import { runMemoryDecayForAllPersonas } from "./scripts/memory-jobs";

export const jobsRouter = Router();

jobsRouter.post("/memory-decay", async (req: Request, res: Response) => {
  if (req.headers["x-cron-secret"] !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Kick off the job but don't block the HTTP response forever
  runMemoryDecayForAllPersonas()
    .then(() => console.log("[memory-decay] Completed"))
    .catch((err) => console.error("[memory-decay] Failed:", err));

  // Respond immediately so the cron caller doesn’t time out
  res.json({ ok: true, started: true });
});

export default jobsRouter;
