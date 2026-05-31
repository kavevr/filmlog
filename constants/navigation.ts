import { Home, Film, Tv, Sparkles } from "lucide-react";
import type { NavItem } from "@/types/media";

export const mainNavItems: NavItem[] = [
  { label: "首页",  href: "/",       icon: Home },
  { label: "电影",  href: "/movies",  icon: Film },
  { label: "电视",  href: "/tv",      icon: Tv },
  { label: "动漫",  href: "/anime",   icon: Sparkles },
];

export const adultNavItems: NavItem[] = [
  { label: "动漫",      href: "/adult/anime" },
  { label: "素人",      href: "/adult/amateur" },
  { label: "OnlyFans",  href: "/adult/onlyfans" },
];
