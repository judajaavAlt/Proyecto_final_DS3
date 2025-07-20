import { Movie } from "../types/movie";

// Función helper para obtener la URL base del API
const getApiBaseUrl = () => {
  // En el servidor (Server Components), usar la URL del servicio Docker
  if (typeof window === "undefined") {
    return "http://backend:3001";
  }
  // En el cliente, usar localhost
  return "http://localhost:3001";
};

// Función para obtener todas las películas desde el backend API
export const getAllMoviesFromAPI = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${getApiBaseUrl()}/movies`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Función para obtener una película por ID desde el backend API
export const getMovieByIdFromAPI = async (
  movieId: string
): Promise<Movie | null> => {
  try {
    const response = await fetch(`${getApiBaseUrl()}/movies/${movieId}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const movie = await response.json();
    return movie;
  } catch (error) {
    console.error("Error fetching movie:", error);
    return null;
  }
};

// Nueva función para obtener películas similares desde el backend API
export const getSimilarMoviesFromAPI = async (
  movieId: string
): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${getApiBaseUrl()}/movies/${movieId}/similar`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const similarMovies = await response.json();
    return similarMovies;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    return [];
  }
};

export const getHeroMoviesFromAPI = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${getApiBaseUrl()}/hero-movies`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const heroMovies = await response.json();
    return heroMovies;
  } catch (error) {
    console.error("Error fetching hero movies:", error);
    return [];
  }
};

export const getTopMoviesFromAPI = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${getApiBaseUrl()}/top-movies`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const topMovies = await response.json();
    return topMovies;
  } catch (error) {
    console.error("Error fetching top movies:", error);
    return [];
  }
};

export const getRecentMoviesFromAPI = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${getApiBaseUrl()}/recent-movies`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const recentMovies = await response.json();
    return recentMovies;
  } catch (error) {
    console.error("Error fetching recent movies:", error);
    return [];
  }
};

export const getNextsMoviesFromAPI = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${getApiBaseUrl()}/nexts-movies`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const nextsMovies = await response.json();
    return nextsMovies;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return [];
  }
};

export const getGenresFromAPI = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${getApiBaseUrl()}/genres`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const genres = await response.json();
    return genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};
