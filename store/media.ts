"use client";

import { create } from "zustand";
import type { MediaItem, RecentEntry } from "@/types/media";
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

export type MediaCategory =
  | "movies"
  | "tv"
  | "anime"
  | "adultAnime"
  | "adultAmateur"
  | "onlyfans";

interface MediaStore {
  movies: MediaItem[];
  tv: MediaItem[];
  anime: MediaItem[];
  adultAnime: MediaItem[];
  adultAmateur: MediaItem[];
  onlyfans: MediaItem[];
  featured: MediaItem[];
  recent: RecentEntry[];

  getByCategory: (category: MediaCategory) => MediaItem[];
  addItem: (category: MediaCategory, item: MediaItem) => void;
  updateItem: (category: MediaCategory, index: number, item: MediaItem) => void;
  deleteItem: (category: MediaCategory, index: number) => void;
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
}));
