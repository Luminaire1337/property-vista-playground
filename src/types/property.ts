export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: number;
  pricePerM2: number;
  area: number; // in m²
  rooms: number;
  bathrooms: number;
  parking: number;
  images: string[];
  featured: boolean;
  views: number;
  propertyType: PropertyType;
  transactionType: TransactionType;
  description: string;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type PropertyType = "mieszkanie" | "dom" | "lokal" | "działka" | "garaż";

export type TransactionType = "sprzedaż" | "wynajem" | "kupno";

export interface PropertySearchFilters {
  location?: string;
  propertyType?: PropertyType;
  transactionType?: TransactionType;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  minRooms?: number;
  maxRooms?: number;
  parking?: boolean;
}

export interface PropertyStats {
  totalProperties: number;
  averagePrice: number;
  averagePricePerM2: number;
  averageArea: number;
  propertyTypeDistribution: Record<PropertyType, number>;
}
