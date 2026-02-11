import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isoDate(value: string | null) {
  if (!value) return '—';
  return new Date(value).toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
}
