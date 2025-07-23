-- ¡No es necesario crear la base de datos aquí! 
-- La base "ratingdb" ya se crea con la variable POSTGRES_DB

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    movieId INT NOT NULL,
    text TEXT NOT NULL,
    rating FLOAT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author VARCHAR(255)
);
