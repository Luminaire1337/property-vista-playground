"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Bed, Bath, Car, Eye } from "lucide-react";
import { Property } from "@/types/property";
import {
  formatPrice,
  formatPricePerM2,
  formatArea,
  getPropertyTypeLabel,
  getTransactionTypeLabel,
} from "@/lib/utils";
// Removed individual favorite checking - now handled at parent level
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  onFavorite?: (propertyId: string) => void;
  onViewDetails?: (propertySlug: string) => void;
  className?: string;
  isFavorited?: boolean; // Accept favorite status as prop to avoid individual API calls
  isDailyFeatured?: boolean; // Indicates if this property is featured today
}

export function PropertyCard({
  property,
  onFavorite,
  onViewDetails,
  className,
  isFavorited = false,
  isDailyFeatured = false,
}: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(isFavorited);

  // Update local state when prop changes
  useEffect(() => {
    setIsFavorite(isFavorited);
  }, [isFavorited]);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite?.(property.id);
  };

  const handleViewDetails = () => {
    onViewDetails?.(property.slug);
  };

  return (
    <Card className={cn("property-card group overflow-hidden flex flex-col h-full", className)}>
      {/* Property Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={property.featured}
        />
        {isDailyFeatured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
            🌟 Dzisiaj Polecane
          </div>
        )}
        {property.featured && !isDailyFeatured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
            ⭐ Wyróżnione
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
            onClick={handleFavorite}
          >
            <Heart
              className={cn(
                "h-4 w-4",
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              )}
            />
          </Button>
        </div>
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        {/* Property Type & Transaction */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {getPropertyTypeLabel(property.propertyType)}
          </span>
          <span className="text-xs text-gray-500">
            {getTransactionTypeLabel(property.transactionType)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm truncate">{property.location}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.rooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{property.bathrooms}</span>
            </div>
            {property.parking > 0 && (
              <div className="flex items-center">
                <Car className="h-4 w-4 mr-1" />
                <span>{property.parking}</span>
              </div>
            )}
          </div>
          <span className="font-medium">{formatArea(property.area)}</span>
        </div>


        {/* Price */}
        <div className="mb-3 mt-auto">
          <div className="text-2xl font-bold text-gray-900">
            {formatPrice(property.price)}
          </div>
          <div className="text-sm text-gray-600">
            {formatPricePerM2(property.pricePerM2)}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 block">
        <Button 
          onClick={handleViewDetails} 
          className="w-full h-10 text-sm font-medium flex items-center justify-center gap-2" 
          size="default"
        >
          <Eye className="h-4 w-4" />
          <span>Zobacz Szczegóły</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
