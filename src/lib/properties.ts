import { supabase } from './supabase';
import { Property } from '@/types/property';
import { Database } from '@/types/database';

type PropertyRow = Database['public']['Tables']['properties']['Row'];
type PropertyInsert = Database['public']['Tables']['properties']['Insert'];
type PropertyUpdate = Database['public']['Tables']['properties']['Update'];

// Generate URL-friendly slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ą/g, 'a')
    .replace(/ć/g, 'c')
    .replace(/ę/g, 'e')
    .replace(/ł/g, 'l')
    .replace(/ń/g, 'n')
    .replace(/ó/g, 'o')
    .replace(/ś/g, 's')
    .replace(/ź/g, 'z')
    .replace(/ż/g, 'z')
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Convert database row to Property type
function convertToProperty(row: PropertyRow & { primary_image_url?: string; primary_image_alt?: string }): Property {
  return {
    id: row.id,
    slug: row.slug || generateSlug(row.title),
    title: row.title,
    description: row.description,
    location: row.location,
    price: row.price,
    pricePerM2: row.price_per_m2,
    area: row.area,
    rooms: row.rooms,
    bathrooms: row.bathrooms,
    parking: row.parking,
    propertyType: row.property_type,
    transactionType: row.transaction_type,
    featured: row.featured,
    images: row.primary_image_url ? [row.primary_image_url] : [],
    features: [], // Add empty features array for now
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

// Get all properties with optional filtering
export async function getProperties(filters?: {
  propertyType?: string;
  transactionType?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  rooms?: number;
  limit?: number;
  offset?: number;
}) {
  let query = supabase
    .from('properties')
    .select(`
      *,
      property_images!property_images_property_id_fkey(
        url,
        alt_text,
        is_primary
      )
    `)
    .order('created_at', { ascending: false });

  if (filters?.propertyType) {
    query = query.eq('property_type', filters.propertyType);
  }

  if (filters?.transactionType) {
    query = query.eq('transaction_type', filters.transactionType);
  }

  if (filters?.minPrice) {
    query = query.gte('price', filters.minPrice);
  }

  if (filters?.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }

  if (filters?.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }

  if (filters?.rooms) {
    query = query.eq('rooms', filters.rooms);
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  if (filters?.offset) {
    query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }

  return data?.map(row => {
    const primaryImage = row.property_images?.find((img: { url: string; alt_text: string; is_primary: boolean }) => img.is_primary);
    return convertToProperty({
      ...row,
      primary_image_url: primaryImage?.url,
      primary_image_alt: primaryImage?.alt_text
    });
  }) || [];
}

// Get featured properties that rotate daily (24h cycle)
export async function getFeaturedProperties(limit = 8) {
  // Get current date as seed for daily rotation
  const today = new Date();
  const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD format
  const dateSeed = dateString.split('-').reduce((acc, part) => acc + parseInt(part), 0);
  
  // First, get all available properties (not just featured ones)
  const { data: allProperties, error } = await supabase
    .from('properties')
    .select(`
      *,
      property_images!property_images_property_id_fkey(
        url,
        alt_text,
        is_primary
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching properties for daily rotation:', error);
    throw error;
  }

  if (!allProperties || allProperties.length === 0) {
    return [];
  }

  // Create a deterministic shuffle based on today's date
  const shuffleArray = <T>(array: T[], seed: number): T[] => {
    const shuffled = [...array];
    let currentIndex = shuffled.length;
    let randomValue = seed;

    // Simple seeded random number generator
    const seededRandom = () => {
      randomValue = (randomValue * 9301 + 49297) % 233280;
      return randomValue / 233280;
    };

    while (currentIndex !== 0) {
      const randomIndex = Math.floor(seededRandom() * currentIndex);
      currentIndex--;
      [shuffled[currentIndex], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[currentIndex],
      ];
    }
    return shuffled;
  };

  // Shuffle properties based on today's date and take the limit
  const shuffledProperties = shuffleArray(allProperties, dateSeed);
  const featuredForToday = shuffledProperties.slice(0, limit);

  return featuredForToday.map(row => {
    const primaryImage = row.property_images?.find((img: { url: string; alt_text: string; is_primary: boolean }) => img.is_primary);
    return convertToProperty({
      ...row,
      primary_image_url: primaryImage?.url,
      primary_image_alt: primaryImage?.alt_text
    });
  });
}

// Get today's date string for consistent daily rotation
export function getTodaysDateSeed(): string {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD format
}

// Check if a property is featured for today (used for UI display)
export async function isPropertyFeaturedToday(propertyId: string): Promise<boolean> {
  const todaysFeatured = await getFeaturedProperties(50); // Get more to check against
  return todaysFeatured.some(property => property.id === propertyId);
}

// Get property by slug
export async function getPropertyBySlug(slug: string) {
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      property_images(*)
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching property by slug:', error);
    throw error;
  }

  if (!data) return null;

  const property = convertToProperty(data);
  return {
    ...property,
    images: data.property_images?.map((img: { url: string }) => img.url) || [],
  };
}

// Get property by ID (kept for backward compatibility)
export async function getPropertyById(id: string) {
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      property_images(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching property:', error);
    throw error;
  }

  if (!data) return null;

  const property = convertToProperty(data);
  return {
    ...property,
    images: data.property_images?.map((img: { url: string }) => img.url) || [],
  };
}

// Create new property
export async function createProperty(property: Omit<PropertyInsert, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('properties')
    .insert(property)
    .select()
    .single();

  if (error) {
    console.error('Error creating property:', error);
    throw error;
  }

  return data;
}

// Update property
export async function updateProperty(id: string, updates: PropertyUpdate) {
  const { data, error } = await supabase
    .from('properties')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating property:', error);
    throw error;
  }

  return data;
}

// Delete property
export async function deleteProperty(id: string) {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
}

// Add property to favorites
export async function addToFavorites(propertyId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('favorites')
    .insert({
      user_id: user.id,
      property_id: propertyId,
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }

  return data;
}

// Remove property from favorites
export async function removeFromFavorites(propertyId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', user.id)
    .eq('property_id', propertyId);

  if (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
}

// Check if property is in user's favorites
export async function isPropertyFavorited(propertyId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return false;

  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('property_id', propertyId)
    .limit(1);

  if (error) {
    console.error('Error checking favorites:', error);
    return false;
  }

  return data && data.length > 0;
}

// Batch check multiple properties for favorites (more efficient)
export async function getBatchFavoritesStatus(propertyIds: string[], userId?: string): Promise<Record<string, boolean>> {
  if (!userId || propertyIds.length === 0) {
    return propertyIds.reduce((acc, id) => ({ ...acc, [id]: false }), {});
  }

  const { data, error } = await supabase
    .from('favorites')
    .select('property_id')
    .eq('user_id', userId)
    .in('property_id', propertyIds);

  if (error) {
    console.error('Error checking batch favorites:', error);
    return propertyIds.reduce((acc, id) => ({ ...acc, [id]: false }), {});
  }

  // Create a map of favorited properties
  const favoritedIds = new Set(data?.map(fav => fav.property_id) || []);
  
  return propertyIds.reduce((acc, id) => ({
    ...acc,
    [id]: favoritedIds.has(id)
  }), {});
}

// Get user's favorite properties
export async function getUserFavorites() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  // First get favorite property IDs
  const { data: favoriteIds, error: favError } = await supabase
    .from('favorites')
    .select('property_id')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (favError) {
    console.error('Error fetching user favorites:', favError);
    throw favError;
  }

  if (!favoriteIds || favoriteIds.length === 0) {
    return [];
  }

  // Then get the actual properties
  const propertyIds = favoriteIds.map(fav => fav.property_id);
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      property_images!property_images_property_id_fkey(
        url,
        alt_text,
        is_primary
      )
    `)
    .in('id', propertyIds);

  if (error) {
    console.error('Error fetching favorite properties:', error);
    throw error;
  }

  return data?.map(row => {
    const primaryImage = row.property_images?.find((img: { url: string; alt_text: string; is_primary: boolean }) => img.is_primary);
    return convertToProperty({
      ...row,
      primary_image_url: primaryImage?.url,
      primary_image_alt: primaryImage?.alt_text
    });
  }) || [];
}

// Search properties
export async function searchProperties(query: string, filters?: {
  propertyType?: string;
  transactionType?: string;
  minPrice?: number;
  maxPrice?: number;
  rooms?: number;
}) {
  let supabaseQuery = supabase
    .from('properties')
    .select(`
      *,
      property_images!property_images_property_id_fkey(
        url,
        alt_text,
        is_primary
      )
    `)
    .or(`title.ilike.%${query}%,description.ilike.%${query}%,location.ilike.%${query}%`)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (filters?.propertyType) {
    supabaseQuery = supabaseQuery.eq('property_type', filters.propertyType);
  }

  if (filters?.transactionType) {
    supabaseQuery = supabaseQuery.eq('transaction_type', filters.transactionType);
  }

  if (filters?.minPrice) {
    supabaseQuery = supabaseQuery.gte('price', filters.minPrice);
  }

  if (filters?.maxPrice) {
    supabaseQuery = supabaseQuery.lte('price', filters.maxPrice);
  }

  if (filters?.rooms) {
    supabaseQuery = supabaseQuery.eq('rooms', filters.rooms);
  }

  const { data, error } = await supabaseQuery;

  if (error) {
    console.error('Error searching properties:', error);
    throw error;
  }

  return data?.map(row => {
    const primaryImage = row.property_images?.find((img: { url: string; alt_text: string; is_primary: boolean }) => img.is_primary);
    return convertToProperty({
      ...row,
      primary_image_url: primaryImage?.url,
      primary_image_alt: primaryImage?.alt_text
    });
  }) || [];
}