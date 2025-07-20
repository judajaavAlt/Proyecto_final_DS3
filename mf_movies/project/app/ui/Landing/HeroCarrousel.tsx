"use client";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Film,
  Star,
  TvMinimalPlay,
  Popcorn,
} from "lucide-react";

import { Movie } from "../../types/movie";

import AccorntG from "../AccorntG";

export function HeroCarousel({
  moviesH,
}: {
  readonly moviesH: readonly Movie[];
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % moviesH.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + moviesH.length) % moviesH.length);
  };

  return (
    <section className="relative h-[85vh] text-[--text-base]">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${(currentSlide * 100) / moviesH.length}%)`,
            width: `${moviesH.length * 100}%`,
            display: "flex",
          }}
        >
          {moviesH.map((movie) => (
            <div
              key={movie.id}
              className="relative w-full h-full"
              style={{
                backgroundImage: `url("${movie.heroposter}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50" />

              {/* Hero Description content */}
              <div className="absolute bottom-[10%] left-16 max-w-2xl gap-4 flex flex-col">
                <div className="flex items-center gap-4 text-lg">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-6 h-6" /> {movie.releaseYear}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-6 h-6" /> {movie.duration} Min
                  </span>
                  <span className="flex items-center gap-2">
                    <Film className="w-6 h-6" /> {movie.classification}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Star className="w-8 h-8 text-[--gold]" />
                    <span className="text-2xl font-bold ml-2">
                      {movie.rating}
                    </span>
                    <span className="text-gray-400 ml-1">/5.0</span>
                  </div>

                  <div className="h-6 w-px bg-gray-800" />

                  <span className="font-semibold">
                    Géneros:{" "}
                    {movie.genres.map(
                      (g, i) => g + (i < movie.genres.length - 1 ? ", " : "")
                    )}
                  </span>
                </div>

                <h1 className="text-7xl font-bold text-shadow">
                  {movie.title}
                </h1>

                <div className="flex items-center gap-4">
                  <AccorntG url={`/m/${movie.title}`} text="Ver Reseñas">
                    <TvMinimalPlay className="inline" />
                  </AccorntG>

                  <AccorntG url={movie.trailerUrl} text="Ver Tráiler">
                    <Popcorn className="inline" />
                  </AccorntG>
                </div>

                <p className="text-xl text-gray-300 leading-relaxed">
                  {movie.synopsis.length > 200
                    ? movie.synopsis.slice(0, 200) + "..."
                    : movie.synopsis}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/0 p-3 rounded-full hover:bg-black/75 transition-all duration-500"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-10 h-10 hover:text-[--red-light] transition-all duration-300" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/0 p-3 rounded-full hover:bg-black/75 transition-all duration-500"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-10 h-10 hover:text-[--red-light] transition-all duration-300" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {moviesH.map((movie, index) => (
          <button
            key={movie.id}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-red-600 w-6"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
