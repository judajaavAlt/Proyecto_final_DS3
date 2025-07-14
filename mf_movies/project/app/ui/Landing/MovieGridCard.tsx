import { Star, Calendar, Clock, Play } from "lucide-react";
import Link from "next/link";

import { Movie } from "../../types/movie";

export function MovieGridCard({ movie }: { movie: Movie }) {
  return (
    <Link
      key={movie.id}
      href={`/m/${movie.title}`}
      className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden transform hover:scale-[1.03] transition-all duration-500 ease-out shadow-xl hover:shadow-2xl"
    >
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transform group-hover:scale-125 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="w-8 h-8 text-white" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent group-hover:via-gray-900/30 transition-all duration-300" />
        <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-lg flex items-center font-semibold z-10">
          <Star size={16} className="mr-1" />
          {movie.rating}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex gap-2 text-center items-center">
            <h3 className="text-2xl font-bold mb-2">{movie.title}</h3>
            <div className="h-6 w-px bg-gray-600" />
            <span className="text-gray-200 font-bold">{movie.releaseYear}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {movie.genres.map((g, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-800/80 rounded-full text-sm font-medium text-gray-300"
              >
                {g}
              </span>
            ))}
          </div>
          <p className="text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {movie.synopsis}
          </p>
        </div>
      </div>

      <div className="p-6 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              {movie.releaseYear}
            </span>
            <span className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              {movie.duration}
            </span>
          </div>
          <button className="text-red-500 hover:text-red-400 font-medium transition-colors duration-300">
            Leer más
          </button>
        </div>
      </div>
    </Link>
  );
}
