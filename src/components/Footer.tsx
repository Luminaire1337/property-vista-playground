"use client";

import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Minimal Footer Content */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Logo size={24} />
            <span className="text-lg font-bold text-white">
              {siteConfig.name}
            </span>
          </div>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Eksperymentalny projekt testowy do celów edukacyjnych i badawczych.
          </p>
        </div>

        {/* Legal Links */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-800">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} {siteConfig.name}. Wszystkie prawa zastrzeżone.
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <a href="/polityka-prywatnosci" className="hover:text-green-400 transition-colors">
              Polityka Prywatności
            </a>
            <a href="/regulamin" className="hover:text-green-400 transition-colors">
              Regulamin
            </a>
            <a href="/gdpr" className="hover:text-green-400 transition-colors">
              GDPR
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
