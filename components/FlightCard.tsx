'use client';

import { Plane, Clock, TrendingDown, Star } from 'lucide-react';
import type { FlightItinerary } from '@/types';
import { formatDuration, formatTimeRange, getStopsLabel } from '@/lib/utils';

interface FlightCardProps {
  flight: FlightItinerary;
  onSelect: (flight: FlightItinerary) => void;
  isSelected?: boolean;
}

export default function FlightCard({ flight, onSelect, isSelected }: FlightCardProps) {
  const outbound = flight.outbound[0];
  const inbound = flight.inbound?.[0];

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'fastest':
        return 'bg-blue-100 text-blue-700';
      case 'cheapest':
        return 'bg-green-100 text-green-700';
      case 'best':
        return 'bg-purple-100 text-purple-700';
      default:
        return '';
    }
  };

  return (
    <div
      onClick={() => onSelect(flight)}
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border-2 ${
        isSelected ? 'border-primary-500 ring-2 ring-primary-200' : 'border-transparent'
      } p-6 animate-fade-in`}
    >
      {/* Header with price and badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            {flight.airlines.map((airline, i) => (
              <span key={i} className="text-sm font-medium text-gray-700">
                {airline}
              </span>
            ))}
          </div>
          {flight.badge && (
            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getBadgeColor(flight.badge)}`}>
              <Star className="w-3 h-3 inline mr-1" />
              {flight.badge.charAt(0).toUpperCase() + flight.badge.slice(1)} Value
            </span>
          )}
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">{flight.price.formatted}</div>
          <div className="text-xs text-gray-500">per person</div>
        </div>
      </div>

      {/* Outbound flight */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <div>
                <div className="text-2xl font-bold">{outbound?.origin}</div>
                <div className="text-sm text-gray-500">{outbound?.departure && new Date(outbound.departure).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
              </div>

              <div className="flex-1 px-4">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <div className="flex flex-col items-center">
                    <Plane className="w-5 h-5 text-gray-400 rotate-90" />
                    <span className="text-xs text-gray-500 mt-1">{getStopsLabel(outbound?.stops || 0)}</span>
                  </div>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                <div className="text-center mt-1">
                  <span className="text-xs text-gray-500 flex items-center justify-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatDuration(outbound?.duration || 0)}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-2xl font-bold">{outbound?.destination}</div>
                <div className="text-sm text-gray-500">{outbound?.arrival && new Date(outbound.arrival).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Return flight if exists */}
        {inbound && (
          <>
            <div className="border-t border-gray-200 pt-3"></div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="text-2xl font-bold">{inbound.origin}</div>
                    <div className="text-sm text-gray-500">{new Date(inbound.departure).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>

                  <div className="flex-1 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-px bg-gray-300"></div>
                      <div className="flex flex-col items-center">
                        <Plane className="w-5 h-5 text-gray-400 -rotate-90" />
                        <span className="text-xs text-gray-500 mt-1">{getStopsLabel(inbound.stops || 0)}</span>
                      </div>
                      <div className="flex-1 h-px bg-gray-300"></div>
                    </div>
                    <div className="text-center mt-1">
                      <span className="text-xs text-gray-500 flex items-center justify-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDuration(inbound.duration || 0)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-2xl font-bold">{inbound.destination}</div>
                    <div className="text-sm text-gray-500">{new Date(inbound.arrival).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Select button */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          className={`w-full py-2 rounded-lg font-medium transition ${
            isSelected
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isSelected ? 'Selected' : 'Select Flight'}
        </button>
      </div>
    </div>
  );
}
