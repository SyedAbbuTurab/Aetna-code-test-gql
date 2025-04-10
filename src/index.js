const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const dotenv = require("dotenv").config();

const typeDefs = require('./schema.js');
const resolvers = require('./resolvers/movieResolvers.js');

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 8000 },
  });

  console.log(`Server ready at: ${url}`);
}

startServer();
