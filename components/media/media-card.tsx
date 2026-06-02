"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Star, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LazyImage } from "@/components/media/lazy-image";
import { posterImageUrl } from "@/lib/utils";
import type { AccentColor } from "@/types/media";

export interface MediaCardProps {
  title: string;
  year: string;
  rating: string;
  genre: string;
  /** Tailwind gradient class for poster fallback */
  poster: string;
  accent: AccentColor;
  subtitle?: string;
  meta?: React.ReactNode;
  variant?: "default" | "adult";
  /** Link to detail page — also used to derive the poster image */
  href?: string;
}

const accentMap: Record<AccentColor, { hover: string; glow: string }> = {
  cyan:   { hover: "group-hover:text-cyan-400",   glow: "hover:shadow-[0_0_40px_rgba(6,182,212,0.06)]" },
  purple: { hover: "group-hover:text-purple-400", glow: "hover:shadow-[0_0_40px_rgba(168,85,247,0.06)]" },
  rose:   { hover: "group-hover:text-rose-400",   glow: "hover:shadow-[0_0_40px_rgba(251,113,133,0.06)]" },
  pink:   { hover: "group-hover:text-pink-400",   glow: "hover:shadow-[0_0_40px_rgba(236,72,153,0.06)]" },
  amber:  { hover: "group-hover:text-amber-400",  glow: "hover:shadow-[0_0_40px_rgba(245,158,11,0.06)]" },
};

function extractTitleId(href?: string): number | null {
  if (!href) return null;
  const id = parseInt(href.split("/").pop()!, 10);
  return isNaN(id) ? null : id;
}

function CardContent({
  title,
  year,
  rating,
  genre,
  poster,
  accent,
  subtitle,
  meta,
  variant = "default",
  href,
}: Omit<MediaCardProps, "href"> & { href?: string }) {
  const [revealed, setRevealed] = useState(false);
  const colors = accentMap[accent];
  const isAdult = variant === "adult";
  const blurred = isAdult && !revealed;
  const titleId = extractTitleId(href);
  const imageSrc = titleId ? posterImageUrl(titleId) : null;

  function handleReveal(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setRevealed(true);
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/6 bg-card/50 transition-all hover:border-white/14",
        colors.glow,
      )}
    >
      {/* poster */}
      <div className="aspect-3/4 relative">
        {/* Image layer — blurred when adult & not revealed */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500",
            blurred && "blur-sm scale-105",
          )}
        >
          {imageSrc ? (
            <LazyImage
              src={imageSrc}
              alt={title}
              fallback={poster}
              className="absolute inset-0"
            />
          ) : (
            <div className={cn("absolute inset-0 flex items-center justify-center", poster)}>
              <Eye className="h-12 w-12 text-white/20 transition-all group-hover:scale-110 group-hover:text-white/60" />
            </div>
          )}
        </div>

        {/* Frosted overlay for adult content */}
        {blurred && (
          <button
            type="button"
            onClick={handleReveal}
            className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center gap-3 bg-white/3 backdrop-blur-md transition-all hover:bg-white/6"
          >
            <Eye className="h-10 w-10 text-white/30" />
            <span className="text-sm font-medium text-white/40">
              点击查看预览
            </span>
          </button>
        )}

        {/* rating badge */}
        <div className="absolute right-3 top-3 z-20">
          <Badge
            variant="secondary"
            className="gap-1 border-0 bg-black/60 px-2 py-0.5 text-xs font-semibold backdrop-blur-md"
          >
            <Star
              className={cn(
                "h-3 w-3",
                isAdult ? "fill-rose-400 text-rose-400" : "fill-amber-400 text-amber-400",
              )}
            />
            {rating}
          </Badge>
        </div>
      </div>

      {/* info */}
      <div className="p-4">
        <h3 className={cn("font-semibold text-foreground transition-colors", colors.hover)}>
          {title}
        </h3>
        {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{year}</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
          <span>{genre}</span>
        </div>
        {meta && <div className="mt-1.5">{meta}</div>}
      </div>
    </div>
  );
}

export function MediaCard({ href, ...props }: MediaCardProps) {
  if (href) {
    return (
      <Link href={href} className="block">
        <CardContent {...props} href={href} />
      </Link>
    );
  }
  return <CardContent {...props} />;
}
