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
