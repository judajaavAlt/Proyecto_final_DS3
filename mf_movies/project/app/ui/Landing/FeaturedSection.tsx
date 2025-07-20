import { Calendar1, Clock, Star, Film } from "lucide-react";
import { Movie } from "../../types/movie";
import Link from "next/link";

export function FeaturedSection({
  title,
  icon: Icon,
  movies,
  type,
}: Readonly<{
  title: string;
  icon: any;
  movies: Movie[];
  type: "recent" | "upcoming";
}>) {
  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700/50">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--red-light)] to-orange-500 rounded-lg blur-lg opacity-50"></div>
            <Icon className="relative w-8 h-8 text-[var(--red-light)]" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="text-gray-400 text-sm">
              {type === "recent"
                ? "Películas recientemente añadidas"
                : "Próximos estrenos"}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{movies.length}</div>
          <div className="text-xs text-gray-400">Películas</div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="space-y-4">
        {movies.map((movie, index) => (
          <Link
            href={`/m/${movie.title}`}
            key={movie.id}
            target="_blank"
            className="group block"
          >
            <div className="relative bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30 hover:border-[var(--red-light)]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--red-light)]/10">
              <div className="flex gap-4">
                {/* Movie Poster */}
                <div className="relative w-20 h-28 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-bold text-white">
                        {movie.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Movie Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-lg text-white mb-2 group-hover:text-[var(--red-light)] transition-colors duration-300 line-clamp-2">
                    {movie.title}
                  </h4>

                  {/* Quick Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar1 className="w-4 h-4 text-blue-400" />
                      <span>{movie.release_year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-green-400" />
                      <span>{movie.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Film className="w-4 h-4 text-purple-400" />
                      <span>{movie.classification}</span>
                    </div>
                  </div>

                  {/* Genres */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {movie.genres?.slice(0, 3).map((genre) => (
                      <span
                        key={`${movie.id}-${genre}`}
                        className="px-3 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-xs font-medium text-blue-300 backdrop-blur-sm"
                      >
                        {genre}
                      </span>
                    ))}
                    {movie.genres && movie.genres.length > 3 && (
                      <span className="px-3 py-1 bg-gray-700/50 border border-gray-600/30 rounded-full text-xs font-medium text-gray-400">
                        +{movie.genres.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Synopsis Preview */}
                  <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
                    {movie.synopsis.length > 120
                      ? movie.synopsis.slice(0, 120) + "..."
                      : movie.synopsis}
                  </p>
                </div>

                {/* Hover Effect Arrow */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--red-light)]/10 border border-[var(--red-light)]/20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                  <svg
                    className="w-4 h-4 text-[var(--red-light)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--red-light)]/5 to-orange-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-700/50">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>Explora más películas</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>Actualizado recientemente</span>
          </div>
        </div>
      </div>
    </div>
  );
}
