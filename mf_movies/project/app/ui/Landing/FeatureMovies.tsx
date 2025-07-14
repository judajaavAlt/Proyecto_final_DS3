import { Movie } from "../../types/movie.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Importa los estilos de Swiper
import "./swipperStyle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function FeatureMovies({ movies }: { movies: Movie[] }) {
  return (
    <section className="container mx-auto px-4 py-12">
      <h3 className="text-4xl font-bold text-white mb-8 ml-4">
        Featured Movies
      </h3>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        className="!pb-12 relative"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <div className="group relative h-[400px] overflow-hidden rounded-xl shadow-xl transition-transform duration-300 hover:z-10 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />

              <img
                className="h-full w-full object-cover"
                src={movie.posterUrl}
                alt={movie.title}
              />

              <div className="absolute bottom-0 left-0 z-20 p-4">
                <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 mb-2">
                  #{index + 1}
                </p>
                <h4 className="text-xl font-bold text-white">{movie.title}</h4>
                <p className="text-sm text-gray-300 mt-1">{movie.genres}</p>
              </div>

              <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
