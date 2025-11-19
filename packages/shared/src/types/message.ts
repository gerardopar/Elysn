export type Message = {
  id: string;
  userId: string;
  chatId: string | null | undefined;
  personaId: string;
  sender: MessageSenderEnum;
  text: string;
  timestamp: number;
  metadata?: any;
};

export type MessageInput = {
  chatId?: string;
  sender: MessageSenderEnum;
  text: string;
  metadata?: any;
};

export enum MessageSenderEnum {
  USER = "USER",
  AI = "AI",
}
