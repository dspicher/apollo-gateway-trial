

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
       { name: "accounts", url: "http://localhost:4001/graphql" }
       // List of federation-capable GraphQL endpoints...
    ],
  }),
});

const server = new ApolloServer({ gateway });

// Note the top-level await!
const { url } = await startStandaloneServer(server);
console.log(`🚀  Server ready at ${url}`);