import React from "react";
import { Star, Clock, Calendar, Play } from "lucide-react";
import { Movie } from "../../types/movie";

interface MovieDetailProps {
  movie: Movie;
}

const RatingStars = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasPartial = rating - fullStars > 0;
  const partialFill = hasPartial ? rating - fullStars : 0;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: totalStars }, (_, index) => {
        if (index < fullStars) {
          return (
            <Star
              key={index}
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              stroke="none"
            />
          );
        } else if (index === fullStars && hasPartial) {
          return (
            <span
              key={index}
              className="relative w-4 h-4 inline-block"
              style={{ minWidth: 16, minHeight: 16 }}
            >
              <Star
                className="w-4 h-4 text-gray-300 absolute left-0 top-0"
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
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  stroke="none"
                />
              </span>
            </span>
          );
        } else {
          return (
            <Star
              key={index}
              className="w-4 h-4 text-gray-300"
              fill="none"
              stroke="currentColor"
            />
          );
        }
      })}
    </div>
  );
};

const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${movie.hero_poster})`,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-6 pb-12">
            <div className="flex flex-col lg:flex-row items-end gap-8">
              {/* Poster */}
              <div className="flex-shrink-0">
                <img
                  src={movie.poster_url}
                  alt={`${movie.title} Poster`}
                  className="w-48 h-72 object-cover rounded-lg shadow-2xl border-2 border-white/10"
                />
              </div>

              {/* Movie Info */}
              <div className="flex-1 text-white">
                <div className="mb-4">
                  <h1 className="text-4xl lg:text-6xl font-bold mb-3 leading-tight">
                    {movie.title}
                  </h1>
                  <div className="flex items-center gap-6 text-gray-300 text-sm">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {movie.release_year}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {movie.duration} min
                    </span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs">
                      {movie.classification}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <RatingStars rating={movie.rating} />
                  <span className="text-yellow-400 font-semibold">
                    {movie.rating}/5
                  </span>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {movie.trailer_url && (
                    <a
                      href={movie.trailer_url}
                      target="_blank"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--red-light)] hover:bg-[var(--red-light)]/80 text-white rounded-lg transition-colors duration-200 font-medium"
                    >
                      <Play className="w-4 h-4" />
                      Ver Trailer
                    </a>
                  )}

                  <a
                    href={`/review/${movie.id}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--gold)] hover:bg-[var(--gold)]/80 text-black rounded-lg transition-colors duration-200 font-medium"
                  >
                    <Play className="w-4 h-4" />
                    Haz tu reseña
                  </a>
                </div>
                {/* Trailer Button */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Synopsis Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
              Synopsis
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              {movie.synopsis}
            </p>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="container mx-auto px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-3 text-white">
                Release Date
              </h3>
              <p className="text-gray-300">{movie.release_date}</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-3 text-white">
                Duration
              </h3>
              <p className="text-gray-300">{movie.duration} minutes</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-3 text-white">Rating</h3>
              <div className="flex items-center gap-2">
                <RatingStars rating={movie.rating} />
                <span className="text-yellow-400 font-semibold">
                  {movie.rating}/5
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
