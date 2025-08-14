"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Building2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { PropertySearchFilters } from "@/types/property";
import { cn } from "@/lib/utils";

interface SearchFormProps {
  onSearch: (filters: PropertySearchFilters) => void;
  className?: string;
}

export function SearchForm({ onSearch, className }: SearchFormProps) {
  const [filters, setFilters] = useState<PropertySearchFilters>({
    transactionType: "sprzedaż",
    location: "",
    propertyType: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    minArea: undefined,
    maxArea: undefined,
    minRooms: undefined,
    parking: undefined,
  });

  const handleInputChange = (
    field: keyof PropertySearchFilters,
    value: string | number | boolean | undefined
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value === "" ? undefined : value,
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100",
        className
      )}
    >
      {/* Search Type Tabs */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          {siteConfig.searchOptions.transactionTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => handleInputChange("transactionType", type.value)}
              className={cn(
                "px-6 py-2 rounded-md font-medium transition-all duration-200",
                filters.transactionType === type.value
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Location */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Miasto, dzielnica lub adres"
            value={filters.location || ""}
            onChange={(e) => handleInputChange("location", e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 h-12 text-lg"
          />
        </div>

        {/* Property Type */}
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filters.propertyType || ""}
            onChange={(e) => handleInputChange("propertyType", e.target.value)}
            className="w-full h-12 pl-10 pr-4 border border-gray-200 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Wszystkie typy</option>
            {siteConfig.searchOptions.propertyTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div className="relative">
          <Input
            type="number"
            placeholder="Min. cena (PLN)"
            value={filters.minPrice || ""}
            onChange={(e) =>
              handleInputChange(
                "minPrice",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            onKeyDown={handleKeyDown}
            className="h-12 text-lg"
          />
        </div>

        {/* Max Price */}
        <div className="relative">
          <Input
            type="number"
            placeholder="Max. cena (PLN)"
            value={filters.maxPrice || ""}
            onChange={(e) =>
              handleInputChange(
                "maxPrice",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            onKeyDown={handleKeyDown}
            className="h-12 text-lg"
          />
        </div>
      </div>

      {/* Additional Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Min Area */}
        <div className="relative">
          <Input
            type="number"
            placeholder="Min. powierzchnia (m²)"
            value={filters.minArea || ""}
            onChange={(e) =>
              handleInputChange(
                "minArea",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            onKeyDown={handleKeyDown}
            className="h-12 text-lg"
          />
        </div>

        {/* Min Rooms */}
        <div className="relative">
          <Input
            type="number"
            placeholder="Min. liczba pokoi"
            value={filters.minRooms || ""}
            onChange={(e) =>
              handleInputChange(
                "minRooms",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            onKeyDown={handleKeyDown}
            className="h-12 text-lg"
          />
        </div>

        {/* Parking */}
        <div className="relative">
          <select
            value={
              filters.parking === undefined
                ? ""
                : filters.parking
                ? "true"
                : "false"
            }
            onChange={(e) =>
              handleInputChange(
                "parking",
                e.target.value === "" ? undefined : e.target.value === "true"
              )
            }
            className="w-full h-12 px-4 border border-gray-200 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Parking (dowolne)</option>
            <option value="true">Z parkingiem</option>
            <option value="false">Bez parkingu</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <div className="text-center">
        <Button
          variant="hero"
          size="xl"
          className="h-12 text-lg font-semibold px-8"
          onClick={handleSearch}
        >
          <Search className="w-5 h-5 mr-2" />
          Szukaj nieruchomości
        </Button>
      </div>
    </div>
  );
}
