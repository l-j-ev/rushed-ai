'use client';

import { useState, useEffect } from 'react';
import { Zap, Filter, ArrowUpDown } from 'lucide-react';
import SearchForm from '@/components/SearchForm';
import FlightCard from '@/components/FlightCard';
import HotelCard from '@/components/HotelCard';
import CarCard from '@/components/CarCard';
import BookingSummary from '@/components/BookingSummary';
import { FlightSkeleton, HotelSkeleton, CarSkeleton } from '@/components/LoadingSkeleton';
import { useAppStore } from '@/lib/store';
import { searchFlights, searchHotels, searchCarRentals } from '@/lib/api/skyscanner';
import { formatDate } from '@/lib/utils';

export default function Home() {
  const {
    searchCriteria,
    flights,
    hotels,
    cars,
    isSearching,
    setFlights,
    setHotels,
    setCars,
    setIsSearching,
    selectedFlight,
    selectedHotel,
    selectedCar,
    setSelectedFlight,
    setSelectedHotel,
    setSelectedCar,
    addRecentSearch,
  } = useAppStore();

  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    if (!searchCriteria.origin || !searchCriteria.destination || !searchCriteria.departureDate) {
      return;
    }

    setIsSearching(true);
    setShowResults(true);
    setFlights([]);
    setHotels([]);
    setCars([]);

    // Save to recent searches
    addRecentSearch(searchCriteria);

    try {
      // Search for flights
      const flightResults = await searchFlights({
        origin: searchCriteria.origin.iata,
        destination: searchCriteria.destination.iata,
        departureDate: formatDate(searchCriteria.departureDate, 'yyyy-MM-dd'),
        returnDate: searchCriteria.returnDate ? formatDate(searchCriteria.returnDate, 'yyyy-MM-dd') : undefined,
        adults: searchCriteria.adults,
        cabinClass: searchCriteria.cabinClass,
        directFlightsOnly: searchCriteria.directFlightsOnly,
      });
      setFlights(flightResults);

      // Search for hotels if requested
      if (searchCriteria.includeHotel && searchCriteria.departureDate && searchCriteria.returnDate) {
        const hotelResults = await searchHotels({
          destination: searchCriteria.destination.entityId,
          checkIn: formatDate(searchCriteria.departureDate, 'yyyy-MM-dd'),
          checkOut: formatDate(searchCriteria.returnDate, 'yyyy-MM-dd'),
          adults: searchCriteria.adults,
        });
        setHotels(hotelResults);
      }

      // Search for cars if requested
      if (searchCriteria.includeCar && searchCriteria.departureDate && searchCriteria.returnDate) {
        const carResults = await searchCarRentals({
          pickupLocation: searchCriteria.destination.iata,
          pickupDate: formatDate(searchCriteria.departureDate, 'yyyy-MM-dd'),
          dropoffDate: formatDate(searchCriteria.returnDate, 'yyyy-MM-dd'),
        });
        setCars(carResults);
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Error searching. Please check your API key and try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book Your Trip in Seconds
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Designed for busy professionals. Search flights, hotels, and cars in one place. Book your entire itinerary with minimal clicks.
            </p>
          </div>

          {/* Search form */}
          <div className="max-w-4xl mx-auto">
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Results section */}
      {showResults && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32">
          {/* Quick stats */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {isSearching ? 'Searching...' : 'Your Trip Options'}
              </h2>
              {!isSearching && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Zap className="w-4 h-4" />
                  <span>
                    Found {flights.length} flights
                    {searchCriteria.includeHotel && `, ${hotels.length} hotels`}
                    {searchCriteria.includeCar && `, ${cars.length} cars`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Flights */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary-700 font-bold">1</span>
              </div>
              Choose Your Flight
            </h3>
            <div className="grid gap-4">
              {isSearching ? (
                <>
                  <FlightSkeleton />
                  <FlightSkeleton />
                  <FlightSkeleton />
                </>
              ) : flights.length > 0 ? (
                flights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onSelect={setSelectedFlight}
                    isSelected={selectedFlight?.id === flight.id}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-md">
                  <p className="text-gray-500">No flights found. Try adjusting your search.</p>
                </div>
              )}
            </div>
          </div>

          {/* Hotels */}
          {searchCriteria.includeHotel && (
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-primary-700 font-bold">2</span>
                </div>
                Choose Your Hotel
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {isSearching ? (
                  <>
                    <HotelSkeleton />
                    <HotelSkeleton />
                    <HotelSkeleton />
                  </>
                ) : hotels.length > 0 ? (
                  hotels.map((hotel) => (
                    <HotelCard
                      key={hotel.id}
                      hotel={hotel}
                      onSelect={setSelectedHotel}
                      isSelected={selectedHotel?.id === hotel.id}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-md">
                    <p className="text-gray-500">No hotels found. Try adjusting your search.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Cars */}
          {searchCriteria.includeCar && (
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-primary-700 font-bold">{searchCriteria.includeHotel ? '3' : '2'}</span>
                </div>
                Choose Your Car
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {isSearching ? (
                  <>
                    <CarSkeleton />
                    <CarSkeleton />
                    <CarSkeleton />
                  </>
                ) : cars.length > 0 ? (
                  cars.map((car) => (
                    <CarCard
                      key={car.id}
                      car={car}
                      onSelect={setSelectedCar}
                      isSelected={selectedCar?.id === car.id}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-md">
                    <p className="text-gray-500">No cars found. Try adjusting your search.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Features section (shown before search) */}
      {!showResults && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Smart defaults and quick date selection save you time. Book your trip in under 2 minutes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">All-in-One</h3>
              <p className="text-gray-600">
                Bundle flights, hotels, and car rentals in a single search. See everything you need at once.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowUpDown className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Powered by Skyscanner's extensive network. Compare prices from 1,200+ travel partners.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Booking summary bar */}
      <BookingSummary />
    </div>
  );
}
