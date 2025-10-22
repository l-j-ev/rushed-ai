// Core types for the travel booking app

export interface Airport {
  skyId: string;
  entityId: string;
  name: string;
  iata: string;
  city: string;
  country: string;
}

export interface FlightSegment {
  id: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  duration: number;
  airline: string;
  flightNumber: string;
  cabinClass: 'economy' | 'premium_economy' | 'business' | 'first';
  stops: number;
}

export interface FlightItinerary {
  id: string;
  price: {
    amount: number;
    currency: string;
    formatted: string;
  };
  outbound: FlightSegment[];
  inbound?: FlightSegment[];
  totalDuration: number;
  airlines: string[];
  deepLink: string;
  badge?: 'fastest' | 'cheapest' | 'best';
}

export interface Hotel {
  id: string;
  name: string;
  rating: number;
  stars: number;
  price: {
    amount: number;
    currency: string;
    formatted: string;
  };
  image: string;
  address: string;
  amenities: string[];
  distance: string;
  deepLink: string;
}

export interface CarRental {
  id: string;
  company: string;
  carType: string;
  category: string;
  price: {
    amount: number;
    currency: string;
    formatted: string;
  };
  passengers: number;
  doors: number;
  transmission: 'automatic' | 'manual';
  fuelPolicy: string;
  deepLink: string;
}

export interface SearchCriteria {
  origin: Airport | null;
  destination: Airport | null;
  departureDate: Date | null;
  returnDate: Date | null;
  adults: number;
  cabinClass: 'economy' | 'premium_economy' | 'business' | 'first';
  directFlightsOnly: boolean;
  includeHotel: boolean;
  includeCar: boolean;
}

export interface TravelPackage {
  id: string;
  flight: FlightItinerary;
  hotel?: Hotel;
  car?: CarRental;
  totalPrice: {
    amount: number;
    currency: string;
    formatted: string;
  };
  savings?: number;
}

export interface SavedPreferences {
  homeAirport?: Airport;
  preferredAirlines?: string[];
  preferredCabinClass?: string;
  directFlightsOnly?: boolean;
  recentSearches?: SearchCriteria[];
}
