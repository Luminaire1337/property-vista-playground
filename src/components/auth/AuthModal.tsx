"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Card components replaced with custom divs for better visibility
import { Mail, Lock, User, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "signin" | "signup";
}

export function AuthModal({
  isOpen,
  onClose,
  defaultMode = "signin",
}: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { signIn, signUp, signInWithGoogle } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let result;
      if (mode === "signin") {
        result = await signIn(email, password);
      } else {
        result = await signUp(email, password, fullName);
      }

      if (result.error) {
        setError(result.error.message);
      } else {
        if (mode === "signup") {
          // For signup, always show this message regardless of whether email exists
          // This is a security best practice to prevent email enumeration
          setSuccess("Jeśli email nie istnieje w systemie, konto zostało utworzone. Sprawdź swoją skrzynkę email, aby zweryfikować konto lub się zalogować.");
          // Don't close modal immediately for signup - let user see the message
          setTimeout(() => {
            onClose();
            // Reset form
            setEmail("");
            setPassword("");
            setFullName("");
            setSuccess("");
          }, 4000);
        } else {
          onClose();
          // Reset form
          setEmail("");
          setPassword("");
          setFullName("");
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError("Wystąpił nieoczekiwany błąd");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await signInWithGoogle();
      if (result.error) {
        setError(result.error.message);
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError("Wystąpił nieoczekiwany błąd");
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl border border-gray-200 relative">
        {/* Force white background and ensure visibility */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px' }} className="w-full">
        {/* Close button inside modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex flex-col space-y-1.5 p-6 text-center">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            {mode === "signin" ? "Zaloguj się" : "Zarejestruj się"}
          </h3>
          <p className="text-sm text-gray-600">
            {mode === "signin"
              ? "Zaloguj się do swojego konta"
              : "Utwórz nowe konto"}
          </p>
        </div>

        <div className="p-6 pt-0 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Imię i nazwisko"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Hasło"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            
            {success && (
              <div className="text-green-600 text-sm text-center">{success}</div>
            )}

            <Button type="submit" variant="default" className="w-full" disabled={loading}>
              {loading
                ? "Ładowanie..."
                : mode === "signin"
                ? "Zaloguj się"
                : "Zarejestruj się"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Lub</span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full"
          >
            🔗 Kontynuuj z Google
          </Button>

          <div className="text-center text-sm">
            {mode === "signin" ? (
              <span>
                Nie masz konta?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-green-600 hover:underline"
                >
                  Zarejestruj się
                </button>
              </span>
            ) : (
              <span>
                Masz już konto?{" "}
                <button
                  onClick={() => setMode("signin")}
                  className="text-green-600 hover:underline"
                >
                  Zaloguj się
                </button>
              </span>
            )}
          </div>
        </div>
        </div>
      </div>

    </div>
  );
}
