export type Message = {
  id: string;
  userId: string;
  sender: MessageSenderEnum;
  text: string;
  timestamp: number;
  metadata?: any;
};

export type MessageInput = {
  userId: string;
  sender: MessageSenderEnum;
  text: string;
  metadata?: any;
};

export enum MessageSenderEnum {
  USER = "USER",
  AI = "AI",
}
