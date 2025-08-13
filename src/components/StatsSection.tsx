import { Users, Home, Award, Shield } from "lucide-react";
import { siteConfig } from "@/config/site";

const stats = [
  {
    icon: Home,
    number: `${siteConfig.features.maxProperties.toLocaleString("pl-PL")}+`,
    label: "Nieruchomości",
    description: "W całej Polsce",
  },
  {
    icon: Users,
    number: `${siteConfig.features.maxUsers.toLocaleString("pl-PL")}+`,
    label: "Zadowolonych Klientów",
    description: "Ufa nam ze swoimi domami",
  },
  {
    icon: Award,
    number: `${siteConfig.features.yearsExperience}+`,
    label: "Lat Doświadczenia",
    description: "Na rynku nieruchomości",
  },
  {
    icon: Shield,
    number: `${siteConfig.features.successRate}%`,
    label: "Wskaźnik Sukcesu",
    description: "Transakcji nieruchomości",
  },
];

export function StatsSection() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-green-600 to-green-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Dlaczego Warto Wybrać PropertyVista?
          </h2>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Nie jesteśmy kolejną platformą nieruchomości. Jesteśmy Twoim
            zaufanym partnerem w znalezieniu idealnego domu.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 group-hover:bg-white/30 transition-colors">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-white mb-2">
                {stat.label}
              </div>
              <div className="text-green-100 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white/10 rounded-2xl px-8 py-6 backdrop-blur-sm">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Wsparcie Klienta 24/7</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <div
                className="w-3 h-3 bg-green-300 rounded-full animate-pulse"
                style={{ animationDelay: "300ms" }}
              ></div>
              <span className="text-sm font-medium">Bezpieczne Transakcje</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <div
                className="w-3 h-3 bg-green-300 rounded-full animate-pulse"
                style={{ animationDelay: "700ms" }}
              ></div>
              <span className="text-sm font-medium">Zweryfikowane Oferty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
      <div
        className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full animate-pulse"
        style={{ animationDelay: "1000ms" }}
      ></div>
    </section>
  );
}
