# Rushed AI - Fast Travel Booking for Busy Professionals

A lightning-fast travel booking application designed specifically for busy working professionals who need to book entire travel itineraries quickly and efficiently. Built with Next.js 14, TypeScript, and powered by the Skyscanner API.

## Features

### 🚀 Speed & Convenience
- **Smart Date Suggestions**: Pre-configured business travel dates (This Weekend, Next Week, In 2 Weeks)
- **Quick Trip Bundles**: Search flights, hotels, and car rentals simultaneously
- **Minimal Clicks**: Book your entire trip in 3-4 clicks
- **Smart Defaults**: Optimized for business travelers with sensible defaults

### ✈️ Comprehensive Search
- **Flights**: Real-time flight search with direct flight filtering
- **Hotels**: Search hotels at your destination with ratings and amenities
- **Car Rentals**: Add car rental to your itinerary seamlessly
- **Multi-cabin Support**: Economy, Premium Economy, Business, and First Class options

### 💼 Professional-Focused
- **Direct Flights Only**: Toggle to show only non-stop flights
- **Business Travel Patterns**: Smart date suggestions for Monday-Friday travel
- **Recent Searches**: Quick access to your previous searches
- **Saved Preferences**: Remember your home airport and preferences

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Updates**: Instant search results with loading states
- **Visual Feedback**: Clear selection indicators and booking summary
- **Smooth Animations**: Professional transitions and interactions

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **API Integration**: Axios + RapidAPI (Skyscanner)
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- RapidAPI account with Skyscanner API access

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rushed-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your RapidAPI key:
   ```env
   NEXT_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key_here
   RAPIDAPI_HOST=skyscanner44.p.rapidapi.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Getting a Skyscanner API Key

1. **Sign up for RapidAPI**
   - Go to [RapidAPI.com](https://rapidapi.com/)
   - Create a free account

2. **Subscribe to Skyscanner API**
   - Search for "Skyscanner" in the RapidAPI marketplace
   - Popular options:
     - [Skyscanner44 API](https://rapidapi.com/3b-data-3b-data-default/api/skyscanner44)
     - Other Skyscanner API providers
   - Subscribe to a plan (free tier available with limited requests)

3. **Copy your API key**
   - Go to the API's "Endpoints" page
   - Your API key will be shown in the code snippets
   - Copy the `X-RapidAPI-Key` value

4. **Add to your `.env.local` file**

## Project Structure

```
rushed-ai/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx            # Root layout component
│   └── page.tsx              # Main page (home/search)
├── components/
│   ├── BookingSummary.tsx    # Booking summary bar
│   ├── CarCard.tsx           # Car rental card component
│   ├── FlightCard.tsx        # Flight option card component
│   ├── HotelCard.tsx         # Hotel card component
│   ├── LoadingSkeleton.tsx   # Loading state components
│   └── SearchForm.tsx        # Main search form
├── lib/
│   ├── api/
│   │   └── skyscanner.ts     # Skyscanner API integration
│   ├── store/
│   │   └── index.ts          # Zustand state management
│   └── utils.ts              # Utility functions
├── types/
│   └── index.ts              # TypeScript type definitions
├── .env.example              # Environment variables template
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Usage Guide

### Basic Search Flow

1. **Select Trip Type**
   - Toggle "+ Hotel" to include hotel search
   - Toggle "+ Car" to include car rental
   - Toggle "Direct Only" to show only non-stop flights

2. **Enter Locations**
   - Type your departure city/airport in "From"
   - Select from autocomplete suggestions
   - Type your destination in "To"
   - Select from autocomplete suggestions

3. **Choose Dates**
   - Use Quick Dates buttons for common patterns:
     - This Weekend
     - Next Week (Mon-Fri)
     - In 2 Weeks
   - Or manually select dates using the date pickers

4. **Configure Trip Details**
   - Select number of passengers (1-6 adults)
   - Choose cabin class (Economy, Premium Economy, Business, First)

5. **Search**
   - Click "Search Trips" button
   - Results appear organized by category:
     1. Choose Your Flight
     2. Choose Your Hotel (if selected)
     3. Choose Your Car (if selected)

