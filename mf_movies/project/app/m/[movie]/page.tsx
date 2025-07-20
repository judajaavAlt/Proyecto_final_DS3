import React from "react";
import MovieDetail from "../../ui/movies/MovieDetail";
import CarruselMovies from "../../ui/movies/CarruselMovies";
import {
  getMovieByIdFromAPI,
  getSimilarMoviesFromAPI,
} from "../../lib/moviePort";
import { PackageOpen, Home, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ movie: string }>;
}

export default async function Page({ params }: PageProps) {
  // Espera a que se resuelvan los parámetros
  const resolvedParams = await params;
  const movieId = decodeURIComponent(resolvedParams.movie);

  console.log("movieId", movieId);

  const selectedMovie = await getMovieByIdFromAPI(movieId);

  console.log("selectedMovie", selectedMovie);

  if (!selectedMovie) {
    return (
      <div className="bg-[#0F172A] min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-screen py-16 px-4">
          {/* Icono animado */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--red-light)]/20 to-orange-500/20 rounded-full blur-xl animate-pulse"></div>
            <PackageOpen className="relative h-24 w-24 text-gray-400 animate-bounce" />
          </div>

          {/* Mensaje principal */}
          <h1 className="text-4xl font-bold text-white mb-4 text-center">
            Película no encontrada
          </h1>

          {/* Mensaje secundario */}
          <p className="text-gray-400 text-center mb-8 max-w-md text-lg">
            Lo sentimos, no pudimos encontrar la película "{movieId}". Verifica
            el nombre o intenta buscar otra película.
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--red-light)] to-[var(--red-light)]/80 hover:from-[var(--red-light)]/90 hover:to-[var(--red-light)]/70 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5" />
              Volver al Inicio
            </Link>

            <Link
              href="/#movie-list"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Search className="w-5 h-5" />
              Explorar Películas
            </Link>
          </div>

          {/* Información adicional */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 max-w-lg w-full border border-gray-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">
              🔍 ¿Qué puedes hacer?
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[var(--red-light)] rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  Verifica que el nombre de la película esté escrito
                  correctamente
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Intenta buscar con el nombre original en inglés</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Explora nuestro catálogo completo de películas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Usa los filtros para encontrar películas similares</span>
              </li>
            </ul>
          </div>

          {/* Botón de retroceso */}
          <button
            onClick={() => window.history.back()}
            className="mt-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver atrás
          </button>
        </div>
      </div>
    );
  }

  const similarMovies = await getSimilarMoviesFromAPI(movieId);

  return (
    <div className="bg-[#0F172A]">
      <MovieDetail movie={selectedMovie} />
      <CarruselMovies movies={similarMovies} />
    </div>
  );
}
