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

  getByCategory: (category: MediaCategory) => MediaItem[];
  addItem: (category: MediaCategory, item: MediaItem) => void;
  updateItem: (category: MediaCategory, index: number, item: MediaItem) => void;
  deleteItem: (category: MediaCategory, index: number) => void;

  /* ── Detail CRUD ── */
  getDetailById: (id: number) => MovieDetail | undefined;
  upsertDetail: (detail: MovieDetail) => void;
  deleteDetail: (id: number) => void;
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
}));
