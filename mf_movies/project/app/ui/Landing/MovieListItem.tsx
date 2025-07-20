import { Star, Calendar, Clock, Film, Play } from "lucide-react";
import Link from "next/link";

import { Movie } from "../../types/movie";

export function MovieListItem({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/m/${movie.title}`}
      key={movie.id}
      target="_blank"
      className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500 ease-out shadow-xl hover:shadow-2xl hover:shadow-[var(--red-light)]/20 border border-gray-700/30 hover:border-[var(--red-light)]/50"
    >
      <div className="flex">
        {/* Contenedor de imagen mejorado */}
        <div className="relative w-72 overflow-hidden">
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          {/* Overlay gradiente mejorado */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/60 group-hover:to-black/80 transition-all duration-500" />

          {/* Badges superiores */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            {/* Rating Badge */}
            <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-bold text-white">
                {movie.rating}
              </span>
            </div>

            {/* Classification Badge */}
            <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5">
              <span className="text-sm font-bold text-white">
                {movie.classification}
              </span>
            </div>
          </div>

          {/* Botón de play mejorado */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-16 h-16 bg-[var(--red-light)]/90 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-8 h-8 text-white fill-current" />
            </div>
          </div>
        </div>

        {/* Contenedor de información mejorado */}
        <div className="flex-1 p-8 flex flex-col justify-between">
          <div>
            {/* Header con título y rating */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-3xl font-bold text-white group-hover:text-[var(--red-light)] transition-colors duration-300 leading-tight">
                {movie.title}
              </h3>
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 rounded-xl flex items-center font-bold shadow-lg">
                <Star size={18} className="mr-2 fill-current" />
                {movie.rating}/5
              </div>
            </div>

            {/* Géneros mejorados */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.slice(0, 3).map((genre, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-sm font-medium text-blue-300 backdrop-blur-sm hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300"
                >
                  {genre}
                </span>
              ))}
              {movie.genres.length > 3 && (
                <span className="px-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-full text-sm font-medium text-gray-400">
                  +{movie.genres.length - 3}
                </span>
              )}
            </div>

            {/* Sinopsis mejorada */}
            <p className="text-gray-300 line-clamp-3 mb-6 leading-relaxed text-lg">
              {movie.synopsis}
            </p>
          </div>

          {/* Footer con metadatos y botón */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-gray-300 bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="font-medium">{movie.release_year}</span>
              </span>
              <span className="flex items-center gap-2 text-gray-300 bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-green-400" />
                <span className="font-medium">{movie.duration} min</span>
              </span>
              <span className="flex items-center gap-2 text-gray-300 bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                <Film className="w-4 h-4 text-purple-400" />
                <span className="font-medium">{movie.classification}</span>
              </span>
            </div>

            {/* Botón mejorado */}
            <button className="bg-gradient-to-r from-[var(--red-light)] to-[var(--red-light)]/80 hover:from-[var(--red-light)]/90 hover:to-[var(--red-light)]/70 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[var(--red-light)]/25">
              Ver Detalles
            </button>
          </div>
        </div>
      </div>

      {/* Efecto de borde en hover */}
      <div className="absolute inset-0 border-2 border-[var(--red-light)]/0 group-hover:border-[var(--red-light)]/50 rounded-2xl transition-all duration-500 pointer-events-none" />
    </Link>
  );
}
