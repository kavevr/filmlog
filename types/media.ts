import type { LucideIcon } from "lucide-react";

/** Available accent color variants used across the app */
export type AccentColor = "cyan" | "purple" | "rose" | "pink" | "amber";

/** A media entry (movie, TV show, anime, etc.) */
export interface MediaItem {
  title: string;
  year: string;
  rating: string;
  genre: string;
  /** Tailwind gradient class for the poster placeholder */
  poster: string;
  /** Director name (movies) */
  director?: string;
  /** Number of seasons (TV shows) */
  seasons?: number;
  /** Number of episodes (TV shows) */
  episodes?: number;
  /** Visual accent color */
  accent: AccentColor;
  /** Card display variant */
  variant?: "default" | "adult";
}

/** A recently-watched entry shown in the activity feed */
export interface RecentEntry {
  title: string;
  date: string;
  rating: string;
}

/** A stat display item on the home page */
export interface StatItem {
  label: string;
  value: string;
  icon: LucideIcon;
}

/** A navigation link item */
export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}
