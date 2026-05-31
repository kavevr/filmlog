import type { MediaItem, RecentEntry, StatItem } from "@/types/media";
import { Film, Tv, Clock, Star } from "lucide-react";

/* ────────── Home: featured ────────── */
export const featuredItems: MediaItem[] = [
  {
    title: "Dune: Part Two", year: "2024", rating: "8.7",
    genre: "Sci-Fi / Adventure",
    poster: "bg-linear-to-br from-amber-500/30 to-orange-700/40",
    accent: "cyan",
  },
  {
    title: "The Batman", year: "2022", rating: "7.8",
    genre: "Action / Crime",
    poster: "bg-linear-to-br from-red-600/30 to-zinc-900/40",
    accent: "cyan",
  },
  {
    title: "Interstellar", year: "2014", rating: "8.7",
    genre: "Sci-Fi / Drama",
    poster: "bg-linear-to-br from-blue-500/30 to-indigo-900/40",
    accent: "cyan",
  },
];

/* ────────── Home: recent activity ────────── */
export const recentEntries: RecentEntry[] = [
  { title: "Blade Runner 2049", date: "2026-05-28", rating: "★★★★☆" },
  { title: "Arcane S2", date: "2026-05-25", rating: "★★★★★" },
  { title: "Severance S2", date: "2026-05-20", rating: "★★★★★" },
  { title: "Oppenheimer", date: "2026-05-15", rating: "★★★★☆" },
  { title: "Cyberpunk: Edgerunners", date: "2026-05-10", rating: "★★★★☆" },
];

/* ────────── Home: stats ────────── */
export const statsItems: StatItem[] = [
  { label: "影片", value: "247", icon: Film },
  { label: "剧集", value: "53", icon: Tv },
  { label: "总时长", value: "512h", icon: Clock },
  { label: "好评率", value: "87%", icon: Star },
];

/* ────────── Movies ────────── */
export const moviesData: MediaItem[] = [
  { title: "Dune: Part Two", year: "2024", rating: "8.7", director: "Denis Villeneuve", genre: "Sci-Fi / Adventure", poster: "bg-linear-to-br from-amber-500/30 to-orange-700/40", accent: "cyan" },
  { title: "The Batman", year: "2022", rating: "7.8", director: "Matt Reeves", genre: "Action / Crime", poster: "bg-linear-to-br from-red-600/30 to-zinc-900/40", accent: "cyan" },
  { title: "Interstellar", year: "2014", rating: "8.7", director: "Christopher Nolan", genre: "Sci-Fi / Drama", poster: "bg-linear-to-br from-blue-500/30 to-indigo-900/40", accent: "cyan" },
  { title: "Parasite", year: "2019", rating: "8.5", director: "Bong Joon-ho", genre: "Thriller / Drama", poster: "bg-linear-to-br from-emerald-500/30 to-teal-900/40", accent: "cyan" },
  { title: "Spider-Verse", year: "2023", rating: "8.6", director: "Joaquim Dos Santos", genre: "Animation / Action", poster: "bg-linear-to-br from-purple-500/30 to-pink-700/40", accent: "cyan" },
  { title: "Oppenheimer", year: "2023", rating: "8.4", director: "Christopher Nolan", genre: "Biography / Drama", poster: "bg-linear-to-br from-zinc-400/30 to-zinc-800/40", accent: "cyan" },
  { title: "Blade Runner 2049", year: "2017", rating: "8.0", director: "Denis Villeneuve", genre: "Sci-Fi / Thriller", poster: "bg-linear-to-br from-cyan-500/30 to-blue-900/40", accent: "cyan" },
  { title: "Everything Everywhere", year: "2022", rating: "7.8", director: "Daniels", genre: "Sci-Fi / Comedy", poster: "bg-linear-to-br from-yellow-500/30 to-red-700/40", accent: "cyan" },
  { title: "The Dark Knight", year: "2008", rating: "9.0", director: "Christopher Nolan", genre: "Action / Crime", poster: "bg-linear-to-br from-gray-600/30 to-black/40", accent: "cyan" },
];

