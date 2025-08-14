"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";

export function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3 flex-1">
            <Cookie className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Ta strona używa plików cookie</p>
              <p className="text-gray-600">
                Używamy plików cookie do analizy ruchu oraz personalizacji treści. 
                Kontynuując korzystanie ze strony, wyrażasz zgodę na ich użycie.{" "}
                <a 
                  href="/polityka-prywatnosci" 
                  className="text-green-600 hover:text-green-700 underline font-medium"
                >
                  Dowiedz się więcej
                </a>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={declineCookies}
              className="text-gray-600 hover:text-gray-700"
            >
              Odrzuć
            </Button>
            <Button
              size="sm"
              onClick={acceptCookies}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Akceptuj wszystkie
            </Button>
            <button
              onClick={declineCookies}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Zamknij powiadomienie o cookies"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}