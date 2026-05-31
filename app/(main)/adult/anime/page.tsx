import { Flame } from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import { MediaCard } from "@/components/media/media-card";
import { adultAnimeData } from "@/data/media";

export default function AdultAnimePage() {
  return (
    <main className="flex-1">
      <SectionHeader
        icon={Flame}
        label="Adult Anime"
        title="成人动漫"
        description="成人向けアニメコレクション。"
        accent="rose"
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {adultAnimeData.map((a) => (
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
