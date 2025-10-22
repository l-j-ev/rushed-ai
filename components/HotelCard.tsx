'use client';

import { MapPin, Star, Coffee, Wifi } from 'lucide-react';
import type { Hotel } from '@/types';

interface HotelCardProps {
  hotel: Hotel;
  onSelect: (hotel: Hotel) => void;
  isSelected?: boolean;
}

export default function HotelCard({ hotel, onSelect, isSelected }: HotelCardProps) {
  return (
    <div
      onClick={() => onSelect(hotel)}
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border-2 ${
        isSelected ? 'border-primary-500 ring-2 ring-primary-200' : 'border-transparent'
      } overflow-hidden animate-fade-in`}
    >
      {/* Hotel image */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400';
          }}
        />
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-lg">
          <span className="text-lg font-bold text-gray-900">{hotel.price.formatted}</span>
          <span className="text-xs text-gray-500">/night</span>
        </div>
      </div>

      {/* Hotel info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 mb-1">{hotel.name}</h3>
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center">
                {[...Array(hotel.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {hotel.rating.toFixed(1)} rating
              </span>
            </div>
          </div>
        </div>

        {hotel.distance && (
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{hotel.distance} from center</span>
          </div>
        )}

        {/* Amenities */}
        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {hotel.amenities.slice(0, 3).map((amenity, i) => (
              <span key={i} className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Select button */}
        <button
          className={`w-full py-2 rounded-lg font-medium transition ${
            isSelected
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isSelected ? 'Selected' : 'Select Hotel'}
        </button>
      </div>
    </div>
  );
}
