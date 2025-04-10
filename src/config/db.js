const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Full path to DB files
const moviesDbPath = path.join(__dirname, "..", "..", process.env.MOVIES_DB);
const ratingsDbPath = path.join(__dirname, "..", "..", process.env.RATINGS_DB);

// Open movie database
const moviesDb = new sqlite3.Database(moviesDbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) console.log("Error connecting to movies.db:", err.message);
});

// Open ratings database
const ratingsDb = new sqlite3.Database(ratingsDbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) console.log("Error connecting to ratings.db:", err.message);
});

module.exports = {
  moviesDb,
  ratingsDb,
};
