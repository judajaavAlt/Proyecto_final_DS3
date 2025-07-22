"use client";
import { useState, useEffect, useCallback, useRef } from "react";
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
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const transitioningRef = useRef(false);
  const nextSlideRef = useRef<(() => void) | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const slideDuration = 5000; // 5 segundos

  const nextSlide = useCallback(() => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;

    setCurrentSlide((prev) => (prev + 1) % moviesH.length);
    setProgress(0);

    setTimeout(() => {
      transitioningRef.current = false;
    }, 700);
  }, [moviesH.length]);

  nextSlideRef.current = nextSlide;

  const prevSlide = () => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    setCurrentSlide((prev) => (prev - 1 + moviesH.length) % moviesH.length);
    setProgress(0);
    setTimeout(() => {
      transitioningRef.current = false;
    }, 700);
  };

  const goToSlide = (index: number) => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    setCurrentSlide(index);
    setProgress(0);
    setTimeout(() => {
      transitioningRef.current = false;
    }, 700);
  };

  useEffect(() => {
    if (isPaused || moviesH.length <= 1) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const newProgress = Math.min((elapsed / slideDuration) * 100, 100);

      setProgress(newProgress);

      if (newProgress >= 100) {
        nextSlideRef.current?.();
      } else {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, moviesH.length, currentSlide]);

  const handleUserInteraction = () => {
    setIsPaused(true);
    setProgress(0);
    setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  return (
    <section className="relative h-[85vh] text-[--text-base]">
      {/* Contenedor del Slider (Sin cambios) */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * (100 / moviesH.length)}%)`,
            width: `${moviesH.length * 100}%`,
            display: "flex",
          }}
        >
          {moviesH.map((movie) => (
            <div
              key={movie.id}
              className="relative w-full h-full flex-shrink-0"
              style={{
                width: `${100 / moviesH.length}%`,
                backgroundImage: `url("${movie.hero_poster}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50" />
              <div className="absolute bottom-[10%] left-16 max-w-2xl gap-4 flex flex-col">
                <div className="flex items-center gap-4 text-lg">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-6 h-6" /> {movie.release_year}
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
                  <AccorntG url={`/m/${movie.title}`} text="Ver Mas Detalles">
                    <TvMinimalPlay className="inline" />
                  </AccorntG>
                  <AccorntG url={movie.trailer_url} text="Ver Tráiler">
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

      {/* Botones de Navegación (Sin cambios) */}
      <button
        onClick={() => {
          prevSlide();
          handleUserInteraction();
        }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/0 p-3 rounded-full hover:bg-black/75 transition-all duration-500"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-10 h-10 hover:text-[--red-light] transition-all duration-300" />
      </button>

      <button
        onClick={() => {
          nextSlide();
          handleUserInteraction();
        }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/0 p-3 rounded-full hover:bg-black/75 transition-all duration-500"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-10 h-10 hover:text-[--red-light] transition-all duration-300" />
      </button>

      {/* Indicadores de Paginación */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {moviesH.map((_, index) => (
          <button
            key={index}
            className={`h-3 rounded-full transition-all duration-500 ease-in-out relative overflow-hidden ${
              currentSlide === index
                ? "bg-gray-500 w-8"
                : "bg-gray-500 hover:bg-gray-400 w-3"
            }`}
            onClick={() => {
              goToSlide(index);
              handleUserInteraction();
            }}
            aria-label={`Ir al slide ${index + 1}`}
          >
            {/* Indicador de progreso rojo (cuando está activo) */}
            {currentSlide === index && !isPaused && (
              <div
                className="absolute top-0 left-0 h-full bg-[--red-light]"
                style={{ width: `${progress}%` }}
              />
            )}

            {/* **NUEVO**: Indicador de pausa en verde */}
            {currentSlide === index && isPaused && (
              <div className="absolute top-0 left-0 h-full bg-[--red-light] w-full" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
