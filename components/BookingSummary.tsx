'use client';

import { Plane, Hotel, Car, CheckCircle, ExternalLink } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatDate, formatDuration } from '@/lib/utils';

export default function BookingSummary() {
  const { selectedFlight, selectedHotel, selectedCar, searchCriteria } = useAppStore();

  if (!selectedFlight && !selectedHotel && !selectedCar) {
    return null;
  }

  const totalPrice =
    (selectedFlight?.price.amount || 0) +
    (selectedHotel?.price.amount || 0) +
    (selectedCar?.price.amount || 0);

  const handleBook = () => {
    // Open booking links in new tabs
    if (selectedFlight?.deepLink) {
      window.open(selectedFlight.deepLink, '_blank');
    }
    if (selectedHotel?.deepLink) {
      window.open(selectedHotel.deepLink, '_blank');
    }
    if (selectedCar?.deepLink) {
      window.open(selectedCar.deepLink, '_blank');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-50 animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Selected items summary */}
          <div className="flex items-center space-x-6">
            {selectedFlight && (
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Flight</div>
                  <div className="font-medium">{selectedFlight.price.formatted}</div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            )}

            {selectedHotel && (
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <Hotel className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Hotel</div>
                  <div className="font-medium">{selectedHotel.price.formatted}</div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            )}

            {selectedCar && (
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <Car className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Car</div>
                  <div className="font-medium">{selectedCar.price.formatted}</div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            )}
          </div>

          {/* Total and book button */}
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="text-sm text-gray-500">Total Trip Cost</div>
              <div className="text-3xl font-bold text-gray-900">
                ${totalPrice.toFixed(0)}
              </div>
            </div>
            <button
              onClick={handleBook}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>Book Now</span>
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
