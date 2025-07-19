"use client";

import { useState } from "react";
import { LayoutGrid, List, Search, ChevronDown, ArrowUpAZ } from "lucide-react";

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
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="  flex items-center    bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200 z-10"
                style={{ minWidth: "8rem" }}
              >
                <option value="All">All Years</option>
                <option value="<">Before 2020</option>
                {years.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="flex items-center bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
              >
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="YearDesc">Year (Newest)</option>
                <option value="YearAsc">Year (Oldest)</option>
                <option value="RatingDesc">Rating (High to Low)</option>
                <option value="RatingAsc">Rating (Low to High)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Genre pills */}
        <div className="flex items-center justify-center gap-3  ">
          {genres.map((genre) => {
            const isSelected = selectedGenre.includes(genre);
            return (
              <button
                key={genre}
                onClick={() =>
                  setSelectedGenre(
                    isSelected
                      ? selectedGenre.filter((g) => g !== genre)
                      : [...selectedGenre, genre]
                  )
                }
                className={`px-8 py-3 rounded-full text-md font-medium transition-colors duration-200   ${
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
