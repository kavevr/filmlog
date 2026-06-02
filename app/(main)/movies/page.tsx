"use client";

import { Film } from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import { MediaCard } from "@/components/media/media-card";
import { useMediaStore } from "@/store/media";

export default function MoviesPage() {
  const movies = useMediaStore((s) => s.movies);

  return (
    <main className="flex-1">
      <SectionHeader
        icon={Film}
        label="Movies"
        title="电影库"
        description="探索你的电影收藏，发现新的经典。"
        accent="cyan"
        searchPlaceholder="搜索电影..."
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {movies.map((m) => (
              <MediaCard
                key={m.title}
                title={m.title}
                year={m.year}
                rating={m.rating}
                genre={m.genre}
                poster={m.poster}
                accent={m.accent}
                subtitle={m.director}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
