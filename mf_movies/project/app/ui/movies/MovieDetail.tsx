import React from "react";
import Rating from "../Rating";
import { Movie } from "../../types/movie";

interface MovieDetailProps {
  movie: Movie;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Simplified Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${movie.heroposter})`,
          }}
        >
          {/* Gradient overlay with animated particles effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-gray-900/30" />

          {/* Animated light particles */}
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(white,_transparent_1px)] bg-[length:20px_20px]"></div>
        </div>

        <div className="container mx-auto px-4 relative h-full flex items-center justify-center">
          <div className="text-center max-w-3xl mx-auto">
            {/* Movie Title with animated reveal */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">
              {movie.title}
            </h1>

            {/* Rating Badge */}
            <div className="inline-flex mb-6 bg-blue-600/90 backdrop-blur-sm text-white rounded-full px-6 py-2 shadow-lg shadow-blue-900/30">
              <div className="flex items-center gap-3">
                <Rating rating={movie.rating} />
                <span className="font-bold text-lg">{movie.rating} / 5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto  py-12">
        {/* Movie Details */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Movie Poster */}
            <div className="hidden lg:block">
              <img
                src={movie.posterUrl}
                alt={`${movie.title} Poster`}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {/* Middle Column - Movie Details */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-blue-400">
                  Movie Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-gray-400 text-sm">Title</h3>
                      <p className="text-lg font-medium">{movie.title}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-400 text-sm">Genre</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {movie.genres.map((genre) => (
                          <span key={genre} className="text-blue-400">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-gray-400 text-sm">Release Date</h3>
                      <p>{movie.releaseDate}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-gray-400 text-sm">Rating</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Rating rating={movie.rating} />
                        <span className="text-yellow-400">
                          {movie.rating} / 5
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-gray-400 text-sm">Duration</h3>
                      <p>{movie.duration} minutes</p>
                    </div>
                    <div>
                      <h3 className="text-gray-400 text-sm">Classification</h3>
                      <p>{movie.classification}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-blue-400">
                  Synopsis
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {movie.synopsis}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
