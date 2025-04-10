const { moviesDb, ratingsDb } = require("../config/db.js")

const MOVIES_PER_PAGE = 50;

const resolvers = {
    Query: {
        movies: (_, { page = 1 }) => {
            const offset = (page - 1) * MOVIES_PER_PAGE;
            const sql = `SELECT imdbId, title, genres, releaseDate, budget
            FROM movies LIMIT ? OFFSET ? `;

            return new Promise((resolve, reject) => {
                moviesDb.all(sql, [MOVIES_PER_PAGE, offset], (err, rows) => {

                    if (err) return reject(err);

                    const formatted = rows.map((row) => ({
                        imbdId: row.imbdId,
                        title: row.title,
                        genres: row.genres,
                        releaseDate: row.releaseDate,
                        budget: `$${Number(row.budget).toLocaleString("en-US")}`
                    }))
                    resolve(formatted);
                })
            })
        }
    }
}

module.exports = resolvers;

