import { Message } from "./message";

export type Memory = {
  userId: string;
  lastTopic: string;
  lastMessage: string;
  history: Message[];
  updatedAt: number;
};
