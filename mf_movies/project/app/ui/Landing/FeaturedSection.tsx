import { Calendar1 } from "lucide-react";

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
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="w-6 h-6 text-red-500" />
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>

      <div className="space-y-6">
        {movies.map((movie) => (
          <Link
            href={`/m/${movie.title}`}
            key={movie.id}
            className="flex gap-4 items-start group transition-transform duration-300 hover:translate-x-2"
          >
            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/50 group-hover:to-gray-900/30 transition-all duration-300" />
            </div>

            <div className="flex-1">
              <h4 className="font-semibold mb-1 group-hover:text-red-500 transition-colors">
                {movie.title}
              </h4>

              {type === "recent" ? (
                <>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <Calendar1 className="w-4 h-4" />
                    <span>Hace 3 días</span>
                  </div>
                  <div className="flex gap-2">
                    {movie.genres?.slice(0, 2).map((genre, index) => (
                      <span
                        key={`${movie.id}-${genre}`}
                        className="px-2 py-1 bg-gray-800 rounded-full text-xs font-medium text-gray-300"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <Calendar1 className="w-4 h-4" />
                    <span>Estreno: {movie.releaseYear}</span>
                  </div>
                  <div className="flex gap-2">
                    {movie.genres?.slice(0, 2).map((genre, index) => (
                      <span
                        key={`${movie.id}-${genre}`}
                        className="px-2 py-1 bg-gray-800 rounded-full text-xs font-medium text-gray-300"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
