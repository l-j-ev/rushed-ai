// Skyscanner API integration via RapidAPI
import axios from 'axios';
import type { Airport, FlightItinerary, Hotel, CarRental } from '@/types';

const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'skyscanner44.p.rapidapi.com';

const api = axios.create({
  baseURL: `https://${RAPIDAPI_HOST}`,
  headers: {
    'X-RapidAPI-Key': RAPIDAPI_KEY || '',
    'X-RapidAPI-Host': RAPIDAPI_HOST,
  },
});

// Search for airports/locations
export async function searchAirports(query: string): Promise<Airport[]> {
  try {
    const response = await api.get('/autocomplete', {
      params: { query },
    });

    return (response.data?.data || []).map((item: any) => ({
      skyId: item.skyId || item.id,
      entityId: item.entityId || item.id,
      name: item.presentation?.title || item.name,
      iata: item.iata || item.code,
      city: item.presentation?.subtitle?.split(',')[0] || item.city,
      country: item.navigation?.relevantFlightParams?.market || item.country,
    }));
  } catch (error) {
    console.error('Airport search error:', error);
    return [];
  }
}

// Search for flights
export async function searchFlights(params: {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  cabinClass?: string;
  directFlightsOnly?: boolean;
  currency?: string;
  market?: string;
}): Promise<FlightItinerary[]> {
  try {
    const response = await api.get('/search', {
      params: {
        origin: params.origin,
        destination: params.destination,
        date: params.departureDate,
        returnDate: params.returnDate,
        adults: params.adults,
        cabinClass: params.cabinClass || 'economy',
        currency: params.currency || 'USD',
        market: params.market || 'US',
        locale: 'en-US',
      },
    });

    const itineraries = response.data?.data?.itineraries || [];

    return itineraries.slice(0, 20).map((item: any, index: number) => {
      const price = item.price?.raw || item.price?.amount || 0;
      const legs = item.legs || [];

      return {
        id: item.id || `flight-${index}`,
        price: {
          amount: price,
          currency: params.currency || 'USD',
          formatted: `$${price.toFixed(0)}`,
        },
        outbound: legs[0] ? parseFlightSegments(legs[0]) : [],
        inbound: legs[1] ? parseFlightSegments(legs[1]) : undefined,
        totalDuration: legs.reduce((sum: number, leg: any) => sum + (leg.durationInMinutes || 0), 0),
        airlines: [...new Set(legs.flatMap((leg: any) =>
          (leg.segments || []).map((seg: any) => seg.marketingCarrier?.name || 'Unknown')
        ))],
        deepLink: item.deepLink || `https://www.skyscanner.com`,
        badge: item.isSelfTransfer ? undefined : (index === 0 ? 'best' : undefined),
      };
    });
  } catch (error) {
    console.error('Flight search error:', error);
    return [];
  }
}

function parseFlightSegments(leg: any): any[] {
  const segments = leg.segments || [];
  return segments.map((seg: any, idx: number) => ({
    id: seg.id || `seg-${idx}`,
    origin: seg.origin?.displayCode || seg.origin?.iata,
    destination: seg.destination?.displayCode || seg.destination?.iata,
    departure: seg.departure,
    arrival: seg.arrival,
    duration: seg.durationInMinutes || 0,
    airline: seg.marketingCarrier?.name || 'Unknown',
    flightNumber: seg.flightNumber || '',
    cabinClass: seg.cabinClass || 'economy',
    stops: leg.stopCount || 0,
  }));
}

// Search for hotels
export async function searchHotels(params: {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  rooms?: number;
  currency?: string;
}): Promise<Hotel[]> {
  try {
    // Note: This is a placeholder implementation
    // The actual Skyscanner hotels API may have different endpoints
    const response = await api.get('/hotels/search', {
      params: {
        entityId: params.destination,
        checkin: params.checkIn,
        checkout: params.checkOut,
        adults: params.adults,
        rooms: params.rooms || 1,
        currency: params.currency || 'USD',
        market: 'US',
        locale: 'en-US',
      },
    });

    const hotels = response.data?.hotels || [];

    return hotels.slice(0, 15).map((hotel: any, index: number) => ({
      id: hotel.id || `hotel-${index}`,
      name: hotel.name,
      rating: hotel.rating || 0,
      stars: hotel.stars || 3,
      price: {
        amount: hotel.price?.amount || 0,
        currency: params.currency || 'USD',
        formatted: `$${(hotel.price?.amount || 0).toFixed(0)}`,
      },
      image: hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      address: hotel.address || '',
      amenities: hotel.amenities || [],
      distance: hotel.distance || '',
      deepLink: hotel.deepLink || 'https://www.skyscanner.com',
    }));
  } catch (error) {
    console.error('Hotel search error:', error);
    return [];
  }
}

// Search for car rentals
export async function searchCarRentals(params: {
  pickupLocation: string;
  dropoffLocation?: string;
  pickupDate: string;
  dropoffDate: string;
  pickupTime?: string;
  dropoffTime?: string;
  currency?: string;
}): Promise<CarRental[]> {
  try {
    // Note: This is a placeholder implementation
    const response = await api.get('/cars/search', {
      params: {
        pickup: params.pickupLocation,
        dropoff: params.dropoffLocation || params.pickupLocation,
        pickupDate: params.pickupDate,
        dropoffDate: params.dropoffDate,
        pickupTime: params.pickupTime || '10:00',
        dropoffTime: params.dropoffTime || '10:00',
        currency: params.currency || 'USD',
      },
    });

    const cars = response.data?.cars || [];

    return cars.slice(0, 10).map((car: any, index: number) => ({
      id: car.id || `car-${index}`,
      company: car.company || 'Car Rental Co.',
      carType: car.vehicleInfo?.model || 'Standard',
      category: car.vehicleInfo?.category || 'Economy',
      price: {
        amount: car.price?.amount || 0,
        currency: params.currency || 'USD',
        formatted: `$${(car.price?.amount || 0).toFixed(0)}`,
      },
      passengers: car.vehicleInfo?.passengers || 5,
      doors: car.vehicleInfo?.doors || 4,
      transmission: car.vehicleInfo?.transmission || 'automatic',
      fuelPolicy: car.fuelPolicy || 'Full to Full',
      deepLink: car.deepLink || 'https://www.skyscanner.com',
    }));
  } catch (error) {
    console.error('Car rental search error:', error);
    return [];
  }
}

// Get popular destinations for quick access
export function getPopularDestinations(): Airport[] {
  return [
    { skyId: 'LOND', entityId: 'LOND', name: 'London', iata: 'LON', city: 'London', country: 'GB' },
    { skyId: 'NYC', entityId: 'NYC', name: 'New York', iata: 'NYC', city: 'New York', country: 'US' },
    { skyId: 'PARI', entityId: 'PARI', name: 'Paris', iata: 'PAR', city: 'Paris', country: 'FR' },
    { skyId: 'TOKY', entityId: 'TOKY', name: 'Tokyo', iata: 'TYO', city: 'Tokyo', country: 'JP' },
    { skyId: 'DUBA', entityId: 'DUBA', name: 'Dubai', iata: 'DXB', city: 'Dubai', country: 'AE' },
    { skyId: 'SING', entityId: 'SING', name: 'Singapore', iata: 'SIN', city: 'Singapore', country: 'SG' },
  ];
}
