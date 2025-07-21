"use client";

import { useState } from "react";
import {
  LayoutGrid,
  List,
  Search,
  ChevronDown,
  ArrowUpAZ,
  X,
} from "lucide-react";

type FiltersProps = {
  selectedGenre: string[];
  setSelectedGenre: (genre: string[]) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  genres: string[];
  years: number[];
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
};

export function Filters({
  selectedGenre,
  setSelectedGenre,
  selectedYear,
  setSelectedYear,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  selectedSort,
  setSelectedSort,
  genres,
  years,
}: Readonly<FiltersProps>) {
  // Helper for genre selection logic
  function handleGenreClick(genre: string) {
    const isAll = genre === "Todos";
    const isSelected = selectedGenre.includes(genre);

    if (isAll) {
      // If "All" is clicked, set only "All"
      setSelectedGenre(["Todos"]);
    } else {
      if (selectedGenre.includes("Todos")) {
        // If "All" is selected and another genre is clicked, remove "All" and add the genre
        setSelectedGenre([genre]);
      } else if (isSelected) {
        // If genre is already selected, remove it
        const newGenres = selectedGenre.filter((g) => g !== genre);
        // If none left, default to "All"
        setSelectedGenre(newGenres.length === 0 ? ["Todos"] : newGenres);
      } else {
        // Add genre to selection
        setSelectedGenre([...selectedGenre, genre]);
      }
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h4 className="text-[--red-light] font-medium mb-2">
          Nuestras Recomendaciones
        </h4>
        <h2 className="text-4xl font-bold">Películas Populares</h2>
      </div>

      <div className="mb-8">
        {/* Top controls: Search, view toggle, Year, Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-full px-12 py-3 border border-gray-700 focus:outline-none focus:border-[--red-light] focus:ring-1 focus:ring-[--red-light] transition-all duration-200 pr-12"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
                aria-label="Clear search"
              >
                {/* Usa el icono X de lucide-react */}
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center bg-gray-800 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === "grid"
                    ? "bg-[--red-light] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === "list"
                    ? "bg-[--red-light] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Year Dropdown */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="  flex items-center    bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:border-[var(--red-light)] focus:ring-1 focus:ring-[var(--red-light)] transition-all duration-200 z-10"
                style={{ minWidth: "8rem" }}
              >
                <option value="Todos">Todos los años</option>
                {years.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
                <option value="<">Antes de 2020</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="flex items-center bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:border-[var(--red-light)] focus:ring-1 focus:ring-[var(--red-light)] transition-all duration-200"
              >
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="YearDesc">Año (Nuevo)</option>
                <option value="YearAsc">Año (Antiguo)</option>
                <option value="RatingDesc">Rating (Alta a Baja)</option>
                <option value="RatingAsc">Rating (Baja a Alta)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Genre pills */}
        <div className="flex items-center justify-center gap-[0.5rem]">
          {/* "All" pill always first */}
          <button
            key="All"
            onClick={() => handleGenreClick("Todos")}
            className={`px-8 py-3 rounded-full text-md font-medium transition-all duration-200 ${
              selectedGenre.length === 1 && selectedGenre[0] === "Todos"
                ? "bg-[--red-light] text-white"
                : "bg-gray-800 text-gray-400 hover:text-white hover:-translate-y-1  active:translate-y-[0.2rem] "
            }`}
          >
            Todos
          </button>
          {genres
            .filter((genre) => genre !== "Todos")
            .map((genre) => {
              const isSelected = selectedGenre.includes(genre);
              return (
                <button
                  key={genre}
                  onClick={() => handleGenreClick(genre)}
                  className={`px-8 py-3 rounded-full text-md font-medium transition-all duration-200   
                    
                    
                    ${
                      isSelected
                        ? "bg-[--red-light] text-white"
                        : "bg-gray-800 text-gray-400 hover:text-white hover:-translate-y-1  active:translate-y-[0.2rem] "
                    }`}
                >
                  {genre}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
