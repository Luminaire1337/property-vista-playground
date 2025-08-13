import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Polish-specific formatting functions
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPricePerM2(pricePerM2: number): string {
  return (
    new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(pricePerM2) + "/m²"
  );
}

export function formatArea(area: number): string {
  return `${area} m²`;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("pl-PL").format(num);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function getPropertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    mieszkanie: "Mieszkanie",
    dom: "Dom",
    lokal: "Lokal komercyjny",
    działka: "Działka",
    garaż: "Garaż",
  };
  return labels[type] || type;
}

export function getTransactionTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    sprzedaż: "Sprzedaż",
    wynajem: "Wynajem",
    kupno: "Kupno",
  };
  return labels[type] || type;
}
