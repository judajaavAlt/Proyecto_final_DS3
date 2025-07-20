import { Star, Calendar, Clock, Film, Play } from "lucide-react";
import Link from "next/link";

import { Movie } from "../../types/movie";

export function MovieListItem({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/m/${movie.title}`}
      key={movie.id}
      target="_blank"
      className="group bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500 ease-out shadow-xl hover:shadow-2xl"
    >
      <div className="flex">
        <div className="relative w-64 overflow-hidden">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover transform group-hover:scale-125 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-8 h-8 text-white" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/30 group-hover:to-gray-900/50 transition-all duration-300" />
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-2xl font-bold">{movie.title}</h3>
              <div className="bg-yellow-400 text-black px-3 py-1 rounded-lg flex items-center font-semibold">
                <Star size={16} className="mr-1" />
                {movie.rating}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres.map((g, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm font-medium text-gray-300"
                >
                  {g}
                </span>
              ))}
            </div>
            <p className="text-gray-300 line-clamp-2 mb-4">{movie.synopsis}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                {movie.releaseYear}
              </span>
              <span className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                {movie.duration}
              </span>
              <span className="flex items-center gap-2 text-gray-400">
                <Film className="w-4 h-4" />
                {movie.classification}
              </span>
            </div>
            <button className="text-red-500 hover:text-red-400 font-medium transition-colors duration-300">
              Leer más
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
