# 🎬 GraphQL Movies API

A backend GraphQL API to query movies and ratings using SQLite databases. This project supports pagination, filtering by year or genre, and provides detailed movie information including average ratings.

---

## 🚀 Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework for Node
- **Apollo Server** – GraphQL server integration with Express
- **GraphQL** – Flexible query language for APIs
- **SQLite3** – Lightweight relational database
- **dotenv** – Manage environment variables

---

## 📁 Project Structure

```
.
├── src
│   ├── config
│   │   └── db.js              # DB connection to SQLite
│   ├── resolvers
│   │   └── movieResolvers.js  # GraphQL resolvers
│   ├── schema.js              # GraphQL schema definitions
│   └── index.js               # Entry point (Apollo Server setup)
├── .env                       # Environment config
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root and add:

```env
MOVIES_DB=data/movies.db
RATINGS_DB=data/ratings.db
```

> Ensure your `.db` files are in the `data/` directory or update paths accordingly.

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/graphql-movies-api.git
cd graphql-movies-api
```

### 2. Install dependencies

```bash
npm install
```

---

## ▶️ Running the Server

```bash
npm start
```

Server will be running at:

```
http://localhost:8000/graphql
```

---

## 🧪 Example Queries

### 🔹 Get Paginated Movies
```graphql
query {
  movies(page: 1) {
    imdbId
    title
    genres
    releaseDate
    budget
  }
}
```

### 🔹 Get Movie Details
```graphql
query {
  movie(imdbId: "tt0382625") {
    imdbId
    title
    description
    runtime
    averageRating
    genres
    releaseDate
    originalLanguage
    budget
    productionCompanies
  }
}
```

### 🔹 Movies By Year
```graphql
query {
  moviesByYear(year: 2005, page: 1, sortOrder: "desc") {
    imdbId
    title
    releaseDate
    budget
  }
}
```

### 🔹 Movies By Genre
```graphql
query {
  moviesByGenre(genre: "Drama", page: 1) {
    imdbId
    title
    genres
    releaseDate
    budget
  }
}
```

---

## 📌 Notes

- Genres and production companies are stored as JSON in the database and parsed accordingly in resolvers.
- Ratings are fetched from a separate SQLite database (`ratings.db`).

---

## 🧑‍💻 Author

**Syed Abbu Turab**

---

## 📄 License

MIT