import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function parseSubastaDateToMs(dateValue) {
  if (!dateValue) return NaN;

  if (dateValue instanceof Date) {
    return dateValue.getTime();
  }

  const normalized = String(dateValue).trim();
  const match = normalized.match(/^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})(?::(\d{2}))?/);

  if (match) {
    const [, year, month, day, hour, minute, second = "00"] = match;
    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second)
    ).getTime();
  }

  return new Date(normalized).getTime();
}