6. **Select Options**
   - Click on any flight card to select it
   - Click on any hotel card to select it (if applicable)
   - Click on any car card to select it (if applicable)
   - Selected items appear in the booking summary bar at the bottom

7. **Book**
   - Click "Book Now" in the summary bar
   - Opens booking links in new tabs for each selected item

## Key Features in Detail

### Smart Date Suggestions
The app analyzes common business travel patterns and suggests:
- **This Weekend**: Next Friday to Sunday
- **Next Week**: Monday to Friday of next week
- **In 2 Weeks**: Monday to Friday two weeks out

### Autocomplete Search
- Real-time airport search as you type
- Shows airport codes (IATA), city names, and countries
- Debounced for performance (300ms delay)

### State Persistence
- User preferences saved to localStorage
- Recent searches remembered
- Home airport preference (coming soon)

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized layouts
- Touch-friendly interface elements

## API Integration

### Supported Endpoints

1. **Airport Autocomplete**
   ```typescript
   searchAirports(query: string): Promise<Airport[]>
   ```

2. **Flight Search**
   ```typescript
   searchFlights(params: {
     origin: string;
     destination: string;
     departureDate: string;
     returnDate?: string;
     adults: number;
     cabinClass?: string;
     directFlightsOnly?: boolean;
   }): Promise<FlightItinerary[]>
   ```

3. **Hotel Search**
   ```typescript
   searchHotels(params: {
     destination: string;
     checkIn: string;
     checkOut: string;
     adults: number;
   }): Promise<Hotel[]>
   ```

4. **Car Rental Search**
   ```typescript
   searchCarRentals(params: {
     pickupLocation: string;
     pickupDate: string;
     dropoffDate: string;
   }): Promise<CarRental[]>
   ```

### Error Handling

The app includes comprehensive error handling:
- Network failures are caught and displayed to users
- Missing API keys result in clear error messages
- Invalid search parameters are validated before API calls

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

### Code Style

- TypeScript strict mode enabled
- ESLint with Next.js recommended rules
- Functional React components with hooks
- Tailwind CSS for styling (no CSS modules)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Docker containers

## Performance Optimizations

- **Code Splitting**: Automatic with Next.js App Router
- **Image Optimization**: Next.js Image component ready
- **API Debouncing**: Reduced API calls during autocomplete
- **Client-side Caching**: Zustand persist middleware
- **Lazy Loading**: Components load on demand
- **Optimistic UI**: Instant feedback before API responses

## Roadmap

### Phase 1 (Current)
- ✅ Core search functionality
- ✅ Flight, hotel, and car rental search
- ✅ Smart date suggestions
- ✅ Responsive design

### Phase 2 (Planned)
- [ ] User authentication
- [ ] Save favorite routes
- [ ] Price alerts
- [ ] Multi-city flights
- [ ] Flexible dates (±3 days)
- [ ] Price calendar view

### Phase 3 (Future)
- [ ] AI-powered recommendations
- [ ] Expense tracking integration
- [ ] Calendar integration (Google, Outlook)
- [ ] Team booking features
- [ ] Corporate travel policies
- [ ] Loyalty program integration

## Troubleshooting

### API Key Issues
**Problem**: "Error searching. Please check your API key"
- **Solution**: Verify your `.env.local` file has the correct `NEXT_PUBLIC_RAPIDAPI_KEY`
- Restart the development server after adding environment variables

### No Results Found
**Problem**: Search returns no results
- **Solution**: Try different dates or destinations
- Check API rate limits on RapidAPI dashboard
- Verify the API endpoint is responding (check RapidAPI status)

### Build Errors
**Problem**: TypeScript or build errors
- **Solution**: Run `npm run type-check` to see detailed errors
- Ensure all dependencies are installed: `npm install`
- Delete `.next` folder and rebuild: `rm -rf .next && npm run build`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **Skyscanner** for providing the travel search API
- **RapidAPI** for API marketplace and hosting
- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vercel** for hosting and deployment platform

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the troubleshooting section above

## Author

Built with ❤️ for busy professionals who value their time.

---

**Note**: This application is not affiliated with or endorsed by Skyscanner. It uses the Skyscanner API for travel search functionality.
