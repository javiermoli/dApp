import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "../utils/web3";
import { ApolloProvider } from "@apollo/client";
import { client } from "../utils/graphql";
import Layout from "../components/Layout/Layout";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../utils/reactQuery";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Web3ReactProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default MyApp;
