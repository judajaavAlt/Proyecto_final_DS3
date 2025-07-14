import { Play } from "lucide-react";
import Link from "next/link";

import { Movie } from "../types/movie";

export default function page({ movies }: { movies: Movie[] }) {
  return (
    <section className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Similar Movies</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <Link
            href={`/m/${movie.title}`}
            key={movie.id}
            className="group cursor-pointer transform hover:scale-105 transition-transform"
          >
            <div className="relative aspect-[2/3] mb-2 rounded-lg overflow-hidden">
              <img
                src={movie.posterUrl}
                alt={`${movie.title} poster`}
                //fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="font-semibold truncate hover:text-blue-600">
              {movie.title}
            </h3>
            <p className="text-sm text-gray-400">{movie.releaseYear}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
