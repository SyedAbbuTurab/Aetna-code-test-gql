const { moviesDb, ratingsDb } = require("../config/db.js")

const MOVIES_PER_PAGE = 50;

const resolvers = {
    Query: {
      movie: async (_, { imdbId }) => {
        const movieQuery = `
          SELECT *
          FROM movies
          WHERE imdbId = ?
        `;
  
        return new Promise((resolve, reject) => {
          moviesDb.get(movieQuery, [imdbId], (err, movie) => {
            if (err) return reject(err);
            if (!movie) return resolve(null);
  
            // Step 2: fetch average rating from ratings.db using movieId
            ratingsDb.get(
              `SELECT AVG(rating) as averageRating FROM ratings WHERE movieId = ?`,
              [movie.movieId],
              (ratingErr, ratingRow) => {
                if (ratingErr) return reject(ratingErr);
  
                const averageRating = ratingRow?.averageRating
                  ? parseFloat(ratingRow.averageRating.toFixed(2))
                  : null;
  
                resolve({
                  imdbId: movie.imdbId,
                  title: movie.title,
                  description: movie.overview,
                  releaseDate: movie.releaseDate,
                  budget: `$${Number(movie.budget).toLocaleString("en-US")}`,
                  runtime: movie.runtime,
                  averageRating,
                  genres: movie.genres
                    ? JSON.parse(movie.genres).map((g) => g.name)
                    : [],
                  originalLanguage: movie.language,
                  productionCompanies: movie.productionCompanies
                    ? JSON.parse(movie.productionCompanies).map((p) => p.name)
                    : [],
                });
              }
            );
          });
        });
      },
    },
  };
  

module.exports = resolvers;

