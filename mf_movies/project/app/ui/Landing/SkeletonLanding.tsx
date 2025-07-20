import React from "react";

export default function SkeletonLanding() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="animate-pulse">
        <div className="h-64 bg-gray-700 mb-8"></div>
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <div className="h-10 bg-gray-700 w-1/4"></div>
            <div className="h-10 bg-gray-700 w-1/4"></div>
          </div>

          <div className="animate-pulse">
            {/* Título skeleton */}
            <div className="mb-8 ml-4">
              <div className="h-10 bg-gray-700 w-80 rounded-lg"></div>
            </div>

            {/* Contenedor del carrusel */}
            <div className="px-8 py-12 mx-4">
              <div className="relative">
                {/* Slides skeleton */}
                <div className="flex gap-8 overflow-hidden">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex-shrink-0 w-64">
                      {/* Card skeleton */}
                      <div className="relative h-96 bg-gray-700 rounded-xl overflow-hidden">
                        {/* Poster skeleton */}
                        <div className="w-full h-full bg-gray-600"></div>

                        {/* Número de película skeleton */}
                        <div className="absolute bottom-0 -left-3">
                          <div className="h-32 w-32 bg-gray-600 rounded-lg opacity-80"></div>
                        </div>

                        {/* Rating skeleton */}
                        <div className="absolute top-3 right-2 opacity-0">
                          <div className="flex items-center justify-center h-full">
                            <div className="w-6 h-6 bg-gray-600 rounded-full mr-2"></div>
                            <div className="h-6 bg-gray-600 w-16 rounded"></div>
                          </div>
                        </div>

                        {/* Botón de play skeleton */}
                        <div className="contentG">
                          <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Controles de navegación skeleton */}
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                  <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                </div>
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                </div>

                {/* Paginación skeleton */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className="w-3 h-3 bg-gray-600 rounded-full"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="h-64 bg-gray-700"></div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <div className="h-10 bg-gray-700 w-1/4"></div>
          </div>
        </div>
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="h-6 bg-gray-700 w-1/4 mx-auto mb-2"></div>
              <div className="h-10 bg-gray-700 w-1/2 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-64 bg-gray-700"></div>
              <div className="h-64 bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
