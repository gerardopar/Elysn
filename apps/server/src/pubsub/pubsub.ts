import { PubSub } from "graphql-subscriptions";
export const pubsub = new PubSub();

export const MESSAGE_CHANNEL = "NEW_MESSAGE";
export const PERSONA_STATUS_CHANNEL = "PERSONA_STATUS";
