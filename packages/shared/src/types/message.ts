export enum MessageSenderEnum {
  USER = "USER",
  AI = "AI",
}

export type Message = {
  id: string;
  userId: string;
  chatId: string | null | undefined;
  personaId?: string | null | undefined;
  sender: MessageSenderEnum;
  text: string;
  timestamp: number;
  metadata?: {
    emotion?: string;
    intent?: string;
    memoryTag?: string;
    isMemoryWorthy?: boolean;
    topics?: string[];
    embedding?: number[];
  };
};

export type MessageInput = {
  chatId?: string;
  sender: MessageSenderEnum;
  text: string;
  metadata?: {
    emotion?: string;
    intent?: string;
    memoryTag?: string;
    isMemoryWorthy?: boolean;
    topics?: string[];
    embedding?: number[];
  };
};
