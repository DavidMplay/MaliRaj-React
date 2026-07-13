import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names safely, resolving conflicting utility classes. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as EUR currency, e.g. 8.9 -> "8,90 €" */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value);
}

/** Returns true if the restaurant is currently open, based on restaurant.hours */
export function isOpenNow(
  hours: readonly { day: string; open: string; close: string }[]
): boolean {
  const days = [
    "Nedjelja",
    "Ponedjeljak",
    "Utorak",
    "Srijeda",
    "Četvrtak",
    "Petak",
    "Subota",
  ];
  const now = new Date();
  const todayName = days[now.getDay()];
  const today = hours.find((h) => h.day === todayName);
  if (!today) return false;

  const [openH, openM] = today.open.split(":").map(Number);
  const [closeH, closeM] = today.close.split(":").map(Number);
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const openMinutes = (openH ?? 0) * 60 + (openM ?? 0);
  const closeMinutes = (closeH ?? 0) * 60 + (closeM ?? 0);

  return minutesNow >= openMinutes && minutesNow < closeMinutes;
}
