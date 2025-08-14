'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchForm } from '@/components/ui/SearchForm';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { Button } from '@/components/ui/button';
import { Loader2, SlidersHorizontal, MapPin, Filter } from 'lucide-react';
import { Property, PropertySearchFilters } from '@/types/property';
import { searchProperties, getBatchFavoritesStatus, addToFavorites, removeFromFavorites } from '@/lib/properties';
import { useAuth } from '@/contexts/AuthContext';

function SearchPageContent() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [currentFilters, setCurrentFilters] = useState<PropertySearchFilters>({
    transactionType: 'sprzedaż'
  });
  
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const resultsPerPage = 12;

  const handleSearch = useCallback(async (filters: PropertySearchFilters) => {
    setLoading(true);
    setError(null);
    setCurrentFilters(filters);
    setCurrentPage(1);

    try {
      // Use the searchProperties function if there's a query, otherwise getProperties with filters
      let results: Property[];
      if (filters.location) {
        results = await searchProperties(filters.location, {
          propertyType: filters.propertyType,
          transactionType: filters.transactionType,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          rooms: filters.minRooms,
        });
      } else {
        const { getProperties } = await import('@/lib/properties');
        results = await getProperties({
          propertyType: filters.propertyType,
          transactionType: filters.transactionType,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          location: filters.location,
          rooms: filters.minRooms,
          limit: 100 // Get more results for client-side pagination
        });
      }

      setProperties(results);
      setTotalResults(results.length);

      // Load favorites for authenticated users
      if (user && results.length > 0) {
        const propertyIds = results.map(p => p.id);
        const favoritesStatus = await getBatchFavoritesStatus(propertyIds, user.id);
        setFavorites(favoritesStatus);
      }

    } catch (err) {
      console.error('Error searching properties:', err);
      setError('Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Load search filters from URL on mount
  useEffect(() => {
    const urlFilters: PropertySearchFilters = {
      transactionType: (searchParams.get('transactionType') as PropertySearchFilters['transactionType']) || 'sprzedaż',
      location: searchParams.get('location') || '',
      propertyType: (searchParams.get('propertyType') as PropertySearchFilters['propertyType']) || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      minArea: searchParams.get('minArea') ? Number(searchParams.get('minArea')) : undefined,
      maxArea: searchParams.get('maxArea') ? Number(searchParams.get('maxArea')) : undefined,
      minRooms: searchParams.get('minRooms') ? Number(searchParams.get('minRooms')) : undefined,
      parking: searchParams.get('parking') ? searchParams.get('parking') === 'true' : undefined,
    };
    
    setCurrentFilters(urlFilters);
    
    // Perform initial search if there are filters from URL
    if (Object.values(urlFilters).some(value => value !== undefined && value !== '')) {
      handleSearch(urlFilters);
    }
  }, [searchParams, handleSearch]);

  const handleFavorite = async (propertyId: string) => {
    if (!user) {
      // TODO: Open AuthModal
      return;
    }

    try {
      const isFavorited = favorites[propertyId];
      
      if (isFavorited) {
        await removeFromFavorites(propertyId);
        setFavorites(prev => ({ ...prev, [propertyId]: false }));
      } else {
        await addToFavorites(propertyId);
        setFavorites(prev => ({ ...prev, [propertyId]: true }));
      }
    } catch (err) {
      console.error('Error handling favorite:', err);
    }
  };

  const handleViewDetails = (propertySlug: string) => {
    // Preserve current search parameters in the URL
    const searchParamsString = searchParams.toString();
    const url = searchParamsString 
      ? `/nieruchomosci/${propertySlug}?from=search&${searchParamsString}`
      : `/nieruchomosci/${propertySlug}?from=search`;
    router.push(url);
  };

  // Pagination
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentProperties = properties.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Wyszukaj Nieruchomości
            </h1>
            <p className="text-lg text-gray-600">
              Znajdź idealną nieruchomość spośród tysięcy ofert w całej Polsce
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <SearchForm 
              onSearch={handleSearch}
              className={`transition-all duration-300 ${!showFilters && 'mb-4'}`}
            />
          </div>

          {/* Toggle Filters Button (Mobile) */}
          <div className="flex justify-center mt-4 md:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>{showFilters ? 'Ukryj filtry' : 'Pokaż filtry'}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            {loading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-lg text-gray-600">Wyszukiwanie...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="text-lg text-gray-900 font-semibold">
                  {totalResults > 0 ? (
                    <>Znaleziono {totalResults} {totalResults === 1 ? 'nieruchomość' : totalResults < 5 ? 'nieruchomości' : 'nieruchomości'}</>
                  ) : properties.length === 0 && !loading ? (
                    'Brak wyników'
                  ) : (
                    'Wyniki wyszukiwania'
                  )}
                </span>
              </div>
            )}
          </div>

          {/* Sort Options */}
          {!loading && totalResults > 0 && (
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="newest">Najnowsze</option>
                <option value="price_low">Cena: od najniższej</option>
                <option value="price_high">Cena: od najwyższej</option>
                <option value="area_large">Powierzchnia: największe</option>
                <option value="area_small">Powierzchnia: najmniejsze</option>
              </select>
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 font-medium">{error}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => handleSearch(currentFilters)}
              >
                Spróbuj ponownie
              </Button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && totalResults === 0 && !error && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-6">🏠</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Brak wyników
              </h3>
              <p className="text-gray-600 mb-6">
                Nie znaleźliśmy nieruchomości spełniających Twoje kryteria.
                Spróbuj zmienić filtry wyszukiwania.
              </p>
              <Button
                variant="outline"
                onClick={() => setShowFilters(true)}
                className="flex items-center space-x-2 mx-auto"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Zmień filtry</span>
              </Button>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {!loading && currentProperties.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {currentProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onFavorite={handleFavorite}
                  onViewDetails={handleViewDetails}
                  isFavorited={favorites[property.id] || false}
                  isDailyFeatured={false}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Poprzednia
                </Button>

                <div className="flex space-x-1">
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                    const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                    if (pageNum > totalPages) return null;
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-10"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Następna
                </Button>
              </div>
            )}

            {/* Results Summary */}
            <div className="text-center mt-8 text-sm text-gray-600">
              Wyświetlanie {startIndex + 1}-{Math.min(endIndex, totalResults)} z {totalResults} wyników
            </div>
          </>
        )}
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}