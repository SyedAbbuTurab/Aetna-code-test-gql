const { moviesDb, ratingsDb } = require("../config/db.js")

const MOVIES_PER_PAGE = 50;

const resolvers = {
    Query: {
        movies: (_, { page = 1 }) => {
            const offset = (page - 1) * MOVIES_PER_PAGE;
            const sql = `SELECT movieId, imdbId, title, genres, releaseDate, budget
            FROM movies LIMIT ? OFFSET ? `;

            return new Promise((resolve, reject) => {
                moviesDb.all(sql, [MOVIES_PER_PAGE, offset], (err, rows) => {

                    if (err) return reject(err);

                    const formatted = rows.map((row) => ({
                        imdbId: row.imdbId,
                        movieId: row.movieId,
                        title: row.title,
                        genres: JSON.parse(row.genres).map((g) => g.name),
                        releaseDate: row.releaseDate,
                        budget: `$${Number(row.budget).toLocaleString("en-US")}`
                    }))
                    resolve(formatted);
                })
            })
        },
        movie: (_, { imdbId }) => {

            const sql = `SELECT * FROM movies WHERE imdbId = ?`;

            return new Promise((resolve, reject) => {
                moviesDb.get(sql, [imdbId], (err, movie) => {

                    if (err) return reject(err);
                    if (!movie) return reject(null);
                    console.log(movie);


                    sqlRating = `SELECT AVG(rating) AS average_rating FROM ratings WHERE movieId = ?`;

                    ratingsDb.get(sqlRating, [movie.movieId], (errRating, ratingRows) => {
                        if (errRating) return reject(errRating);

                        console.log("ratingRows", ratingRows);

                        const formatted = {
                            imdbId: movie.imdbId,
                            title: movie.title,
                            releaseDate: movie.releaseDate,
                            genres: JSON.parse(movie.genres || "[]").map(g => g.name),
                            description: movie.overview,
                            originalLanguage: movie.language ?? "Unknown",
                            productionCompanies: JSON.parse(movie.productionCompanies || []).map(p => p.name),
                            averageRating: ratingRows && ratingRows.average_rating !== null
                                ? parseFloat(ratingRows.average_rating).toFixed(1)
                                : null
                        }
                        resolve(formatted)
                    })

                })
            })
        }
    }
}

module.exports = resolvers;

