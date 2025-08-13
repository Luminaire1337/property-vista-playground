"use client";

import {
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Logo size={32} />
              <span className="text-xl font-bold text-white">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Twój zaufany partner w znalezieniu idealnego domu. Łączymy
              kupujących, sprzedających i wynajmujących z najlepszymi
              nieruchomościami w całej Polsce.
            </p>
            <div className="flex space-x-4">
              <a
                href={siteConfig.social.facebook}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={siteConfig.social.instagram}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.987 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.648.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447c0-1.297.49-2.448 1.297-3.323.875-.875 2.026-1.365 3.323-1.365 1.297 0 2.448.49 3.323 1.365.875.875 1.365 2.026 1.365 3.323 0 1.297-.49 2.448-1.365 3.323-.875.875-2.026 1.365-3.323 1.365zm7.718-6.541c-1.297 0-2.448-.49-3.323-1.297C11.916 8.275 11.426 7.124 11.426 5.827c0-1.297.49-2.448 1.297-3.323C13.598 1.629 14.749 1.139 16.046 1.139c1.297 0 2.448.49 3.323 1.365.875.875 1.365 2.026 1.365 3.323 0 1.297-.49 2.448-1.365 3.323-.875.875-2.026 1.365-3.323 1.365z"/>
                </svg>
              </a>
              <a
                href={siteConfig.social.linkedin}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Szybkie Linki
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Kup Nieruchomość
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Wynajmij Nieruchomość
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Sprzedaj Nieruchomość
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Znajdź Agenta
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Wycena Nieruchomości
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Kalkulator Kredytu
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Firma</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  O nas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Kariera
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Prasa i Media
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Partnerstwa
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Polityka Prywatności
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Regulamin
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Wsparcie</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Centrum Pomocy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Kontakt
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Czat na żywo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Zgłoś problem
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Opinia
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 pt-8 border-t border-gray-800">
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Skontaktuj się z nami
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-400" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400" />
                <span>{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-400" />
                <span>{siteConfig.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Bądź na bieżąco
            </h3>
            <p className="text-gray-400 mb-4">
              Otrzymuj najnowsze informacje o nieruchomościach i analizy rynku
              prosto na swoją skrzynkę.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Wprowadź swój email"
                className="flex-1 h-9 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Button variant="hero" size="sm" className="h-9">
                Subskrybuj
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} {siteConfig.name}. Wszystkie prawa
            zastrzeżone.
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="hover:text-green-400 transition-colors">
              Prywatność
            </a>
            <a href="#" className="hover:text-green-400 transition-colors">
              Regulamin
            </a>
            <a href="#" className="hover:text-green-400 transition-colors">
              Cookies
            </a>
            <a href="#" className="hover:text-green-400 transition-colors">
              Mapa strony
            </a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
