import { Star, Calendar, Clock, Play, Eye } from "lucide-react";
import Link from "next/link";
import { Movie } from "../../types/movie";

const RatingStars = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const fullStars = Math.round(rating);

  return (
    <div className="flex items-center gap-1">
      {/* Usamos Array.from para crear un array de 5 elementos y mapearlo */}
      {Array.from({ length: totalStars }, (_, index) => {
        const isFilled = index < fullStars;
        return (
          <Star
            key={index}
            className={`w-5 h-5 ${
              isFilled ? "text-yellow-400" : "text-gray-300"
            }`}
            fill={isFilled ? "currentColor" : "none"}
            stroke={isFilled ? "none" : "currentColor"} // Opcional para un borde en la estrella vacía
          />
        );
      })}
    </div>
  );
};

export function MovieGridCard({ movie }: { readonly movie: Movie }) {
  return (
    <Link
      key={movie.id}
      href={`/m/${movie.title}`}
      className="overflow-hidden w-full max-w-sm"
    >
      {/* 1. Contenedor de la imagen */}
      <div>
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-96 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />
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
