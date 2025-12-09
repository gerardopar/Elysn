import { Resolvers } from "../graphql/__generated__/graphql.js";

import { pubsub, PERSONA_STATUS_CHANNEL } from "../pubsub/pubsub.js";

export const personaResolvers: Resolvers = {
  Subscription: {
    personaStatus: {
      subscribe: (_parent, { chatId }) =>
        pubsub.asyncIterableIterator(`${PERSONA_STATUS_CHANNEL}_${chatId}`),
    },
  },
};