/* ────────── TV Shows ────────── */
export const tvData: MediaItem[] = [
  { title: "Arcane", year: "2021–2024", rating: "9.0", seasons: 2, episodes: 18, genre: "Animation / Fantasy", poster: "bg-linear-to-br from-blue-500/30 to-purple-700/40", accent: "purple" },
  { title: "Severance", year: "2022–", rating: "8.7", seasons: 2, episodes: 19, genre: "Sci-Fi / Thriller", poster: "bg-linear-to-br from-zinc-500/30 to-zinc-900/40", accent: "purple" },
  { title: "The Last of Us", year: "2023–", rating: "8.7", seasons: 1, episodes: 9, genre: "Drama / Horror", poster: "bg-linear-to-br from-emerald-500/30 to-green-900/40", accent: "purple" },
  { title: "Cyberpunk: Edgerunners", year: "2022", rating: "8.3", seasons: 1, episodes: 10, genre: "Animation / Sci-Fi", poster: "bg-linear-to-br from-yellow-500/30 to-red-700/40", accent: "purple" },
  { title: "Dark", year: "2017–2020", rating: "8.7", seasons: 3, episodes: 26, genre: "Sci-Fi / Mystery", poster: "bg-linear-to-br from-gray-700/30 to-black/40", accent: "purple" },
  { title: "Better Call Saul", year: "2015–2022", rating: "9.0", seasons: 6, episodes: 63, genre: "Crime / Drama", poster: "bg-linear-to-br from-red-700/30 to-amber-900/40", accent: "purple" },
  { title: "Squid Game", year: "2021–", rating: "8.0", seasons: 2, episodes: 16, genre: "Thriller / Drama", poster: "bg-linear-to-br from-pink-500/30 to-rose-800/40", accent: "purple" },
  { title: "Foundation", year: "2021–", rating: "7.6", seasons: 2, episodes: 20, genre: "Sci-Fi / Drama", poster: "bg-linear-to-br from-indigo-500/30 to-blue-900/40", accent: "purple" },
  { title: "True Detective S1", year: "2014", rating: "9.0", seasons: 1, episodes: 8, genre: "Crime / Mystery", poster: "bg-linear-to-br from-amber-700/30 to-yellow-900/40", accent: "purple" },
];

/* ────────── Anime ────────── */
export const animeData: MediaItem[] = [
  { title: "进击的巨人", year: "2013–2023", rating: "9.1", genre: "Action / Dark Fantasy", poster: "bg-linear-to-br from-amber-700/30 to-red-900/40", accent: "purple" },
  { title: "鬼灭之刃", year: "2019–", rating: "8.7", genre: "Action / Supernatural", poster: "bg-linear-to-br from-blue-600/30 to-indigo-900/40", accent: "purple" },
  { title: "咒术回战", year: "2020–", rating: "8.6", genre: "Action / Supernatural", poster: "bg-linear-to-br from-purple-600/30 to-pink-900/40", accent: "purple" },
  { title: "葬送的芙莉莲", year: "2023–", rating: "9.0", genre: "Fantasy / Drama", poster: "bg-linear-to-br from-emerald-500/30 to-teal-800/40", accent: "purple" },
  { title: "赛博朋克：边缘行者", year: "2022", rating: "8.3", genre: "Sci-Fi / Action", poster: "bg-linear-to-br from-yellow-500/30 to-red-700/40", accent: "purple" },
  { title: "链锯人", year: "2022", rating: "8.4", genre: "Action / Horror", poster: "bg-linear-to-br from-orange-600/30 to-red-800/40", accent: "purple" },
  { title: "间谍过家家", year: "2022–", rating: "8.5", genre: "Comedy / Action", poster: "bg-linear-to-br from-pink-400/30 to-rose-700/40", accent: "purple" },
  { title: "Re:Zero", year: "2016–", rating: "8.1", genre: "Isekai / Drama", poster: "bg-linear-to-br from-violet-500/30 to-purple-900/40", accent: "purple" },
  { title: "命运石之门", year: "2011", rating: "9.1", genre: "Sci-Fi / Thriller", poster: "bg-linear-to-br from-cyan-500/30 to-blue-800/40", accent: "purple" },
];

