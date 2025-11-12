import { useEffect, useMemo, useState } from "react";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { getAuth } from "firebase/auth";

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

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

  const apolloClient = useMemo(
    () =>
      new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      }),
    [authLink]
  );

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
