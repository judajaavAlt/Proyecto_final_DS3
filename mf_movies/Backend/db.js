const { Pool } = require("pg");

// Configuración de la base de datos
const pool = new Pool({
  user: process.env.DB_USER || "myuser",
  host: process.env.DB_HOST || "db",
  database: process.env.DB_NAME || "mydatabase",
  password: process.env.DB_PASSWORD || "mypassword",
  port: process.env.DB_PORT || 5432,
});

// Función para probar la conexión
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Conexión a PostgreSQL establecida correctamente");
    client.release();
  } catch (err) {
    console.error("❌ Error conectando a PostgreSQL:", err.message);
  }
};

// Función para obtener todas las películas con sus géneros
const getAllMovies = async () => {
  try {
    const query = `
      SELECT 
        m.id,
        m.title,
        m.release_date,
        m.release_year,
        m.duration,
        m.classification,
        m.rating,
        m.synopsis,
        m.poster_url,
        m.hero_poster,
        m.trailer_url,
        array_agg(g.name) as genres
      FROM movies m
      LEFT JOIN movie_genres mg ON m.id = mg.movie_id
      LEFT JOIN genres g ON mg.genre_id = g.id
      GROUP BY m.id, m.title, m.release_date, m.release_year, m.duration, 
               m.classification, m.rating, m.synopsis, m.poster_url, m.hero_poster, m.trailer_url
      ORDER BY m.id
    `;

    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error("Error obteniendo películas:", err);
    throw err;
  }
};

// Función para obtener una película por título
const getMovieByTitle = async (title) => {
  try {
    const query = `
      SELECT 
        m.id,
        m.title,
        m.release_date,
        m.release_year,
        m.duration,
        m.classification,
        m.rating,
        m.synopsis,
        m.poster_url,
        m.hero_poster,
        m.trailer_url,
        array_agg(g.name) as genres
      FROM movies m
      LEFT JOIN movie_genres mg ON m.id = mg.movie_id
      LEFT JOIN genres g ON mg.genre_id = g.id
      WHERE m.title = $1
      GROUP BY m.id, m.title, m.release_date, m.release_year, m.duration, 
               m.classification, m.rating, m.synopsis, m.poster_url, m.hero_poster, m.trailer_url
    `;

    const result = await pool.query(query, [title]);
    return result.rows[0] || null;
  } catch (err) {
    console.error("Error obteniendo película por título:", err);
    throw err;
  }
};

// Función para obtener películas similares
const getSimilarMovies = async (title, limit = 10) => {
  try {
    const query = `
      WITH movie_genres AS (
        SELECT mg.movie_id, array_agg(g.name) as genres
        FROM movie_genres mg
        JOIN genres g ON mg.genre_id = g.id
        GROUP BY mg.movie_id
      ),
      target_movie AS (
        SELECT m.id, mg.genres
        FROM movies m
        JOIN movie_genres mg ON m.id = mg.movie_id
        WHERE m.title = $1
      )
      SELECT 
        m.id,
        m.title,
        m.release_date,
        m.release_year,
        m.duration,
        m.classification,
        m.rating,
        m.synopsis,
        m.poster_url,
        m.hero_poster,
        m.trailer_url,
        mg.genres
      FROM movies m
      JOIN movie_genres mg ON m.id = mg.movie_id
      CROSS JOIN target_movie tm
      WHERE m.id != tm.id
        AND mg.genres && tm.genres
      ORDER BY 
        array_length(array(
          SELECT unnest(mg.genres) INTERSECT SELECT unnest(tm.genres)
        ), 1) DESC,
        m.rating DESC
      LIMIT $2
    `;

    const result = await pool.query(query, [title, limit]);
    return result.rows;
  } catch (err) {
    console.error("Error obteniendo películas similares:", err);
    throw err;
  }
};

// Función para obtener películas por género
const getMoviesByGenre = async (genre, limit = 20) => {
  try {
    const query = `
      SELECT 
        m.id,
        m.title,
        m.release_date,
        m.release_year,
        m.duration,
        m.classification,
        m.rating,
        m.synopsis,
        m.poster_url,
        m.hero_poster,
        m.trailer_url,
        array_agg(g.name) as genres
      FROM movies m
      JOIN movie_genres mg ON m.id = mg.movie_id
      JOIN genres g ON mg.genre_id = g.id
      WHERE g.name ILIKE $1
      GROUP BY m.id, m.title, m.release_date, m.release_year, m.duration, 
               m.classification, m.rating, m.synopsis, m.poster_url, m.hero_poster, m.trailer_url
      ORDER BY m.rating DESC
      LIMIT $2
    `;

    const result = await pool.query(query, [genre, limit]);
    return result.rows;
  } catch (err) {
    console.error("Error obteniendo películas por género:", err);
    throw err;
  }
};

