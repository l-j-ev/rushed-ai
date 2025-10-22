'use client';

import { Car, Users, Settings } from 'lucide-react';
import type { CarRental } from '@/types';

interface CarCardProps {
  car: CarRental;
  onSelect: (car: CarRental) => void;
  isSelected?: boolean;
}

export default function CarCard({ car, onSelect, isSelected }: CarCardProps) {
  return (
    <div
      onClick={() => onSelect(car)}
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border-2 ${
        isSelected ? 'border-primary-500 ring-2 ring-primary-200' : 'border-transparent'
      } p-6 animate-fade-in`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 mb-1">{car.carType}</h3>
          <p className="text-sm text-gray-600">{car.company}</p>
          <span className="inline-block mt-2 px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700">
            {car.category}
          </span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{car.price.formatted}</div>
          <div className="text-xs text-gray-500">total</div>
        </div>
      </div>

      {/* Car specs */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{car.passengers}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Car className="w-4 h-4" />
          <span>{car.doors} doors</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Settings className="w-4 h-4" />
          <span className="capitalize">{car.transmission}</span>
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-4">
        Fuel: {car.fuelPolicy}
      </div>

      {/* Select button */}
      <button
        className={`w-full py-2 rounded-lg font-medium transition ${
          isSelected
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {isSelected ? 'Selected' : 'Select Car'}
      </button>
    </div>
  );
}
