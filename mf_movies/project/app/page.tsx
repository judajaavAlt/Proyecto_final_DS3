"use client";

import { useEffect, useState } from "react"; // Hooks de React para gestionar el estado y efectos secundarios

// Datos mockeados para pruebas en la UI
import {
  featuredMovies,
  heroMovies,
  recentMovies,
  nextsMovies,
  genres,
  years,
} from "./lib/mockData";

// Componentes UI para la página de inicio
import { HeroCarousel } from "./ui/Landing/HeroCarrousel";
import { Filters } from "./ui/Landing/Filters";
import { MovieGridCard } from "./ui/Landing/MovieGridCard";
import { MovieListItem } from "./ui/Landing/MovieListItem";
import { Pagination } from "./ui/Landing/Pagination";
import FeatureMovies from "./ui/Landing/FeatureMovies";
import { FeaturedSection } from "./ui/Landing/FeaturedSection";
import SkeletonLanding from "./ui/Landing/SkeletonLanding"; // Versión de carga de la página

// Iconos
import { Flame, Calendar, PackageOpen } from "lucide-react";

// Tipos de datos
import { Movie } from "./types/movie";

// Funciones de acceso a datos
import { getAllMovies } from "./lib/moviePort";

export default function Home() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("A-Z");

  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const totalHeight = document.body.scrollHeight;
      if (scrollPosition >= totalHeight) {
        //to do
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setLoading(true);
    getAllMovies().then((movies) => {
      setAllMovies(movies);
      setLoading(false);
    });
  }, []);

  const moviesPerPage = 9;

  // Sort movies based on selected sort
  const sortedMovies = allMovies.slice().sort((a, b) => {
    if (selectedSort === "A-Z") {
      return a.title.localeCompare(b.title);
    }
    if (selectedSort === "Z-A") {
      return b.title.localeCompare(a.title);
    }
    if (selectedSort === "YearDesc") {
      return b.releaseYear - a.releaseYear;
    }
    if (selectedSort === "YearAsc") {
      return a.releaseYear - b.releaseYear;
    }
    if (selectedSort === "RatingDesc") {
      return b.rating - a.rating;
    }
    if (selectedSort === "RatingAsc") {
      return a.rating - b.rating;
    }
    return 0; // Fix: Always return a number
  });

  // Filter movies based on search and filters
  const filteredMovies = sortedMovies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.synopsis.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "All" || movie.genres.includes(selectedGenre);
    const matchesYear =
      selectedYear === "All" ||
      (selectedYear === "<" && movie.releaseYear < 2020) ||
      movie.releaseYear?.toString() === selectedYear;
    return matchesSearch && matchesGenre && matchesYear;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  function movePage() {
    const movieListElement = document.getElementById("movie-list");
    if (movieListElement) {
      movieListElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    setCurrentPage(1);
    movePage();
  }, [selectedGenre, selectedYear, searchQuery]);

  useEffect(() => {
    movePage();
  }, [currentPage]);

  if (loading) {
    return <SkeletonLanding />;
  }

  return (
    <div className="bg-[#0F172A]">
      <HeroCarousel moviesH={heroMovies} />

      <section className="container mx-auto">
        <FeatureMovies movies={featuredMovies.slice(0, 10)} />
      </section>

      <section id="movie-list" className="container mx-auto ">
        <Filters
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          genres={genres}
          years={years}
        />

        <section className="mt-12">
          {(() => {
            if (filteredMovies.length === 0) {
              return (
                <h2 className="text-2xl text-center ">
                  <PackageOpen className="mx-auto h-24 w-24 text-gray-400 " />
                  No se encontraron películas
                </h2>
              );
            }
            if (viewMode === "grid") {
              return (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedMovies.map((movie) => (
                    <MovieGridCard key={movie.id} movie={movie} />
                  ))}
                </section>
              );
            }
            return (
              <section className="space-y-6">
                {paginatedMovies.map((movie) => (
                  <MovieListItem key={movie.id} movie={movie} />
                ))}
              </section>
            );
          })()}
        </section>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </section>

      <section className="container mx-auto">
        <div className="text-center mb-12">
          <h4 className="text-red-500 font-medium mb-2">Lo Más Destacado</h4>
          <h2 className="text-4xl font-bold">Esta Semana en el Cine</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeaturedSection
            title="Estrenos Recientes"
            icon={Flame}
            movies={recentMovies}
            type="recent"
          />

          <FeaturedSection
            title="Próximos Estrenos"
            icon={Calendar}
            movies={nextsMovies}
            type="upcoming"
          />
        </div>
      </section>
    </div>
  );
}