// Función para obtener películas destacadas (rating alto)
const getFeaturedMovies = async (limit = 10) => {
  try {
    const query = `
      SELECT 
        m.id,
        m.title,
        m.release_date,
        m.release_year,
        m.duration,
        m.classification,
        m.rating,
        m.synopsis,
        m.poster_url,
        m.hero_poster,
        m.trailer_url,
        array_agg(g.name) as genres
      FROM movies m
      LEFT JOIN movie_genres mg ON m.id = mg.movie_id
      LEFT JOIN genres g ON mg.genre_id = g.id
      GROUP BY m.id, m.title, m.release_date, m.release_year, m.duration, 
               m.classification, m.rating, m.synopsis, m.poster_url, m.hero_poster, m.trailer_url
      ORDER BY m.rating DESC
      LIMIT $1
    `;

    const result = await pool.query(query, [limit]);
    return result.rows;
  } catch (err) {
    console.error("Error obteniendo películas destacadas:", err);
    throw err;
  }
};

// Función para obtener películas recientes
const getRecentMovies = async (limit = 10) => {
  try {
    const query = `
      SELECT 
        m.id,
        m.title,
        m.release_date,
        m.release_year,
        m.duration,
        m.classification,
        m.rating,
        m.synopsis,
        m.poster_url,
        m.hero_poster,
        m.trailer_url,
        array_agg(g.name) as genres
      FROM movies m
      LEFT JOIN movie_genres mg ON m.id = mg.movie_id
      LEFT JOIN genres g ON mg.genre_id = g.id
      GROUP BY m.id, m.title, m.release_date, m.release_year, m.duration, 
               m.classification, m.rating, m.synopsis, m.poster_url, m.hero_poster, m.trailer_url
      ORDER BY RANDOM()
      LIMIT $1
    `;

    const result = await pool.query(query, [limit]);
    return result.rows;
  } catch (err) {
    console.error("Error obteniendo películas recientes:", err);
    throw err;
  }
};

// Función para obtener todos los géneros
const getAllGenres = async () => {
  try {
    const query = "SELECT id, name FROM genres ORDER BY name";
    const result = await pool.query(query);
    return result.rows.map((row) => row.name);
  } catch (err) {
    console.error("Error obteniendo géneros:", err);
    throw err;
  }
};

// Función para buscar películas
const searchMovies = async (searchTerm, limit = 20) => {
  try {
    const query = `
      SELECT 
        m.id,
        m.title,
        m.release_date,
        m.release_year,
        m.duration,
        m.classification,
        m.rating,
        m.synopsis,
        m.poster_url,
        m.hero_poster,
        m.trailer_url,
        array_agg(g.name) as genres
      FROM movies m
      LEFT JOIN movie_genres mg ON m.id = mg.movie_id
      LEFT JOIN genres g ON mg.genre_id = g.id
      WHERE m.title ILIKE $1 OR m.synopsis ILIKE $1
      GROUP BY m.id, m.title, m.release_date, m.release_year, m.duration, 
               m.classification, m.rating, m.synopsis, m.poster_url, m.hero_poster, m.trailer_url
      ORDER BY m.rating DESC
      LIMIT $2
    `;

    const result = await pool.query(query, [`%${searchTerm}%`, limit]);
    return result.rows;
  } catch (err) {
    console.error("Error buscando películas:", err);
    throw err;
  }
};

// Función para obtener películas próximas
const getUpcomingMovies = async (limit = 10) => {
  try {
    const query = `
      SELECT 
        m.id,
        m.title,
        m.release_date,
        m.release_year,
        m.duration,
        m.classification,
        m.rating,
        m.synopsis,
        m.poster_url,
        m.hero_poster,
        m.trailer_url,
        array_agg(g.name) as genres
      FROM movies m
      LEFT JOIN movie_genres mg ON m.id = mg.movie_id
      LEFT JOIN genres g ON mg.genre_id = g.id
      GROUP BY m.id, m.title, m.release_date, m.release_year, m.duration, 
               m.classification, m.rating, m.synopsis, m.poster_url, m.hero_poster, m.trailer_url
      ORDER BY RANDOM()
      LIMIT $1
    `;
    const result = await pool.query(query, [limit]);
    return result.rows;
  } catch (err) {
    console.error("Error obteniendo películas próximas:", err);
    throw err;
  }
};

module.exports = {
  pool,
  testConnection,
  getAllMovies,
  getMovieByTitle,
  getSimilarMovies,
  getMoviesByGenre,
  getFeaturedMovies,
  getRecentMovies,
  getUpcomingMovies,
  getAllGenres,
  searchMovies,
};
