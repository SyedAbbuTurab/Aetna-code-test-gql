const typeDefs = `#graphql

    type Movie {
        imdbId: ID!
        movieId: ID!
        title: String!
        genres: [String!]!
        releaseDate: String!
        budget: String!
    }
    type MovieDetials {
        imdbId: ID!
        title: String!
        description: String
        runtime:Int!
        averageRating: Float!
        genres: [String!]!
        releaseDate: String!
        originalLanguage: String!
        budget: String!
        productionCompanies:[String!]!
    }
    type Query {
        movies(page: Int!): [Movie]
        movie(imdbId: ID!): MovieDetials
    }

`
module.exports = typeDefs;
