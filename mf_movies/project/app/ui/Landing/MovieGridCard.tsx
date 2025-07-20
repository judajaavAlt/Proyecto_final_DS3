import { Star, Calendar, Clock, Play, Eye, TvMinimalPlay } from "lucide-react";
import Link from "next/link";
import { Movie } from "../../types/movie";
import "./MovieGridCard.css";

const RatingStars = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasPartial = rating - fullStars > 0;
  const partialFill = hasPartial ? rating - fullStars : 0;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: totalStars }, (_, index) => {
        if (index < fullStars) {
          // Estrella llena
          return (
            <Star
              key={index}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              stroke="none"
            />
          );
        } else if (index === fullStars && hasPartial) {
          // Estrella parcialmente llena
          return (
            <span
              key={index}
              className="relative w-5 h-5 inline-block"
              style={{ minWidth: 20, minHeight: 20 }}
            >
              <Star
                className="w-5 h-5 text-gray-300 absolute left-0 top-0"
                fill="none"
                stroke="currentColor"
              />
              <span
                className="absolute left-0 top-0 overflow-hidden"
                style={{
                  width: `${partialFill * 100}%`,
                  height: "100%",
                  display: "inline-block",
                }}
              >
                <Star
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  stroke="none"
                />
              </span>
            </span>
          );
        } else {
          // Estrella vacía
          return (
            <Star
              key={index}
              className="w-5 h-5 text-gray-300"
              fill="none"
              stroke="currentColor"
            />
          );
        }
      })}
    </div>
  );
};

export function MovieGridCard({ movie }: { readonly movie: Movie }) {
  return (
    <Link
      key={movie.id}
      href={`/m/${movie.title}`}
      target="_blank"
      className="w-full max-w-sm relative block"
    >
      {/* 1. Contenedor de la imagen */}
      <div className="relative">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-[35rem] object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />

        {/* Bordes animados */}
        <span className="borderGF top"></span>
        <span className="borderGF top2"></span>

        <span className="borderGF right"></span>
        <span className="borderGF right2"></span>

        <span className="borderGF bottom"></span>
        <span className="borderGF bottom2"></span>

        <span className="borderGF left"></span>
        <span className="borderGF left2"></span>

        <div className="contentGF">
          <TvMinimalPlay />
        </div>
      </div>

      {/* 2. Contenedor informacion */}
      <div className="p-5 flex flex-col items-center gap-3 text-center">
        {/* Título de la película */}
        <h3 className="text-white text-4xl font-bold leading-tight">
          {movie.title}
        </h3>

        {/* Rating con estrellas */}
        <div className="flex items-center gap-1">
          <RatingStars rating={movie.rating} />
          <span>({movie.rating} / 5)</span>
        </div>

        {/* Metadatos de la película (Año, Duración, Vistas) */}
        <div className="flex items-center gap-4 text-[#FDF5E0] text-sm">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {movie.releaseYear}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {movie.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            {movie.classification}
          </span>
        </div>
      </div>
    </Link>
  );
}
