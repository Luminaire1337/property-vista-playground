"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-8xl font-bold text-green-200 animate-pulse">
            404
          </div>
        </div>

        {/* Error message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Strona nie została znaleziona
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          Niestety, ta strona nie istnieje. Może została przeniesiona lub
          usunięta. Sprawdź adres URL lub wróć na stronę główną.
        </p>

        {/* Action buttons */}
        <div className="space-y-4">
          <Link href="/">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            >
              🏡 Powrót na stronę główną
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => window.history.back()}
          >
            ⬅️ Wróć do poprzedniej strony
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="mt-12 flex justify-center space-x-2">
          <div
            className="w-2 h-2 bg-green-300 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
