"use client";

import React, { useState } from "react";
import {
  Star,
  Send,
  Heart,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useParams } from "next/navigation";

const ReviewPage = () => {
  const params = useParams();
  const movieName = params.movie
    ? decodeURIComponent(params.movie as string)
    : "";
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState<"yes" | "no" | null>(
    null
  );

  const genres = [
    "Acción",
    "Aventura",
    "Comedia",
    "Drama",
    "Terror",
    "Ciencia Ficción",
    "Romance",
    "Thriller",
    "Documental",
    "Animación",
  ];

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío (solo es de relleno)
    console.log("Review enviada:", {
      rating,
      review,
      selectedGenres,
      recommendation,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--red-light)]/20 to-[var(--gold)]/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Escribe tu Reseña de{" "}
              <span className="text-[var(--gold)]">{movieName}</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Comparte tu experiencia y ayuda a otros a descubrir grandes
              películas
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Movie Info Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-48 bg-gradient-to-br from-[var(--red-light)]/20 to-[var(--gold)]/20 rounded-lg border border-white/10 flex items-center justify-center">
                  <span className="text-white/60 text-sm">Poster</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Nombre de la Película
                </h2>
                <p className="text-gray-300 mb-4">
                  2024 • 2h 15min • Acción, Aventura
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Star
                      className="w-5 h-5 text-[var(--gold)]"
                      fill="currentColor"
                    />
                    <span className="text-white font-semibold">4.2/5</span>
                  </div>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                    PG-13
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Review Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Rating Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Star className="w-6 h-6 text-[var(--gold)]" />
                Califica la película
              </h3>
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoverRating || rating)
                          ? "text-[var(--gold)] fill-current"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-gray-300 text-sm">
                {rating > 0
                  ? `Has calificado con ${rating} estrella${
                      rating > 1 ? "s" : ""
                    }`
                  : "Selecciona una calificación"}
              </p>
            </div>

            {/* Review Text */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-blue-400" />
                Tu reseña
              </h3>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Comparte tus pensamientos sobre la película... ¿Qué te gustó? ¿Qué no te gustó? ¿Recomendarías verla?"
                className="w-full h-32 bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/50 focus:border-transparent"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-400 text-sm">
                  {review.length}/500 caracteres
                </span>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[var(--red-light)]" />
                  <span className="text-gray-400 text-sm">Reseña honesta</span>
                </div>
              </div>
            </div>

            {/* Genres */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">
                Géneros que mejor describen la película
              </h3>
              <div className="flex flex-wrap gap-3">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => handleGenreToggle(genre)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedGenres.includes(genre)
                        ? "bg-[var(--gold)] text-black"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">
                ¿Recomendarías esta película?
              </h3>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setRecommendation("yes")}
                  className={`flex items-center gap-3 px-6 py-4 rounded-lg transition-all duration-200 ${
                    recommendation === "yes"
                      ? "bg-green-600/20 border-2 border-green-500 text-green-400"
                      : "bg-white/10 border-2 border-transparent text-gray-300 hover:bg-white/20"
                  }`}
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span className="font-medium">Sí, la recomiendo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRecommendation("no")}
                  className={`flex items-center gap-3 px-6 py-4 rounded-lg transition-all duration-200 ${
                    recommendation === "no"
                      ? "bg-red-600/20 border-2 border-red-500 text-red-400"
                      : "bg-white/10 border-2 border-transparent text-gray-300 hover:bg-white/20"
                  }`}
                >
                  <ThumbsDown className="w-5 h-5" />
                  <span className="font-medium">No la recomiendo</span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={!rating || !review.trim()}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--red-light)] to-[var(--gold)] text-white font-bold rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
                Publicar Reseña
              </button>
            </div>
          </form>

          {/* Tips Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">
              💡 Consejos para una buena reseña
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[var(--gold)] rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  Menciona aspectos específicos que te gustaron o no te gustaron
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[var(--gold)] rounded-full mt-2 flex-shrink-0"></div>
                <p>Compara con películas similares si es relevante</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[var(--gold)] rounded-full mt-2 flex-shrink-0"></div>
                <p>Evalúa la actuación, dirección y efectos especiales</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[var(--gold)] rounded-full mt-2 flex-shrink-0"></div>
                <p>Mantén un tono respetuoso y constructivo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
