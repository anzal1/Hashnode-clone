const typeDefs = require("./typeDefs/index.js");
const resolvers = require("./resolvers/index.js");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { graphqlUploadExpress } = require("graphql-upload");
const CookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connect = require("../../../server/config/db.js");

dotenv.config();

// CORS configuration
const corsOptions = {
  origin: true,
  credentials: true,
};

async function startApolloServer(typeDefs, resolvers) {
  try {
    const app = express();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      // cors: cors(corsOptions),
      context: async ({ req, res }) => {
        return { req, res };
      },
    });

    await server.start();

    app.use(CookieParser());
    app.use(graphqlUploadExpress());
    connect();

    server.applyMiddleware({ app, cors: corsOptions });

    await new Promise((resolve) => app.listen({ port: 5000 }, resolve));

    console.log(
      `🚀 Server ready at localhost:5000${server.graphqlPath}` // https://hashnode-azure.vercel.app
    );
  } catch (err) {
    console.log("Error: ", err);
  }
}

startApolloServer(typeDefs, resolvers);
