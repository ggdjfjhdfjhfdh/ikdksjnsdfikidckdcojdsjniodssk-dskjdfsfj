/**
 * Geocoding Service
 * Provides reverse geocoding functionality to get country/city from coordinates
 */

// Cache for geocoding results to avoid repeated API calls
const geocodingCache = new Map();

// Fallback data for major cities and regions
const fallbackLocations = {
  // Major cities with approximate coordinates
  cities: [
    { name: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060, region: 'North America' },
    { name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, region: 'Europe' },
    { name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, region: 'Asia' },
    { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, region: 'Europe' },
    { name: 'Beijing', country: 'China', lat: 39.9042, lng: 116.4074, region: 'Asia' },
    { name: 'Moscow', country: 'Russia', lat: 55.7558, lng: 37.6173, region: 'Europe' },
    { name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, region: 'Oceania' },
    { name: 'São Paulo', country: 'Brazil', lat: -23.5505, lng: -46.6333, region: 'South America' },
    { name: 'Mumbai', country: 'India', lat: 19.0760, lng: 72.8777, region: 'Asia' },
    { name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, region: 'Africa' },
    { name: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050, region: 'Europe' },
    { name: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832, region: 'North America' },
    { name: 'Seoul', country: 'South Korea', lat: 37.5665, lng: 126.9780, region: 'Asia' },
    { name: 'Mexico City', country: 'Mexico', lat: 19.4326, lng: -99.1332, region: 'North America' },
    { name: 'Lagos', country: 'Nigeria', lat: 6.5244, lng: 3.3792, region: 'Africa' }
  ],
  
  // Country boundaries (simplified)
  countries: [
    { name: 'United States', bounds: { north: 49.3457868, south: 24.7433195, east: -66.9513812, west: -124.7844079 } },
    { name: 'China', bounds: { north: 53.5609739, south: 18.1973, east: 134.7754563, west: 73.4997347 } },
    { name: 'Russia', bounds: { north: 81.2504, south: 41.1850968, east: -169.05, west: 19.6389 } },
    { name: 'Brazil', bounds: { north: 5.2842873, south: -33.7683777, east: -28.6341164, west: -73.9872354 } },
    { name: 'Australia', bounds: { north: -9.0882278, south: -54.777, east: 159.5, west: 112.6997261 } }
  ]
};

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lng1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lng2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Check if coordinates are within country bounds
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {Object} bounds - Country bounds object
 * @returns {boolean} True if coordinates are within bounds
 */
function isWithinBounds(lat, lng, bounds) {
  return lat >= bounds.south && lat <= bounds.north &&
         lng >= bounds.west && lng <= bounds.east;
}

/**
 * Find nearest city from fallback data
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Object|null} Nearest city object or null
 */
function findNearestCity(lat, lng) {
  let nearestCity = null;
  let minDistance = Infinity;
  
  for (const city of fallbackLocations.cities) {
    const distance = calculateDistance(lat, lng, city.lat, city.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearestCity = { ...city, distance };
    }
  }
  
  // Only return if within reasonable distance (< 500km)
  return minDistance < 500 ? nearestCity : null;
}

/**
 * Find country from coordinates using fallback data
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {string|null} Country name or null
 */
function findCountryFromBounds(lat, lng) {
  for (const country of fallbackLocations.countries) {
    if (isWithinBounds(lat, lng, country.bounds)) {
      return country.name;
    }
  }
  return null;
}

/**
 * Get region from coordinates
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {string} Region name
 */
function getRegionFromCoordinates(lat, lng) {
  // Simple region detection based on coordinates
  if (lat >= 35 && lng >= -10 && lng <= 70) return 'Europe';
  if (lat >= 10 && lng >= 70 && lng <= 180) return 'Asia';
  if (lat >= -35 && lat <= 37 && lng >= -20 && lng <= 55) return 'Africa';
  if (lat >= 15 && lng >= -170 && lng <= -30) return 'North America';
  if (lat >= -60 && lat <= 15 && lng >= -85 && lng <= -30) return 'South America';
  if (lat >= -50 && lng >= 110 && lng <= 180) return 'Oceania';
  return 'Unknown';
}

/**
 * Reverse geocode coordinates using OpenStreetMap Nominatim API
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise<Object>} Geocoding result
 */
export async function reverseGeocode(lat, lng) {
  const cacheKey = `${lat.toFixed(4)},${lng.toFixed(4)}`;
  
  // Check cache first
  if (geocodingCache.has(cacheKey)) {
    return geocodingCache.get(cacheKey);
  }
  
  try {
    // Try OpenStreetMap Nominatim API (free, no API key required)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'SESEC-ThreatMap/1.0'
        }
      }
    );
    
    if (response.ok) {
      const data = await response.json();
      
      if (data && data.address) {
        const result = {
          city: data.address.city || data.address.town || data.address.village || 'Unknown',
          country: data.address.country || 'Unknown',
          region: getRegionFromCoordinates(lat, lng),
          source: 'nominatim'
        };
        
        // Cache the result
        geocodingCache.set(cacheKey, result);
        return result;
      }
    }
  } catch (error) {
    console.warn('Nominatim geocoding failed:', error);
  }
  
  // Fallback to local data
  const nearestCity = findNearestCity(lat, lng);
  const country = findCountryFromBounds(lat, lng);
  
  const result = {
    city: nearestCity ? nearestCity.name : 'Unknown',
    country: country || (nearestCity ? nearestCity.country : 'Unknown'),
    region: nearestCity ? nearestCity.region : getRegionFromCoordinates(lat, lng),
    source: 'fallback',
    distance: nearestCity ? nearestCity.distance : null
  };
  
  // Cache the fallback result
  geocodingCache.set(cacheKey, result);
  return result;
}

/**
 * Batch reverse geocode multiple coordinates
 * @param {Array} coordinates - Array of [lat, lng] pairs
 * @returns {Promise<Array>} Array of geocoding results
 */
export async function batchReverseGeocode(coordinates) {
  const results = [];
  
  // Process in batches to avoid overwhelming the API
  const batchSize = 5;
  for (let i = 0; i < coordinates.length; i += batchSize) {
    const batch = coordinates.slice(i, i + batchSize);
    const batchPromises = batch.map(([lat, lng]) => reverseGeocode(lat, lng));
    
    try {
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      // Add delay between batches to be respectful to the API
      if (i + batchSize < coordinates.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Batch geocoding error:', error);
      // Add fallback results for failed batch
      const fallbackResults = batch.map(([lat, lng]) => ({
        city: 'Unknown',
        country: 'Unknown',
        region: getRegionFromCoordinates(lat, lng),
        source: 'error'
      }));
      results.push(...fallbackResults);
    }
  }
  
  return results;
}

/**
 * Get cached geocoding results count
 * @returns {number} Number of cached results
 */
export function getCacheSize() {
  return geocodingCache.size;
}

/**
 * Clear geocoding cache
 */
export function clearCache() {
  geocodingCache.clear();
}

/**
 * Get random coordinates for demonstration
 * @param {number} count - Number of coordinates to generate
 * @returns {Array} Array of [lat, lng] pairs
 */
export function generateRandomCoordinates(count = 10) {
  const coordinates = [];
  
  for (let i = 0; i < count; i++) {
    // Generate coordinates around major population centers
    const baseCity = fallbackLocations.cities[Math.floor(Math.random() * fallbackLocations.cities.length)];
    const lat = baseCity.lat + (Math.random() - 0.5) * 10; // ±5 degrees
    const lng = baseCity.lng + (Math.random() - 0.5) * 10; // ±5 degrees
    coordinates.push([lat, lng]);
  }
  
  return coordinates;
}