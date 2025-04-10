const typeDefs = `#graphql

    type Movie {
        imdbId: ID!
        title: String!
        genres: [String!]!
        releaseDate: String!
        budget: String!
    }
    type Query {
        movies(page: Int!): [Movie]
    }

`
module.exports = typeDefs;
