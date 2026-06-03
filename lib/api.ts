/**
 * Backend API client for FilmLog.
 * Base URL: http://localhost:5000
 */

/* ── API response types ── */

export interface ApiMovieListItem {
  id: string;
  name: string;
  image: string;
  "@type": string;
}

export interface ApiPerson {
  "@type": "Person";
  name: string;
  url: string;
}

export interface ApiAggregateRating {
  "@type": "AggregateRating";
  ratingCount: string;
  bestRating: string;
  worstRating: string;
}

export interface ApiMovieDetail {
  "@context": string;
  name: string;
  url: string;
  image: string;
  director: ApiPerson[];
  author: ApiPerson[];
  actor: ApiPerson[];
  datePublished: string;
  genre: string[];
  duration: string;
  description: string;
  "@type": string;
  aggregateRating: ApiAggregateRating;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
}

export interface ApiDetailResponse<T> {
  success: boolean;
  data: T;
}

/* ── API base URL ── */

const API_BASE = "http://localhost:5000";

/* ── Fetch helpers ── */

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    // Revalidate every 60s; useful when admin edits details
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText} for ${url}`);
  }
  return res.json();
}

/* ── Public API functions ── */

/** Fetch the full movie list (id, name, image). */
export async function fetchMovieList(): Promise<ApiListResponse<ApiMovieListItem>> {
  return fetchJson<ApiListResponse<ApiMovieListItem>>(`${API_BASE}/api/movies`);
}

/** Fetch a single movie's rich detail. */
export async function fetchMovieDetail(
  id: string,
): Promise<ApiDetailResponse<ApiMovieDetail>> {
  return fetchJson<ApiDetailResponse<ApiMovieDetail>>(`${API_BASE}/api/movie/${id}`);
}

/* ── Duration parser ── */

/** Convert ISO 8601 duration (e.g. "PT1H54M") to minutes. */
export function parseDuration(iso: string): number {
  const h = iso.match(/(\d+)H/);
  const m = iso.match(/(\d+)M/);
  return (h ? parseInt(h[1], 10) * 60 : 0) + (m ? parseInt(m[1], 10) : 0);
}

/* ── Mappers: API → app types ── */

import type { MediaItem, MovieDetail } from "@/types/media";

/**
 * Map an API list item to a MediaItem.
 * The `poster` field receives the real image URL (MediaCard will detect it).
 */
export function apiListItemToMediaItem(item: ApiMovieListItem): MediaItem {
  return {
    title: item.name,
    year: "", // list endpoint doesn't include datePublished
    rating: "", // list endpoint doesn't include rating
    genre: "",
    poster: item.image, // real image URL — MediaCard handles this
    accent: "cyan",
    detailHref: `/title/${item.id}`,
  };
}

/**
 * Map an API detail response to a MovieDetail (for the rich detail page / store).
 */
export function apiDetailToMovieDetail(
  id: string,
  detail: ApiMovieDetail,
): MovieDetail {
  const movieId = parseInt(id, 10);

  return {
    movie_id: isNaN(movieId) ? 0 : movieId,
    imdb_id: "",
    poster_url: detail.image,
    duration_minutes: parseDuration(detail.duration),
    region_of_origin: "",
    original_language: "",
    release_date: detail.datePublished,
    titles: {
      main_title: detail.name,
      aka: [],
    },
    genres: detail.genre,
    cast_and_crew: {
      directors: detail.director?.map((d, i) => ({
        person_id: movieId * 100 + i,
        name: d.name,
      })) ?? [],
      writers: detail.author?.map((a, i) => ({
        person_id: movieId * 100 + i + 50,
        name: a.name,
      })) ?? [],
      actors: detail.actor?.map((a, i) => ({
        person_id: movieId * 100 + i + 100,
        name: a.name,
        sequence: i + 1,
      })) ?? [],
    },
    description: detail.description,
  };
}

/**
 * Enrich a MediaItem from an API detail response.
 * Fills in year, rating, genre, director fields that are missing from the list.
 */
export function enrichMediaItem(
  item: MediaItem,
  detail: ApiMovieDetail,
): MediaItem {
  return {
    ...item,
    year: detail.datePublished?.slice(0, 4) ?? item.year,
    rating: detail.aggregateRating
      ? `${detail.aggregateRating.ratingCount} 人评价`
      : item.rating,
    genre: detail.genre?.join(" / ") ?? item.genre,
    director: detail.director?.[0]?.name ?? item.director,
    poster: detail.image || item.poster,
  };
}
