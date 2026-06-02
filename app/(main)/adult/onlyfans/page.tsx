"use client";

import { DollarSign } from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import { MediaCard } from "@/components/media/media-card";
import { useMediaStore } from "@/store/media";

export default function AdultOnlyFansPage() {
  const items = useMediaStore((s) => s.onlyfans);

  return (
    <main className="flex-1">
      <SectionHeader
        icon={DollarSign}
        label="OnlyFans"
        title="OnlyFans"
        description="独占コンテンツ — クリエイターコレクション。"
        accent="amber"
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((a) => (
              <MediaCard
                key={a.title}
                title={a.title}
                year={a.year}
                rating={a.rating}
                genre={a.genre}
                poster={a.poster}
                accent={a.accent}
                variant={a.variant}
                href={a.detailHref}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
