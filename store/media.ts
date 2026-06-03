"use client";

import { create } from "zustand";
import type { MediaItem, RecentEntry, MovieDetail } from "@/types/media";
import {
  moviesData,
  tvData,
  animeData,
  adultAnimeData,
  adultAmateurData,
  onlyfansData,
  featuredItems,
  recentEntries,
} from "@/data/media";
import { movieDetails as initialMovieDetails } from "@/data/movie-details";
import {
  fetchMovieList,
  fetchMovieDetail,
  apiListItemToMediaItem,
  apiDetailToMovieDetail,
  enrichMediaItem,
} from "@/lib/api";

export type MediaCategory =
  | "movies"
  | "tv"
  | "anime"
  | "adultAnime"
  | "adultAmateur"
  | "onlyfans";

interface MediaStore {
  /* ── List data ── */
  movies: MediaItem[];
  tv: MediaItem[];
  anime: MediaItem[];
  adultAnime: MediaItem[];
  adultAmateur: MediaItem[];
  onlyfans: MediaItem[];
  featured: MediaItem[];
  recent: RecentEntry[];

  /* ── Rich movie details ── */
  movieDetails: MovieDetail[];

  /* ── API sync state ── */
  apiSynced: boolean;
  apiSyncing: boolean;
  apiError: string | null;

  getByCategory: (category: MediaCategory) => MediaItem[];
  addItem: (category: MediaCategory, item: MediaItem) => void;
  updateItem: (category: MediaCategory, index: number, item: MediaItem) => void;
  deleteItem: (category: MediaCategory, index: number) => void;

  /* ── Detail CRUD ── */
  getDetailById: (id: number) => MovieDetail | undefined;
  upsertDetail: (detail: MovieDetail) => void;
  deleteDetail: (id: number) => void;

  /** Fetch movies from the backend API and merge into the store. */
  syncMoviesFromApi: () => Promise<void>;
}

export const useMediaStore = create<MediaStore>((set, get) => ({
  movies: moviesData,
  tv: tvData,
  anime: animeData,
  adultAnime: adultAnimeData,
  adultAmateur: adultAmateurData,
  onlyfans: onlyfansData,
  featured: featuredItems,
  recent: recentEntries,

  movieDetails: initialMovieDetails,

  apiSynced: false,
  apiSyncing: false,
  apiError: null,

  getByCategory: (category) => get()[category],

  addItem: (category, item) =>
    set((s) => ({ [category]: [...s[category], item] })),

  updateItem: (category, index, item) =>
    set((s) => {
      const arr = [...s[category]];
      arr[index] = item;
      return { [category]: arr };
    }),

  deleteItem: (category, index) =>
    set((s) => ({
      [category]: s[category].filter((_, i) => i !== index),
    })),

  getDetailById: (id) => get().movieDetails.find((d) => d.movie_id === id),

  upsertDetail: (detail) =>
    set((s) => {
      const idx = s.movieDetails.findIndex((d) => d.movie_id === detail.movie_id);
      if (idx !== -1) {
        const copy = [...s.movieDetails];
        copy[idx] = detail;
        return { movieDetails: copy };
      }
      return { movieDetails: [...s.movieDetails, detail] };
    }),

  deleteDetail: (id) =>
    set((s) => ({
      movieDetails: s.movieDetails.filter((d) => d.movie_id !== id),
    })),

  /* ── API sync ── */
  syncMoviesFromApi: async () => {
    const { apiSynced, apiSyncing } = get();
    if (apiSynced || apiSyncing) return;

    set({ apiSyncing: true, apiError: null });
    try {
      // 1. Fetch the movie list
      const listRes = await fetchMovieList();
      const items = listRes.data ?? [];

      // 2. Map to MediaItem (basic info only)
      const apiMovies: MediaItem[] = items.map(apiListItemToMediaItem);

      // 3. Enrich each movie with detail (year, rating, genre, director)
      const enriched: MediaItem[] = [];
      const newDetails: MovieDetail[] = [];

      for (const item of apiMovies) {
        const id = item.detailHref?.split("/").pop();
        if (!id) {
          enriched.push(item);
          continue;
        }

        try {
          const detailRes = await fetchMovieDetail(id);
          const detail = detailRes.data;

          // Enrich the MediaItem
          enriched.push(enrichMediaItem(item, detail));

          // Convert to MovieDetail for the detail store
          const existingDetail = get().movieDetails.find(
            (d) => d.movie_id === parseInt(id, 10),
          );
          if (!existingDetail) {
            newDetails.push(apiDetailToMovieDetail(id, detail));
          }
        } catch {
          // If detail fetch fails, keep the basic item
          enriched.push(item);
        }
      }

      // 4. Merge: API movies replace the movies array; keep seed data for other categories
      set((s) => ({
        movies: enriched,
        movieDetails: s.movieDetails
          .concat(newDetails)
          // Deduplicate by movie_id
          .filter(
            (d, i, arr) => arr.findIndex((x) => x.movie_id === d.movie_id) === i,
          ),
        apiSynced: true,
        apiSyncing: false,
      }));
    } catch (err) {
      set({
        apiSyncing: false,
        apiError: err instanceof Error ? err.message : "Failed to sync movies",
      });
    }
  },
}));
