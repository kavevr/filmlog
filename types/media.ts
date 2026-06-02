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
  /** Link to detail page */
  detailHref?: string;
}

/** ── Rich Movie Detail (matching backend JSON schema) ── */

export interface Person {
  person_id: number;
  name: string;
  sequence?: number;
}

export interface CastAndCrew {
  directors: Person[];
  writers: Person[];
  actors: Person[];
}

export interface MovieTitles {
  main_title: string;
  aka: string[];
}

export interface MovieDetail {
  movie_id: number;
  imdb_id: string;
  poster_url: string;
  duration_minutes: number;
  region_of_origin: string;
  original_language: string;
  release_date: string;
  titles: MovieTitles;
  genres: string[];
  cast_and_crew: CastAndCrew;
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
