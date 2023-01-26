import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const uploadLink = createUploadLink({
  uri: process.env.NEXTAUTH_URL + "/graphql",
});

const client = new ApolloClient({
  uri: process.env.NEXTAUTH_URL + "/graphql",
  link: uploadLink,
  cache: new InMemoryCache({
    addTypename: false,
  }),
  // down code is important for logging in different users in different browser;
  // If this code is deleted then logging in will not work in different browser;
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
    },
    query: {
      fetchPolicy: "network-only",
    },
  },
});

export default client;
