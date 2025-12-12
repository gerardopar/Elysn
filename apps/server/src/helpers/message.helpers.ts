import { Message } from "../models/message.js";

import { MessageMetadata } from "@elysn/core";

export const updateMessageEmbedding = async (
  messageId: string,
  embedding: number[] | null
): Promise<void> => {
  await Message.updateOne({ _id: messageId }, { metadata: { embedding } });
};

export const updateMessageMetadata = async (
  messageId: string,
  metadata: Partial<MessageMetadata>
): Promise<void> => {
  await Message.updateOne({ _id: messageId }, { metadata });
};
