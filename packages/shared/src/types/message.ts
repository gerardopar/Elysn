export type Message = {
  id: string;
  userId: string;
  sender: string;
  text: string;
  timestamp: number;
  metadata?: any;
};

export type MessageInput = {
  userId: string;
  sender: string;
  text: string;
  metadata?: any;
};
