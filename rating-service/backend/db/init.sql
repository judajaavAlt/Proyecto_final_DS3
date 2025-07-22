-- Crea la base de datos (si no existe)
CREATE DATABASE IF NOT EXISTS reviewsdb;
USE reviewsdb;

-- Crea la tabla de reseñas
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    movieId INT NOT NULL,
    text TEXT NOT NULL,
    rating FLOAT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    author VARCHAR(255)
); 