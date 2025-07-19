"use client";

import { useState } from "react";
import { LayoutGrid, List, Search, ChevronDown, ArrowUpAZ } from "lucide-react";

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
}: Readonly<FiltersProps>) {
  const sorts = ["A-Z", "Z-A", "Rating", "Year"];
  const [selectedSort, setSelectedSort] = useState(sorts[0]);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h4 className="text-red-500 font-medium mb-2">
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
              className="w-full bg-gray-800 text-white rounded-full px-12 py-3 border border-gray-700 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center bg-gray-800 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === "grid"
                    ? "bg-red-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === "list"
                    ? "bg-red-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Year Dropdown */}
            <div className="relative">
              <button className="flex items-center bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200">
                <span className="mr-2 text-sm">Year</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {/* TODO: Replace with actual select or dropdown menu */}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button className="flex items-center bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200">
                <span className="mr-2 text-sm">{selectedSort}</span>
                <ArrowUpAZ className="w-4 h-4 text-gray-400" />
              </button>
              {/* TODO: Replace with actual select or dropdown menu */}
            </div>
          </div>
        </div>

        {/* Genre pills */}
        <div className="flex flex-wrap gap-3">
          {genres.map((genre) => {
            const isSelected = selectedGenre === genre;
            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(isSelected ? null : genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  isSelected
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white"
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
