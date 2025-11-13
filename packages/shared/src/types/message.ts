export type Message = {
  id: string;
  chatId: string | null | undefined;
  userId: string;
  sender: MessageSenderEnum;
  text: string;
  timestamp: number;
  metadata?: any;
};

export type MessageInput = {
  chatId?: string;
  userId: string;
  sender: MessageSenderEnum;
  text: string;
  metadata?: any;
};

export enum MessageSenderEnum {
  USER = "USER",
  AI = "AI",
}
