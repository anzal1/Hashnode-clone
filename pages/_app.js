import { ApolloProvider } from "@apollo/client";
import NextProgress from "nextjs-progressbar";
import ContextHandler from "utils/context/main";
import client from "utils/helpers/config/apollo-client";
import "../styles/globals.css";
import "../styles/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ApolloProvider client={client}>
        <ContextHandler values={{ name: "Ujenbasi" }}>
          <NextProgress color="rgb(91 121 209)" />
          <Component {...pageProps} />
        </ContextHandler>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
