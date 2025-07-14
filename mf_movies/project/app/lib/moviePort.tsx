import { Movie } from "../types/movie";
import { featuredMovies } from "./mockData";

export const getAllMovies = async (): Promise<Movie[]> => {
  // Simulación de llamada API con retraso
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return featuredMovies;
};

export const getMovieByTitle = async (
  title: string
): Promise<Movie | undefined> => {
  // Simulación de llamada API con retraso
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return featuredMovies.find((movie) => movie.title === title);
};

export const getSimilarMovies = (selectedMovie: Movie): Movie[] => {
  if (!selectedMovie.genres.length) return [];

  const [primaryGenre] = selectedMovie.genres;
  return featuredMovies
    .filter(
      (movie) =>
        movie.id !== selectedMovie.id && movie.genres.includes(primaryGenre)
    )
    .slice(0, 10);
};
