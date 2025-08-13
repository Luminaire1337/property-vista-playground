import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { StatsSection } from "@/components/StatsSection";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PropertyVista - Znajdź Swoją Wymarzoną Nieruchomość w Polsce",
  description: "Platforma PropertyVista to najlepsze miejsce do znalezienia nieruchomości w Polsce. Ponad 50,000 ofert mieszkań, domów i lokali komercyjnych na sprzedaż i wynajem w Warszawie, Krakowie, Gdańsku i całej Polsce.",
  keywords: "nieruchomości Polska, mieszkania na sprzedaż, domy na wynajem, PropertyVista, agent nieruchomości, mieszkania Warszawa, domy Kraków",
  openGraph: {
    title: "PropertyVista - Znajdź Swoją Wymarzoną Nieruchomość w Polsce",
    description: "Ponad 50,000 ofert nieruchomości w Polsce. Znajdź swoje wymarzone mieszkanie, dom lub lokal komercyjny.",
    type: "website",
  },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PropertyVista",
    "url": "https://propertyvista.pl",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://propertyvista.pl/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main>
        <HeroSection />
        <FeaturedProperties />
        <StatsSection />
      </main>
      <Footer />
    </div>
  );
}
