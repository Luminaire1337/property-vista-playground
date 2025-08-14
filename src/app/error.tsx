"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Animated error icon */}
        <div className="relative mb-8">
          <div className="text-8xl font-bold text-red-200 animate-pulse">
            500
          </div>
        </div>

        {/* Error message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Ups! Coś poszło nie tak
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          Wystąpił nieoczekiwany błąd w aplikacji. Nasze zespół został
          automatycznie powiadomiony. Spróbuj ponownie lub wróć na stronę
          główną.
        </p>

        {/* Error details (dev mode) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-sm text-red-800 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                ID błędu: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-4">
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            onClick={reset}
          >
            🔄 Spróbuj ponownie
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => (window.location.href = "/")}
          >
            🏡 Powrót na stronę główną
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="mt-12 flex justify-center space-x-2">
          <div
            className="w-2 h-2 bg-red-300 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-2 h-2 bg-red-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
