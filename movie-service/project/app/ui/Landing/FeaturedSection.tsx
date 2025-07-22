import { Calendar1 } from "lucide-react";

import { Movie } from "../../types/movie";
import Link from "next/link";

export function FeaturedSection({
  title,
  icon: Icon,
  movies,
  type,
}: {
  title: string;
  icon: any;
  movies: Movie[];
  type: "recent" | "upcoming";
}) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="w-6 h-6 text-red-500" />
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>

      <div className="space-y-6">
        {movies.map((movie) => {
          // Generar una fecha aleatoria entre 1 y 30 días desde hoy para cada película
          const randomDate = new Date(
            new Date().getTime() + Math.random() * 1000 * 60 * 60 * 24 * 30
          ).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          return (
            <Link
              href={`/m/${movie.title}`}
              target="_blank"
              key={movie.id}
              className="flex gap-4 items-start group transition-transform duration-300 hover:translate-x-2"
            >
              <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                <img
                  src={movie.poster_url}
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
                      <span>
                        Se estrenó hace {Math.floor(Math.random() * 7) + 1} días
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {movie.synopsis}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <Calendar1 className="w-4 h-4" />
                      <span>Se estrena: {randomDate}</span>
                    </div>
                    <div className="flex gap-2">
                      {movie.genres?.slice(0, 2).map((genre, index) => (
                        <span
                          key={index}
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
          );
        })}
      </div>
    </div>
  );
}
