const { ApolloServer } = require("@apollo/server");
const express = require("express");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotEnv = require("dotenv").config()

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

async function startServer () {
    const app = express();
    const server = new ApolloServer({ typeDefs, resolvers });
    // dotEnv.config();
    await server.start();

    app.use(cors());
    app.use(bodyParser.json()); 

    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => {
        console.log(`🚀 Server running at http://localhost:8000/graphql`);
    });
}

startServer();
