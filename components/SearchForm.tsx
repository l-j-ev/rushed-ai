'use client';

import { useState, useEffect } from 'react';
import { Plane, Calendar, Users, MapPin, Zap, Hotel, Car } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { searchAirports } from '@/lib/api/skyscanner';
import { getSmartDateSuggestions, formatDate, debounce } from '@/lib/utils';
import type { Airport } from '@/types';

export default function SearchForm({ onSearch }: { onSearch: () => void }) {
  const { searchCriteria, setSearchCriteria, preferences } = useAppStore();
  const [originQuery, setOriginQuery] = useState('');
  const [destQuery, setDestQuery] = useState('');
  const [originSuggestions, setOriginSuggestions] = useState<Airport[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<Airport[]>([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);

  const dateSuggestions = getSmartDateSuggestions();

  // Debounced airport search
  useEffect(() => {
    const search = debounce(async (query: string, type: 'origin' | 'dest') => {
      if (query.length < 2) return;
      const results = await searchAirports(query);
      if (type === 'origin') {
        setOriginSuggestions(results);
      } else {
        setDestSuggestions(results);
      }
    }, 300);

    if (originQuery) search(originQuery, 'origin');
    if (destQuery) search(destQuery, 'dest');
  }, [originQuery, destQuery]);

  const handleQuickDateSelect = (suggestion: any) => {
    setSearchCriteria({
      departureDate: suggestion.departure,
      returnDate: suggestion.return,
    });
  };

  const handleSearch = () => {
    if (!searchCriteria.origin || !searchCriteria.destination || !searchCriteria.departureDate) {
      alert('Please fill in all required fields');
      return;
    }
    onSearch();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
      {/* Quick Trip Type */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setSearchCriteria({ includeHotel: !searchCriteria.includeHotel })}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
            searchCriteria.includeHotel
              ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
              : 'bg-gray-100 text-gray-700 border-2 border-transparent'
          }`}
        >
          <Hotel className="w-4 h-4" />
          <span className="text-sm font-medium">+ Hotel</span>
        </button>
        <button
          onClick={() => setSearchCriteria({ includeCar: !searchCriteria.includeCar })}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
            searchCriteria.includeCar
              ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
              : 'bg-gray-100 text-gray-700 border-2 border-transparent'
          }`}
        >
          <Car className="w-4 h-4" />
          <span className="text-sm font-medium">+ Car</span>
        </button>
        <button
          onClick={() => setSearchCriteria({ directFlightsOnly: !searchCriteria.directFlightsOnly })}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
            searchCriteria.directFlightsOnly
              ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
              : 'bg-gray-100 text-gray-700 border-2 border-transparent'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">Direct Only</span>
        </button>
      </div>

      {/* Location inputs */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchCriteria.origin?.name || originQuery}
              onChange={(e) => {
                setOriginQuery(e.target.value);
                setShowOriginSuggestions(true);
              }}
              onFocus={() => setShowOriginSuggestions(true)}
              placeholder="City or airport"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          {showOriginSuggestions && originSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
              {originSuggestions.map((airport) => (
                <button
                  key={airport.entityId}
                  onClick={() => {
                    setSearchCriteria({ origin: airport });
                    setOriginQuery('');
                    setShowOriginSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{airport.name}</div>
                    <div className="text-sm text-gray-500">{airport.city}, {airport.country}</div>
                  </div>
                  <span className="text-sm font-mono text-gray-400">{airport.iata}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To
          </label>
          <div className="relative">
            <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchCriteria.destination?.name || destQuery}
              onChange={(e) => {
                setDestQuery(e.target.value);
                setShowDestSuggestions(true);
              }}
              onFocus={() => setShowDestSuggestions(true)}
              placeholder="City or airport"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          {showDestSuggestions && destSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
              {destSuggestions.map((airport) => (
                <button
                  key={airport.entityId}
                  onClick={() => {
                    setSearchCriteria({ destination: airport });
                    setDestQuery('');
                    setShowDestSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{airport.name}</div>
                    <div className="text-sm text-gray-500">{airport.city}, {airport.country}</div>
                  </div>
                  <span className="text-sm font-mono text-gray-400">{airport.iata}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick date suggestions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quick Dates
        </label>
        <div className="grid grid-cols-3 gap-2">
          {Object.values(dateSuggestions).map((suggestion) => (
            <button
              key={suggestion.label}
              onClick={() => handleQuickDateSelect(suggestion)}
              className="px-3 py-2 bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg text-sm transition"
            >
              <div className="font-medium">{suggestion.label}</div>
              <div className="text-xs text-gray-500 mt-1">
                {formatDate(suggestion.departure, 'MMM dd')} - {formatDate(suggestion.return, 'MMM dd')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Manual date selection */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Departure
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={searchCriteria.departureDate ? searchCriteria.departureDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setSearchCriteria({ departureDate: new Date(e.target.value) })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Return
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={searchCriteria.returnDate ? searchCriteria.returnDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setSearchCriteria({ returnDate: new Date(e.target.value) })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Passengers and cabin class */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Passengers
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={searchCriteria.adults}
              onChange={(e) => setSearchCriteria({ adults: parseInt(e.target.value) })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Adult' : 'Adults'}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cabin Class
          </label>
          <select
            value={searchCriteria.cabinClass}
            onChange={(e) => setSearchCriteria({ cabinClass: e.target.value as any })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="economy">Economy</option>
            <option value="premium_economy">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first">First Class</option>
          </select>
        </div>
      </div>

      {/* Search button */}
      <button
        onClick={handleSearch}
        className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
      >
        <Zap className="w-5 h-5" />
        <span>Search Trips</span>
      </button>
    </div>
  );
}
