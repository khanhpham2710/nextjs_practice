import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDate, formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeDate(form: Date) {
  const currentDate = new Date();
  if (currentDate.getTime() - form.getTime() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(form, { addSuffix: true });
  } else {
    if (currentDate.getFullYear() === form.getFullYear()) {
      return formatDate(form, "MMM d");
    } else {
      return formatDate(form, "MMM d, yyy");
    }
  }
}

export function formatNumber(n: number): string {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}
