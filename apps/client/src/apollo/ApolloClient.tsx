import { useEffect, useMemo, useState } from "react";
import { ApolloProvider } from "@apollo/client/react";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { getAuth } from "firebase/auth";
import { createClient } from "graphql-ws";
import { SetContextLink } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";

const HTTP_URL = import.meta.env.VITE_GRAPHQL_HTTP;
const WS_URL = import.meta.env.VITE_GRAPHQL_WS;

export const useApolloClient = () => {
  const auth = getAuth();
  const [ready, setReady] = useState(false);

  const authLink = useMemo(
    () =>
      new SetContextLink(async (prevCtx) => {
        const user = auth.currentUser;
        const token = user
          ? await user.getIdToken(true).catch((error) => {
              console.error("Error getting ID token:", error);
              return "";
            })
          : "";
        return {
          headers: {
            ...prevCtx.headers,
            authorization: token ? `Bearer ${token}` : "",
          },
        };
      }),
    [auth]
  );

  /** 🌐 HTTP Link for queries + mutations */
  const httpLink = useMemo(() => new HttpLink({ uri: HTTP_URL }), []);

  /** 🔌 WebSocket Link for subscriptions */
  const wsLink = useMemo(() => {
    const wsClient = createClient({
      url: WS_URL,
      connectionParams: async () => {
        const user = auth.currentUser;
        const token = user ? await user.getIdToken(true).catch(() => "") : "";
        return {
          Authorization: token ? `Bearer ${token}` : "",
        };
      },
    });

    return new GraphQLWsLink(wsClient);
  }, [auth]);

  /** ⚡ Split link: HTTP for queries/mutations, WS for subscriptions */
  const splitLink = useMemo(
    () =>
      ApolloLink.split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        authLink.concat(httpLink)
      ),
    [authLink, httpLink, wsLink]
  );

  /** 🚀 Apollo Client instance */
  const apolloClient = useMemo(
    () =>
      new ApolloClient({
        link: splitLink,
        cache: new InMemoryCache(),
      }),
    [splitLink]
  );

  /** ✅ Wait for Firebase auth before rendering */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      setReady(true);
    });
    return () => unsubscribe();
  }, [auth]);

  return { apolloClient, ready };
};

export const ApolloClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { apolloClient, ready } = useApolloClient();
  if (!ready) return null;

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
