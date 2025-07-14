"use client";

import { LayoutGrid, List, Search } from "lucide-react";

type FiltersProps = {
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  genres: string[];
  years: number[];
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
  genres,
  years,
}: FiltersProps) {
  return (
    <div className="mb-12">
      <div className="lg:flex lg:space-y-4 justify-between items-end mb-8">
        <div>
          <h4 className="text-red-500 font-medium mb-2">
            Nuestras Recomendaciones
          </h4>
          <h2 className="text-4xl font-bold">Películas Populares</h2>
        </div>

        <div className="flex items-center gap-4">
          {/* View Toggle */}
          <div className="flex items-center bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === "grid"
                  ? "bg-red-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === "list"
                  ? "bg-red-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Genre Filter */}
          <select
            className="bg-gray-800 text-white px-6 py-3 rounded-lg border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          {/* Year Filter */}
          <select
            className="bg-gray-800 text-white px-6 py-3 rounded-lg border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="All">Todos los años</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}

            <option value="<">{"<"} 2020 </option>
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Buscar películas por título o descripción..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 text-white px-6 py-4 pl-14 rounded-lg border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
      </div>
    </div>
  );
}
