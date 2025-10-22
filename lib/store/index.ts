// Global state management with Zustand
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SearchCriteria, SavedPreferences, FlightItinerary, Hotel, CarRental, TravelPackage } from '@/types';

interface AppState {
  // Search criteria
  searchCriteria: SearchCriteria;
  setSearchCriteria: (criteria: Partial<SearchCriteria>) => void;

  // Search results
  flights: FlightItinerary[];
  hotels: Hotel[];
  cars: CarRental[];
  packages: TravelPackage[];
  setFlights: (flights: FlightItinerary[]) => void;
  setHotels: (hotels: Hotel[]) => void;
  setCars: (cars: CarRental[]) => void;
  setPackages: (packages: TravelPackage[]) => void;

  // Loading states
  isSearching: boolean;
  setIsSearching: (loading: boolean) => void;

  // User preferences
  preferences: SavedPreferences;
  setPreferences: (prefs: Partial<SavedPreferences>) => void;
  addRecentSearch: (criteria: SearchCriteria) => void;

  // Selected items for booking
  selectedFlight: FlightItinerary | null;
  selectedHotel: Hotel | null;
  selectedCar: CarRental | null;
  setSelectedFlight: (flight: FlightItinerary | null) => void;
  setSelectedHotel: (hotel: Hotel | null) => void;
  setSelectedCar: (car: CarRental | null) => void;

  // Reset
  resetSearch: () => void;
}

const defaultSearchCriteria: SearchCriteria = {
  origin: null,
  destination: null,
  departureDate: null,
  returnDate: null,
  adults: 1,
  cabinClass: 'economy',
  directFlightsOnly: false,
  includeHotel: true,
  includeCar: false,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      searchCriteria: defaultSearchCriteria,
      flights: [],
      hotels: [],
      cars: [],
      packages: [],
      isSearching: false,
      preferences: {},
      selectedFlight: null,
      selectedHotel: null,
      selectedCar: null,

      setSearchCriteria: (criteria) =>
        set((state) => ({
          searchCriteria: { ...state.searchCriteria, ...criteria },
        })),

      setFlights: (flights) => set({ flights }),
      setHotels: (hotels) => set({ hotels }),
      setCars: (cars) => set({ cars }),
      setPackages: (packages) => set({ packages }),

      setIsSearching: (loading) => set({ isSearching: loading }),

      setPreferences: (prefs) =>
        set((state) => ({
          preferences: { ...state.preferences, ...prefs },
        })),

      addRecentSearch: (criteria) =>
        set((state) => {
          const recent = state.preferences.recentSearches || [];
          const updated = [criteria, ...recent.slice(0, 4)]; // Keep last 5
          return {
            preferences: {
              ...state.preferences,
              recentSearches: updated,
            },
          };
        }),

      setSelectedFlight: (flight) => set({ selectedFlight: flight }),
      setSelectedHotel: (hotel) => set({ selectedHotel: hotel }),
      setSelectedCar: (car) => set({ selectedCar: car }),

      resetSearch: () =>
        set({
          searchCriteria: defaultSearchCriteria,
          flights: [],
          hotels: [],
          cars: [],
          packages: [],
          selectedFlight: null,
          selectedHotel: null,
          selectedCar: null,
        }),
    }),
    {
      name: 'rushed-ai-storage',
      partialize: (state) => ({
        preferences: state.preferences,
        // Only persist preferences, not search results
      }),
    }
  )
);
