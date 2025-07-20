import React from "react";
import MovieDetail from "../../ui/movies/MovieDetail";
import CarruselMovies from "../../ui/CarruselMovies";
import { getMovieByTitle, getSimilarMovies } from "../../lib/moviePort";

interface PageProps {
  params: Promise<{ movie: string }>;
}

export default async function Page({ params }: PageProps) {
  // Espera a que se resuelvan los parámetros
  const resolvedParams = await params;
  const movieTitle = decodeURIComponent(resolvedParams.movie);

  const selectedMovie = await getMovieByTitle(movieTitle);
  if (!selectedMovie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-bold">Movie not found</h2>
      </div>
    );
  }

  const similarMovies = await getSimilarMovies(selectedMovie);

  return (
    <div className="bg-[#0F172A]">
      <MovieDetail movie={selectedMovie} />
      <CarruselMovies movies={similarMovies} />
    </div>
  );
}
