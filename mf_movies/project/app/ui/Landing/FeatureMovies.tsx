import { Movie } from "../../types/movie.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Star } from "lucide-react";

import "./FeatureMovies.css";

// Importa los estilos de Swiper
import "./swipperStyle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function FeatureMovies({
  movies,
}: {
  readonly movies: readonly Movie[];
}) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;700;900&display=swap"
        rel="stylesheet"
      />

      <h3 className="text-4xl font-bold text-white mb-8 ml-4">
        Featured Movies
      </h3>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 50000 }}
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
            <div className="card group relative h-[400px] rounded-xl shadow-xl transition-transform duration-300 hover:z-10 hover:scale-105 ">
              {/* Poster */}
              <img
                className="h-full w-full object-cover rounded-xl"
                src={movie.posterUrl}
                alt={movie.title}
              />

              {/* Overlay with movie title */}
              <div className="absolute bottom-0 -left-3 z-20 p-4">
                <span
                  className="text-[12rem] font-black text-transparent 
                  bg-[--gold] bg-clip-text
                  leading-none m-0 p-0 -translate-x-8 transition-all duration-300 group-hover:text-[14rem]"
                  style={{
                    fontFamily: "'Kantumruy Pro', sans-serif",
                    display: "inline-block",
                    WebkitTextStroke: "4px white", // <- bordes blancos
                  }}
                >
                  {index + 1}
                </span>
              </div>

              {/* Effect Superposicion */}
              <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Borders */}
              <span className="borderG top"></span>
              <span className="borderG right"></span>
              <span className="borderG bottom"></span>
              <span className="borderG left"></span>
              <div className="contentG">Ver Sitio</div>

              {/* Rating */}
              <div className="absolute opacity-0 top-3 right-2 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center justify-center h-full">
                  <Star className="w-6 h-6 text-yellow-400 inline-block mr-2" />
                  <span className="leading-none m-0 p-0 text-2xl font-bold text-white">
                    {movie.rating.toFixed(1)} / 5
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
