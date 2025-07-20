"use client";

import { useEffect, useState } from "react"; // Hooks de React para gestionar el estado y efectos secundarios

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
import {
  getAllMoviesFromAPI,
  getHeroMoviesFromAPI,
  getGenresFromAPI,
  getRecentMoviesFromAPI,
  getNextsMoviesFromAPI,
  getTopMoviesFromAPI,
} from "./lib/moviePort";

export default function Home() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedGenre, setSelectedGenre] = useState<string[]>(["Todos"]);
  const [selectedYear, setSelectedYear] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("A-Z");

  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const [heroMovies, setHeroMovies] = useState<Movie[]>([]);
  const [TopMovies, setTopMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [recentMovies, setRecentMovies] = useState<Movie[]>([]);
  const [nextsMovies, setNextsMovies] = useState<Movie[]>([]);

  const years = [2024, 2023, 2022, 2021, 2020];

  useEffect(() => {
    setLoading(true);
    getHeroMoviesFromAPI().then((movies) => {
      setHeroMovies(movies);
    });
    getTopMoviesFromAPI().then((movies) => {
      setTopMovies(movies);
    });
    getGenresFromAPI().then((genres) => {
      setGenres(genres);
    });
    getRecentMoviesFromAPI().then((movies) => {
      setRecentMovies(movies);
    });
    getNextsMoviesFromAPI().then((movies) => {
      setNextsMovies(movies);
    });
    getAllMoviesFromAPI().then((movies) => {
      setAllMovies(movies);
      setLoading(false);
    });
  }, []);

  const moviesPerPage = viewMode === "grid" ? 12 : 9;

  // Sort movies based on selected sort
  const sortedMovies = allMovies.slice().sort((a, b) => {
    if (selectedSort === "A-Z") {
      return a.title.localeCompare(b.title);
    }
    if (selectedSort === "Z-A") {
      return b.title.localeCompare(a.title);
    }
    if (selectedSort === "YearDesc") {
      return b.release_year - a.release_year;
    }
    if (selectedSort === "YearAsc") {
      return a.release_year - b.release_year;
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
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre.length === 1 && selectedGenre[0] === "Todos"
        ? true
        : selectedGenre.every((genre) => movie.genres.includes(genre));
    const matchesYear =
      selectedYear === "Todos" ||
      (selectedYear === "<" && movie.release_year < 2020) ||
      movie.release_year?.toString() === selectedYear;
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
  }, [selectedGenre, selectedYear, searchQuery, selectedSort]);

  useEffect(() => {
    movePage();
  }, [currentPage]);

  if (loading) {
    return <SkeletonLanding />;
  }

  return (
    <div className="bg-[#0F172A]">
      <HeroCarousel moviesH={heroMovies} />

      <section className="container mx-auto ">
        <FeatureMovies movies={TopMovies.slice(0, 10)} />
      </section>

      <section id="movie-list" className="container mx-auto my-12">
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

        {/* Contador de películas */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Información principal */}
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[var(--red-light)] rounded-full animate-pulse"></div>
                <h3 className="text-2xl font-bold text-white">
                  {filteredMovies.length === 1
                    ? "Película encontrada"
                    : `${filteredMovies.length} Películas encontradas`}
                </h3>
              </div>

              <p className="text-gray-300 text-sm max-w-lg leading-relaxed">
                {(() => {
                  const hasSearch = searchQuery.trim() !== "";
                  const hasGenreFilter =
                    selectedGenre.length > 0 &&
                    !(
                      selectedGenre.length === 1 && selectedGenre[0] === "Todos"
                    );
                  const hasYearFilter = selectedYear !== "Todos";

                  if (hasSearch && hasGenreFilter && hasYearFilter) {
                    return `Resultados para "${searchQuery}" en ${selectedGenre.join(
                      ", "
                    )} del ${selectedYear}`;
                  } else if (hasSearch && hasGenreFilter) {
                    return `Resultados para "${searchQuery}" en ${selectedGenre.join(
                      ", "
                    )}`;
                  } else if (hasSearch && hasYearFilter) {
                    return `Resultados para "${searchQuery}" del año ${selectedYear}`;
                  } else if (hasGenreFilter && hasYearFilter) {
                    return `Películas de ${selectedGenre.join(
                      ", "
                    )} del año ${selectedYear}`;
                  } else if (hasSearch) {
                    return `Resultados para "${searchQuery}"`;
                  } else if (hasGenreFilter) {
                    return `Películas de ${selectedGenre.join(", ")}`;
                  } else if (hasYearFilter) {
                    return `Películas del año ${selectedYear}`;
                  } else {
                    return "Todas las películas disponibles en nuestra colección";
                  }
                })()}
              </p>
            </div>

            {/* Información de paginación */}
            <div className="flex items-center gap-3 px-4 py-2 ">
              <span className="text-white font-semibold text-sm">
                Mostrando {paginatedMovies.length} de {filteredMovies.length}{" "}
                películas
              </span>
            </div>
          </div>
        </div>

        <section className="">
          {(() => {
            if (filteredMovies.length === 0) {
              // Función para generar mensaje específico según los filtros
              const getNoResultsMessage = () => {
                const hasSearch = searchQuery.trim() !== "";
                const hasGenreFilter =
                  selectedGenre.length > 0 &&
                  !(selectedGenre.length === 1 && selectedGenre[0] === "Todos");
                const hasYearFilter = selectedYear !== "Todos";

                if (hasSearch && hasGenreFilter && hasYearFilter) {
                  return `No se encontraron películas con "${searchQuery}" en el género ${selectedGenre.join(
                    ", "
                  )} del año ${selectedYear}`;
                } else if (hasSearch && hasGenreFilter) {
                  return `No se encontraron películas con "${searchQuery}" en el género ${selectedGenre.join(
                    ", "
                  )}`;
                } else if (hasSearch && hasYearFilter) {
                  return `No se encontraron películas con "${searchQuery}" del año ${selectedYear}`;
                } else if (hasGenreFilter && hasYearFilter) {
                  return `No se encontraron películas del género ${selectedGenre.join(
                    ", "
                  )} del año ${selectedYear}`;
                } else if (hasSearch) {
                  return `No se encontraron películas con "${searchQuery}"`;
                } else if (hasGenreFilter) {
                  return `No se encontraron películas del género ${selectedGenre.join(
                    ", "
                  )}`;
                } else if (hasYearFilter) {
                  if (selectedYear === "<") {
                    return "No se encontraron películas anteriores al año 2020";
                  }
                  return `No se encontraron películas del año ${selectedYear}`;
                } else {
                  return "No se encontraron películas";
                }
              };

              return (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  {/* Icono animado */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--red-light)]/20 to-orange-500/20 rounded-full blur-xl animate-pulse"></div>
                    <PackageOpen className="relative h-20 w-20 text-gray-400 animate-bounce" />
                  </div>

                  {/* Mensaje principal */}
                  <h3 className="text-2xl font-bold text-white mb-3 text-center">
                    {getNoResultsMessage()}
                  </h3>

                  {/* Mensaje secundario */}
                  <p className="text-gray-400 text-center mb-8 max-w-md">
                    Intenta ajustar tus filtros o buscar con términos diferentes
                  </p>

                  {/* Botones de acción */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedGenre(["Todos"]);
                        setSelectedYear("Todos");
                        setSelectedSort("A-Z");
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-[var(--red-light)] to-[var(--red-light)]/80 hover:from-[var(--red-light)]/90 hover:to-[var(--red-light)]/70 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Limpiar Filtros
                    </button>

                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedGenre(["Todos"]);
                        setSelectedYear("Todos");
                        setSelectedSort("RatingDesc");
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Ver Mejores Películas
                    </button>
                  </div>

                  {/* Sugerencias */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 max-w-lg w-full border border-gray-700/50">
                    <h4 className="text-lg font-semibold text-white mb-4 text-center">
                      💡 Sugerencias
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[var(--red-light)] rounded-full"></span>
                        Verifica la ortografía de tu búsqueda
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        Prueba términos más generales
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        Combina diferentes géneros
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Explora otros años de lanzamiento
                      </li>
                    </ul>
                  </div>
                </div>
              );
            }
            if (viewMode === "grid") {
              return (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
          <h4 className="text-[var(--red-light)] font-medium mb-2">
            Lo Más Destacado
          </h4>
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
