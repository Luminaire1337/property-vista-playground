'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { ContactForm } from '@/components/ui/ContactForm';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Ruler, 
  Phone, 
  Mail,
  User,
  Eye,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { Property } from '@/types/property';
import { getPropertyBySlug, addToFavorites, removeFromFavorites, isPropertyFavorited, getProperties, incrementPropertyViews } from '@/lib/properties';
import { useAuth } from '@/contexts/AuthContext';

interface PropertyOwner {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  avatar_url?: string;
}

interface PropertyWithOwner extends Property {
  owner: PropertyOwner | null;
}

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  
  const [property, setProperty] = useState<PropertyWithOwner | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const propertySlug = params.slug as string;

  // Handle back to search with preserved filters
  const handleBackToSearch = () => {
    const fromSearch = searchParams.get('from') === 'search';
    if (fromSearch) {
      // Create search params excluding the 'from' parameter
      const searchParamsObj = new URLSearchParams(searchParams.toString());
      searchParamsObj.delete('from');
      const preservedParams = searchParamsObj.toString();
      
      const searchUrl = preservedParams ? `/szukaj?${preservedParams}` : '/szukaj';
      router.push(searchUrl);
    } else {
      // Fallback to basic search page if not from search
      router.push('/szukaj');
    }
  };

  const loadPropertyDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Load property details with owner info
      const propertyData = await getPropertyBySlug(propertySlug);
      if (!propertyData) {
        setError('Nieruchomość nie została znaleziona');
        return;
      }

      // Increment view counter
      await incrementPropertyViews(propertyData.id);

      setProperty(propertyData as PropertyWithOwner);

      // Check if favorited
      if (user) {
        const favorited = await isPropertyFavorited(propertyData.id);
        setIsFavorited(favorited);
      }

      // Load similar properties
      const similar = await getProperties({
        propertyType: propertyData.propertyType,
        transactionType: propertyData.transactionType,
        limit: 4
      });
      setSimilarProperties(similar.filter(p => p.id !== propertyData.id));

    } catch (error) {
      console.error('Error loading property details:', error);
      setError('Wystąpił błąd podczas ładowania szczegółów nieruchomości');
    } finally {
      setLoading(false);
    }
  }, [propertySlug, user]);

  useEffect(() => {
    if (propertySlug) {
      loadPropertyDetails();
    }
  }, [propertySlug, loadPropertyDetails]);

  const handleFavorite = async () => {
    if (!user) {
      // TODO: Open auth modal
      return;
    }

    try {
      if (isFavorited) {
        await removeFromFavorites(property!.id);
        setIsFavorited(false);
      } else {
        await addToFavorites(property!.id);
        setIsFavorited(true);
      }
    } catch (error) {
      console.error('Error handling favorite:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share && property) {
      try {
        await navigator.share({
          title: property.title,
          text: property.description,
          url: window.location.href,
        });
      } catch {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const nextImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ładowanie szczegółów nieruchomości...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-6">🏠</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Nieruchomość nie znaleziona'}
          </h1>
          <p className="text-gray-600 mb-6">
            Sprawdź adres URL lub wróć do wyszukiwania nieruchomości.
          </p>
          <div className="space-y-3">
            <Link href="/szukaj">
              <Button className="w-full">
                Szukaj nieruchomości
              </Button>
            </Link>
            <Button variant="outline" onClick={handleBackToSearch}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Wróć do wyszukiwania
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleBackToSearch}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Wróć do wyników
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Udostępnij
              </Button>
              <Button
                variant={isFavorited ? "default" : "outline"}
                onClick={handleFavorite}
              >
                <Heart className={`w-4 h-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                {isFavorited ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              {property.images.length > 0 ? (
                <div className="relative">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out h-full"
                      style={{ 
                        transform: `translateX(-${currentImageIndex * 100}%)`,
                        width: `${property.images.length * 100}%`
                      }}
                    >
                      {property.images.map((image, index) => (
                        <div key={index} className="relative flex-shrink-0 w-full h-full">
                          <Image
                            src={image}
                            alt={`${property.title} - ${index + 1}`}
                            fill
                            className="object-cover cursor-pointer"
                            onClick={() => setShowImageModal(true)}
                            priority={index === 0}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                </div>
              ) : (
                <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">🏠</div>
                    <p>Brak zdjęć</p>
                  </div>
                </div>
              )}

              {/* Thumbnail Strip */}
              {property.images.length > 1 && (
                <div className="p-4 bg-gray-50">
                  <div className="flex space-x-2 overflow-x-auto">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-24 h-16 relative rounded-md overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                          index === currentImageIndex ? 'border-green-500 shadow-md' : 'border-gray-200'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${property.title} - ${index + 1}`}
                          width={96}
                          height={72}
                          className="w-full h-full object-cover rounded-sm"
                          sizes="96px"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Property Title and Location */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 break-words">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span className="text-lg break-words">{property.location}</span>
                  </div>
                </div>
                <div className="text-left lg:text-right flex-shrink-0">
                  <div className="text-2xl md:text-3xl font-bold text-green-600 whitespace-nowrap">
                    {property.price.toLocaleString('pl-PL')} zł
                  </div>
                  <div className="text-gray-500 whitespace-nowrap">
                    {property.pricePerM2.toLocaleString('pl-PL')} zł/m²
                  </div>
                </div>
              </div>

              {/* Property Stats */}
              <div className="flex flex-wrap gap-6 py-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <Ruler className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">{property.area}m²</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bed className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">{property.rooms} pokoje</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">{property.bathrooms} łazienka</span>
                </div>
                {property.parking > 0 && (
                  <div className="flex items-center space-x-2">
                    <Car className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{property.parking} miejsce parkingowe</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">{property.views} wyświetleń</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Opis</h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                {property.description}
              </div>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Udogodnienia</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Contact and Details */}
          <div className="space-y-6">
            {/* Owner Contact */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Kontakt z właścicielem</h3>
              
              {property.owner ? (
                <>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 relative rounded-full overflow-hidden bg-gray-200">
                      {property.owner.avatar_url ? (
                        <Image
                          src={property.owner.avatar_url}
                          alt={property.owner.full_name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{property.owner.full_name}</h4>
                      <p className="text-sm text-gray-500">Właściciel nieruchomości</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {property.owner.phone && (
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <a 
                          href={`tel:${property.owner.phone}`}
                          className="text-green-600 hover:text-green-700 font-medium"
                        >
                          {property.owner.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <a 
                        href={`mailto:${property.owner.email}`}
                        className="text-green-600 hover:text-green-700"
                      >
                        {property.owner.email}
                      </a>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {property.owner.phone && (
                      <Button 
                        className="w-full"
                        onClick={() => window.open(`tel:${property.owner?.phone}`)}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Zadzwoń teraz
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setShowContactForm(true)}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Wyślij wiadomość
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Informacje o właścicielu nie są dostępne</p>
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Szczegóły</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Typ nieruchomości</span>
                  <span className="font-medium capitalize">{property.propertyType}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Typ transakcji</span>
                  <span className="font-medium capitalize">{property.transactionType}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Powierzchnia</span>
                  <span className="font-medium">{property.area}m²</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Liczba pokoi</span>
                  <span className="font-medium">{property.rooms}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Łazienki</span>
                  <span className="font-medium">{property.bathrooms}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Parking</span>
                  <span className="font-medium">
                    {property.parking > 0 ? `${property.parking} miejsce` : 'Brak'}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Data dodania</span>
                  <span className="font-medium">
                    {new Date(property.createdAt).toLocaleDateString('pl-PL')}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Podobne nieruchomości</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProperties.map((similarProperty) => (
                <PropertyCard
                  key={similarProperty.id}
                  property={similarProperty}
                  onFavorite={() => {}} // TODO: Implement
                  onViewDetails={() => {
                    const fromSearch = searchParams.get('from') === 'search';
                    if (fromSearch) {
                      // Pass the same search context to similar properties
                      const url = `/nieruchomosci/${similarProperty.slug}?${searchParams.toString()}`;
                      router.push(url);
                    } else {
                      router.push(`/nieruchomosci/${similarProperty.slug}`);
                    }
                  }}
                  isFavorited={false}
                  isDailyFeatured={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {showImageModal && property.images.length > 0 && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative">
              <Image
                src={property.images[currentImageIndex]}
                alt={property.title}
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain"
              />
              
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      <ContactForm
        propertyTitle={property.title}
        ownerName={property.owner?.full_name || 'Właściciel'}
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
      />
      </div>
      <Footer />
    </div>
  );
}