"use client";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Film,
  Star,
} from "lucide-react";

import { Movie } from "../../types/movie";

export function HeroCarousel({ moviesH }: { moviesH: Movie[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % moviesH.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + moviesH.length) % moviesH.length);
  };

  return (
    <section className="relative h-[85vh]">
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
              <div className="  absolute bottom-1/4 left-16 max-w-2xl">
                <h1 className="text-7xl font-bold mb-4 text-shadow">
                  {movie.title}
                </h1>
                <div className="flex items-center gap-6 text-lg mb-4">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" /> {movie.releaseYear}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5" /> {movie.duration}
                  </span>
                  <span className="flex items-center gap-2">
                    <Film className="w-5 h-5" /> {movie.classification}
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <Star className="w-6 h-6 text-yellow-400" />
                    <span className="text-2xl font-bold ml-2">
                      {movie.rating}
                    </span>
                    <span className="text-gray-400 ml-1">/5.0</span>
                  </div>
                  <div className="h-6 w-px bg-gray-600" />
                  <span className="text-gray-200 font-bold">
                    Generes: {movie.genres.map((g) => g + ", ")}
                  </span>
                </div>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  {movie.synopsis}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/75 transition-all duration-300"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/75 transition-all duration-300"
      >
        <ChevronRight size={28} />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {moviesH.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-red-600 w-6"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
