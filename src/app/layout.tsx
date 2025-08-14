import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CookieNotice } from "@/components/ui/CookieNotice";
import { siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name + " - Platforma Nieruchomości",
    template: `%s | ${siteConfig.name}`,
  },
  description: "Twoja zaufana platforma nieruchomości w Polsce. Znajdź swoje wymarzone mieszkanie, dom lub lokal. Ponad 50,000 ofert nieruchomości na sprzedaż i wynajem w całej Polsce.",
  keywords: [
    "nieruchomości",
    "mieszkania",
    "domy",
    "sprzedaż",
    "wynajem",
    "Polska",
    "Warszawa",
    "Kraków",
    "Gdańsk",
    "Wrocław",
    "Poznań",
    "łódź",
    "agent nieruchomości",
    "działki",
    "lokale komercyjne",
    "garaże",
    "PropertyVista",
  ],
  authors: [{ name: "PropertyVista Team" }],
  creator: "PropertyVista",
  publisher: "PropertyVista",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: siteConfig.url,
    title: siteConfig.name + " - Platforma Nieruchomości",
    description: "Twoja zaufana platforma nieruchomości w Polsce. Znajdź swoje wymarzone mieszkanie, dom lub lokal.",
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: siteConfig.name + " - Platforma Nieruchomości",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name + " - Platforma Nieruchomości",
    description: "Twoja zaufana platforma nieruchomości w Polsce. Znajdź swoje wymarzone mieszkanie, dom lub lokal.",
    images: ['/og-image.png'],
    creator: "@propertyvista",
    site: "@propertyvista",
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
      { url: '/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: siteConfig.url,
  },
  category: 'Real Estate',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#10b981' },
    { media: '(prefers-color-scheme: dark)', color: '#059669' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": siteConfig.name,
    "description": "Twoja zaufana platforma nieruchomości w Polsce. Znajdź swoje wymarzone mieszkanie, dom lub lokal.",
    "url": siteConfig.url,
    "logo": siteConfig.url + "/icon-512.svg",
    "image": siteConfig.url + "/og-image.png",
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ul. Nieruchomości 1",
      "addressLocality": "Warszawa",
      "postalCode": "00-001",
      "addressCountry": "PL"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Poland"
    },
    "serviceType": [
      "Real Estate Sales",
      "Real Estate Rentals",
      "Property Management",
      "Real Estate Consultation"
    ],
    "sameAs": [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.linkedin
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "2547",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <html lang="pl" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
          <CookieNotice />
        </AuthProvider>
      </body>
    </html>
  );
}
