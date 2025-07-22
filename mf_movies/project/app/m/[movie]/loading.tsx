import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-gray-700 animate-pulse" />
        <div className="container mx-auto px-4 relative h-full flex items-center justify-center">
          <div className="text-center max-w-3xl mx-auto">
            <div className="h-12 bg-gray-700 rounded w-3/4 mx-auto animate-pulse mb-8" />
            <div className="inline-flex mb-6 bg-gray-700 rounded-full px-6 py-2 shadow-lg animate-pulse w-1/2 mx-auto" />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="hidden lg:block bg-gray-700 rounded-lg shadow-lg h-96 animate-pulse" />
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <div className="h-6 bg-gray-700 rounded w-1/4 animate-pulse" />
                <div className="h-6 bg-gray-700 rounded w-1/2 animate-pulse" />
                <div className="h-6 bg-gray-700 rounded w-1/3 animate-pulse" />
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-700 rounded w-1/4 animate-pulse" />
                <div className="h-6 bg-gray-700 rounded w-1/2 animate-pulse" />
                <div className="h-6 bg-gray-700 rounded w-1/3 animate-pulse" />
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-700 rounded w-1/4 animate-pulse" />
                <div className="h-6 bg-gray-700 rounded w-1/2 animate-pulse" />
                <div className="h-6 bg-gray-700 rounded w-1/3 animate-pulse" />
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-700 rounded w-1/4 animate-pulse" />
                <div className="h-6 bg-gray-700 rounded w-1/2 animate-pulse" />
                <div className="h-6 bg-gray-700 rounded w-1/3 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-8 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-lg shadow-lg h-96 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
