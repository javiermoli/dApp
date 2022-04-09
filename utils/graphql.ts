import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/juanigallo/cdai-kovan-subgraph",
  }),
});
