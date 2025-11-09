import z from "zod";

export const chatSchema = z.object({
  input: z.string().min(1),
});

export type ChatSchema = z.infer<typeof chatSchema>;
