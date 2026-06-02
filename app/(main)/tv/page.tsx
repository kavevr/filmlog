"use client";

import { Tv, Clock } from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import { MediaCard } from "@/components/media/media-card";
import { useMediaStore } from "@/store/media";

export default function TvPage() {
  const tv = useMediaStore((s) => s.tv);

  return (
    <main className="flex-1">
      <SectionHeader
        icon={Tv}
        label="TV Shows"
        title="剧集库"
        description="追剧记录，永不遗漏任何精彩剧集。"
        accent="purple"
        searchPlaceholder="搜索剧集..."
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tv.map((s) => (
              <MediaCard
                key={s.title}
                title={s.title}
                year={s.year}
                rating={s.rating}
                genre={s.genre}
                poster={s.poster}
                accent={s.accent}
                meta={
                  <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                    <Tv className="h-3 w-3" /> {s.seasons}季
                    <span className="mx-1 text-zinc-700">·</span>
                    <Clock className="h-3 w-3" /> {s.episodes}集
                  </span>
                }
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
