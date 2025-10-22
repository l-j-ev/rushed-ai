// Utility functions for the app
import { format, addDays, addWeeks, startOfWeek } from 'date-fns';

export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date: Date, formatStr: string = 'MMM dd, yyyy'): string {
  return format(date, formatStr);
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export function formatPrice(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Smart date suggestions for business travelers
export function getSmartDateSuggestions() {
  const today = new Date();
  const nextMonday = startOfWeek(addWeeks(today, 1), { weekStartsOn: 1 });

  return {
    thisWeekend: {
      departure: addDays(today, (5 - today.getDay() + 7) % 7 || 7), // Next Friday
      return: addDays(today, (7 - today.getDay() + 7) % 7 || 7), // Next Sunday
      label: 'This Weekend',
    },
    nextWeek: {
      departure: nextMonday,
      return: addDays(nextMonday, 4), // Friday
      label: 'Next Week (Mon-Fri)',
    },
    twoWeeks: {
      departure: addWeeks(nextMonday, 1),
      return: addWeeks(addDays(nextMonday, 4), 1),
      label: 'In 2 Weeks',
    },
  };
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function formatTimeRange(departure: string, arrival: string): string {
  const depTime = new Date(departure);
  const arrTime = new Date(arrival);
  return `${format(depTime, 'HH:mm')} - ${format(arrTime, 'HH:mm')}`;
}

export function getStopsLabel(stops: number): string {
  if (stops === 0) return 'Non-stop';
  if (stops === 1) return '1 stop';
  return `${stops} stops`;
}
