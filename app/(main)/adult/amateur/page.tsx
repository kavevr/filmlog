"use client";

import { User } from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import { MediaCard } from "@/components/media/media-card";
import { useMediaStore } from "@/store/media";

export default function AdultAmateurPage() {
  const items = useMediaStore((s) => s.adultAmateur);

  return (
    <main className="flex-1">
      <SectionHeader
        icon={User}
        label="Amateur"
        title="素人"
        description="素人コレクション — リアルな魅力。"
        accent="pink"
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
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
