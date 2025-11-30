import { Resolvers } from "src/graphql/__generated__/graphql";

import { pubsub, PERSONA_STATUS_CHANNEL } from "../pubsub/pubsub";

export const personaResolvers: Resolvers = {
  Subscription: {
    personaStatus: {
      subscribe: (_parent, { chatId }) =>
        pubsub.asyncIterableIterator(`${PERSONA_STATUS_CHANNEL}_${chatId}`),
    },
  },
};
