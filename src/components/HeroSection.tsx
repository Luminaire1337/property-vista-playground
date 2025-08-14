"use client";

import { useRouter } from 'next/navigation';
import { SearchForm } from "@/components/ui/SearchForm";
import { siteConfig } from "@/config/site";
import { PropertySearchFilters } from "@/types/property";

export function HeroSection() {
  const router = useRouter();

  const handleSearch = (filters: PropertySearchFilters) => {
    // Build query string from filters
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });

    // Navigate to search page with filters
    router.push(`/szukaj?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Headline */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Znajdź Swoje
            <span className="block bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
              Wymarzone Mieszkanie
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Odkryj tysiące nieruchomości w całej Polsce. Od przytulnych mieszkań
            po luksusowe domy, mamy idealne miejsce dla Ciebie.
          </p>
        </div>

        {/* Search Form */}
        <SearchForm onSearch={handleSearch} />

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center space-x-8 text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">
              {siteConfig.features.maxProperties.toLocaleString("pl-PL")}+
              Nieruchomości
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">
              Zaufanie {siteConfig.features.maxUsers.toLocaleString("pl-PL")}+
              Klientów
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">Wsparcie 24/7</span>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
      <div
        className="absolute bottom-20 left-20 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse"
        style={{ animationDelay: "1000ms" }}
      ></div>
    </section>
  );
}
