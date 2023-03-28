

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
       { name: "_Service", url: "http://localhost:3000/graphql" }, // 21travel
       { name: "_service", url: "http://localhost:5000/graphql" } // postgraphile, doesn't work
       // List of federation-capable GraphQL endpoints...
    ],
  }),
});

const server = new ApolloServer({ gateway });

// Note the top-level await!
const { url } = await startStandaloneServer(server);
console.log(`🚀  Server ready at ${url}`);
