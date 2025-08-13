export const siteConfig = {
  name: "PropertyVista",
  description: "Twoja zaufana platforma nieruchomości w Polsce",
  url: "https://propertyvista.pl",
  ogImage: "https://propertyvista.pl/og.jpg",
  links: {
    twitter: "https://twitter.com/propertyvista",
    github: "https://github.com/propertyvista",
  },
  contact: {
    email: "kontakt@propertyvista.pl",
    phone: "+48 123 456 789",
    address: "ul. Nieruchomości 1, 00-001 Warszawa",
  },
  social: {
    facebook: "https://facebook.com/propertyvista",
    instagram: "https://instagram.com/propertyvista",
    linkedin: "https://linkedin.com/company/propertyvista",
  },
  features: {
    maxProperties: 50000,
    maxUsers: 100000,
    yearsExperience: 15,
    successRate: 99.9,
  },
  propertyTypes: [
    { value: "mieszkanie", label: "Mieszkanie", icon: "apartment" },
    { value: "dom", label: "Dom", icon: "house" },
    { value: "lokal", label: "Lokal komercyjny", icon: "store" },
    { value: "działka", label: "Działka", icon: "land" },
    { value: "garaż", label: "Garaż", icon: "garage" },
  ],
  searchOptions: {
    propertyTypes: [
      { value: "mieszkanie", label: "Mieszkanie" },
      { value: "dom", label: "Dom" },
      { value: "lokal", label: "Lokal komercyjny" },
      { value: "działka", label: "Działka" },
      { value: "garaż", label: "Garaż" },
    ],
    transactionTypes: [
      { value: "sprzedaż", label: "Sprzedaż" },
      { value: "wynajem", label: "Wynajem" },
      { value: "kupno", label: "Kupno" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
