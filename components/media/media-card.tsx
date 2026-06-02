"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Star, Play, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { AccentColor } from "@/types/media";

export interface MediaCardProps {
  title: string;
  year: string;
  rating: string;
  genre: string;
  /** Tailwind gradient class for poster placeholder */
  poster: string;
  accent: AccentColor;
  subtitle?: string;
  meta?: React.ReactNode;
  variant?: "default" | "adult";
  /** Link to detail page */
  href?: string;
}

const accentMap: Record<AccentColor, { hover: string; glow: string }> = {
  cyan:   { hover: "group-hover:text-cyan-400",   glow: "hover:shadow-[0_0_40px_rgba(6,182,212,0.06)]" },
  purple: { hover: "group-hover:text-purple-400", glow: "hover:shadow-[0_0_40px_rgba(168,85,247,0.06)]" },
  rose:   { hover: "group-hover:text-rose-400",   glow: "hover:shadow-[0_0_40px_rgba(251,113,133,0.06)]" },
  pink:   { hover: "group-hover:text-pink-400",   glow: "hover:shadow-[0_0_40px_rgba(236,72,153,0.06)]" },
  amber:  { hover: "group-hover:text-amber-400",  glow: "hover:shadow-[0_0_40px_rgba(245,158,11,0.06)]" },
};

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
}: Omit<MediaCardProps, "href">) {
  const colors = accentMap[accent];
  const isAdult = variant === "adult";

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/6 bg-card/50 transition-all hover:border-white/14",
        colors.glow,
      )}
    >
      {/* poster placeholder */}
      <div className={cn("aspect-3/4 relative", poster)}>
        <div className="absolute inset-0 flex items-center justify-center">
          {isAdult ? (
            <Eye className="h-12 w-12 text-white/20 transition-all group-hover:scale-110 group-hover:text-white/60" />
          ) : (
            <Play className="h-12 w-12 text-white/20 transition-all group-hover:scale-110 group-hover:text-white/60" />
          )}
        </div>

        {/* rating badge */}
        <div className="absolute right-3 top-3">
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
        <CardContent {...props} />
      </Link>
    );
  }
  return <CardContent {...props} />;
}
