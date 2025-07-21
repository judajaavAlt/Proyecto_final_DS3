const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");

app.use(cors()); // Permitir todos los orígenes
app.use(express.json()); // Para parsear JSON

// Importar la configuración de la base de datos
const {
  testConnection,
  getAllMovies,
  getMovieByTitle,
  getSimilarMovies,
  getMoviesByGenre,
  getFeaturedMovies,
  getRecentMovies,
  getAllGenres,
  searchMovies,
  getUpcomingMovies,
} = require("./db");

// Probar conexión a la base de datos al iniciar
testConnection();

// Obtener todas las películas
app.get("/movies", async (req, res) => {
  try {
    const movies = await getAllMovies();
    res.json(movies);
  } catch (error) {
    console.error("Error en /movies:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener una película por título
app.get("/movies/:title", async (req, res) => {
  try {
    const movie = await getMovieByTitle(req.params.title);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    console.error("Error en /movies/:title:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener películas similares
app.get("/movies/:title/similar", async (req, res) => {
  try {
    const similarMovies = await getSimilarMovies(req.params.title, 10);
    res.json(similarMovies);
  } catch (error) {
    console.error("Error en /movies/:title/similar:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener películas por género
app.get("/movies/genre/:genre", async (req, res) => {
  try {
    const movies = await getMoviesByGenre(req.params.genre, 20);
    res.json(movies);
  } catch (error) {
    console.error("Error en /movies/genre/:genre:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Buscar películas
app.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Query parameter 'q' is required" });
    }
    const movies = await searchMovies(q, 20);
    res.json(movies);
  } catch (error) {
    console.error("Error en /search:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Películas destacadas (hero movies)
app.get("/hero-movies", async (req, res) => {
  try {
    const movies = await getFeaturedMovies(6);
    res.json(movies);
  } catch (error) {
    console.error("Error en /hero-movies:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Top películas
app.get("/top-movies", async (req, res) => {
  try {
    const movies = await getFeaturedMovies(10);
    res.json(movies);
  } catch (error) {
    console.error("Error en /top-movies:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Películas recientes
app.get("/recent-movies", async (req, res) => {
  try {
    const movies = await getRecentMovies(5);
    res.json(movies);
  } catch (error) {
    console.error("Error en /recent-movies:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Próximas películas (películas más recientes)
app.get("/nexts-movies", async (req, res) => {
  try {
    const movies = await getUpcomingMovies(5);
    res.json(movies);
  } catch (error) {
    console.error("Error en /nexts-movies:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener todos los géneros
app.get("/genres", async (req, res) => {
  try {
    const genres = await getAllGenres();
    res.json(genres);
  } catch (error) {
    console.error("Error en /genres:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Movies service running on port ${PORT}`);
});
