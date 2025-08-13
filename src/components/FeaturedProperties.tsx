"use client";

import { useState, useEffect } from "react";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { Button } from "@/components/ui/button";
import { getFeaturedProperties, addToFavorites, removeFromFavorites, getBatchFavoritesStatus } from "@/lib/properties";
import { Property } from "@/types/property";
import { useAuth } from "@/contexts/AuthContext";

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadFeaturedPropertiesAndFavorites = async () => {
      try {
        setLoading(true);
        const data = await getFeaturedProperties(8);
        setProperties(data);

        // Batch load favorites for all properties
        if (user && data.length > 0) {
          const propertyIds = data.map(p => p.id);
          const favoritesStatus = await getBatchFavoritesStatus(propertyIds, user.id);
          setFavorites(favoritesStatus);
        }
      } catch (err) {
        console.error('Error loading featured properties:', err);
        setError('Nie udało się załadować polecanych nieruchomości');
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedPropertiesAndFavorites();
  }, [user]); // Depend on user to reload when auth state changes


  const handleFavorite = async (propertyId: string) => {
    if (!user) {
      // TODO: Open AuthModal when user tries to favorite without login
      // Implementation: Add setIsAuthModalOpen(true) and pass modal state from parent
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

  const handleViewDetails = () => {
    // TODO: Navigate to property details page
    // Implementation: Add router.push(`/properties/${property.id}`)
  };

  const handleViewAll = () => {
    // TODO: Navigate to all properties page
    // Implementation: Add router.push('/properties')
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dzisiejsze Polecane Nieruchomości
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Codziennie prezentujemy nową selekcję najlepszych ofert nieruchomości.
            Sprawdź dzisiejszy wybór premium lokalizacji!
          </p>
          <p className="text-sm text-gray-500 mt-2">
            📅 Oferty odnawiają się codziennie o północy
          </p>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              className="mt-4"
            >
              Spróbuj ponownie
            </Button>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Brak polecanych nieruchomości do wyświetlenia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onFavorite={handleFavorite}
                onViewDetails={() => handleViewDetails()}
                isFavorited={favorites[property.id] || false}
                isDailyFeatured={true} // All properties in this section are daily featured
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" onClick={handleViewAll}>
            Zobacz Wszystkie Nieruchomości
          </Button>
        </div>
      </div>
    </section>
  );
}
