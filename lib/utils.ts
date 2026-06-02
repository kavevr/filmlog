import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Derive a stable loliapi.com image URL from a numeric ID.
 *  The API has 699 images; we map the title ID to [1, 699]. */
export function posterImageUrl(id: number): string {
  const apiId = ((id * 17) % 699) + 1;
  return `https://www.loliapi.com/acg/pc/?id=${apiId}`;
}
