import { Message } from "../models/message";

export const updateMessageEmbedding = async (
  messageId: string,
  embedding: number[] | null
): Promise<void> => {
  await Message.updateOne({ _id: messageId }, { metadata: { embedding } });
};
