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

export const updateMessageMetadataAsync = async (
  messageId: string,
  topics: string[] | null,
  embedding: number[] | null,
  extractedUserSignal: {
    sentiment: number;
    emotion: string;
    intensity: number;
  } | null
): Promise<void> => {
  const payload: Partial<MessageMetadata> = {};

  if (topics) payload.topics = topics ?? [];
  if (embedding) payload.embedding = embedding ?? [];

  if (extractedUserSignal?.emotion)
    payload.emotion = extractedUserSignal.emotion;

  await Message.updateOne(
    { _id: messageId },
    {
      $set: {
        metadata: {
          topics: payload.topics,
          embedding: payload.embedding,
          emotion: payload.emotion,
        },
      },
    }
  );
};