/* ────────── Adult: Anime ────────── */
export const adultAnimeData: MediaItem[] = [
  { title: "鬼父", year: "2018", rating: "7.5", genre: "Adult / Anime", poster: "bg-linear-to-br from-rose-600/30 to-pink-900/40", accent: "rose", variant: "adult" },
  { title: "黒獣", year: "2012", rating: "8.0", genre: "Adult / Fantasy", poster: "bg-linear-to-br from-purple-700/30 to-violet-900/40", accent: "rose", variant: "adult" },
  { title: "対魔忍アサギ", year: "2007", rating: "7.8", genre: "Adult / Action", poster: "bg-linear-to-br from-red-700/30 to-rose-900/40", accent: "rose", variant: "adult" },
  { title: "蘭斯", year: "2014", rating: "7.6", genre: "Adult / Fantasy", poster: "bg-linear-to-br from-amber-600/30 to-orange-900/40", accent: "rose", variant: "adult" },
  { title: "宇宙海賊サラ", year: "2008", rating: "7.9", genre: "Adult / Sci-Fi", poster: "bg-linear-to-br from-blue-600/30 to-indigo-900/40", accent: "rose", variant: "adult" },
  { title: "監獄戦艦", year: "2010", rating: "7.7", genre: "Adult / Sci-Fi", poster: "bg-linear-to-br from-zinc-600/30 to-gray-900/40", accent: "rose", variant: "adult" },
];

/* ────────── Adult: Amateur ────────── */
export const adultAmateurData: MediaItem[] = [
  { title: "素人動画コレクション Vol.1", year: "2024", rating: "7.2", genre: "Amateur", poster: "bg-linear-to-br from-pink-500/30 to-rose-800/40", accent: "pink", variant: "adult" },
  { title: "初撮り素人娘", year: "2023", rating: "7.0", genre: "Amateur / Debut", poster: "bg-linear-to-br from-amber-500/30 to-orange-800/40", accent: "pink", variant: "adult" },
  { title: "素人ナンパ大作戦", year: "2024", rating: "7.5", genre: "Amateur / Pickup", poster: "bg-linear-to-br from-blue-500/30 to-indigo-800/40", accent: "pink", variant: "adult" },
  { title: "街角素人ガチ交渉", year: "2023", rating: "7.3", genre: "Amateur / Street", poster: "bg-linear-to-br from-emerald-500/30 to-teal-800/40", accent: "pink", variant: "adult" },
  { title: "素人OL昼休み", year: "2024", rating: "7.1", genre: "Amateur / Office", poster: "bg-linear-to-br from-violet-500/30 to-purple-800/40", accent: "pink", variant: "adult" },
  { title: "地方在住素人妻", year: "2023", rating: "7.4", genre: "Amateur / Married", poster: "bg-linear-to-br from-cyan-500/30 to-blue-800/40", accent: "pink", variant: "adult" },
];

/* ────────── Adult: OnlyFans ────────── */
export const onlyfansData: MediaItem[] = [
  { title: "Sophie Rain", year: "2024", rating: "8.5", genre: "OnlyFans / Top Creator", poster: "bg-linear-to-br from-rose-400/30 to-pink-700/40", accent: "amber", variant: "adult" },
  { title: "Amouranth", year: "2023–", rating: "8.3", genre: "OnlyFans / Cosplay", poster: "bg-linear-to-br from-purple-400/30 to-violet-700/40", accent: "amber", variant: "adult" },
  { title: "Belle Delphine", year: "2020–", rating: "8.0", genre: "OnlyFans / Cosplay", poster: "bg-linear-to-br from-pink-300/30 to-rose-600/40", accent: "amber", variant: "adult" },
  { title: "Corinna Kopf", year: "2021–", rating: "7.8", genre: "OnlyFans / Lifestyle", poster: "bg-linear-to-br from-amber-400/30 to-orange-700/40", accent: "amber", variant: "adult" },
  { title: "Mia Khalifa", year: "2022–", rating: "7.5", genre: "OnlyFans / Celebrity", poster: "bg-linear-to-br from-blue-400/30 to-indigo-700/40", accent: "amber", variant: "adult" },
  { title: "Riley Reid", year: "2021–", rating: "8.2", genre: "OnlyFans / Exclusive", poster: "bg-linear-to-br from-cyan-400/30 to-blue-700/40", accent: "amber", variant: "adult" },
];
