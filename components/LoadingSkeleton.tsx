'use client';

export function FlightSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 animate-shimmer">
      <div className="flex justify-between mb-4">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
        <div className="h-8 bg-gray-200 rounded w-24"></div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-12 bg-gray-200 rounded w-20"></div>
          <div className="flex-1 mx-4 h-2 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
}

export function HotelSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-shimmer">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="flex space-x-2">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}

export function CarSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 animate-shimmer">
      <div className="flex justify-between mb-4">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
        <div className="h-8 bg-gray-200 rounded w-24"></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="h-8 bg-gray-200 rounded"></div>
        <div className="h-8 bg-gray-200 rounded"></div>
        <div className="h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
