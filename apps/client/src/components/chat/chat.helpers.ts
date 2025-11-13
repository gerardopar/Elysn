import z from "zod";

export const chatInputSchema = z.object({
  input: z.string().min(1),
});

export type ChatInputSchema = z.infer<typeof chatInputSchema>;

export const INPUT_PLACEHOLDERS: string[] = [
  "I'm listening...",
  "What’s on your mind?",
  "Talk to me.",
  "How are you feeling right now?",
  "You can tell me anything.",
  "What should we explore together?",
  "I’m here. Type whenever you're ready.",
  "What’s the first thought in your head?",
  "Is something bothering you?",
  "Tell me something true.",
  "What do you need in this moment?",
  "What are you thinking about?",
  "Want to share a memory?",
  "I’m right here with you.",
  "Say anything. I’ll follow.",
  "What kind of day are you having?",
  "Let’s start wherever you want.",
  "If you could say one honest thing, what would it be?",
  "What are you curious about right now?",
  "I’m here to listen, not to judge.",
];
