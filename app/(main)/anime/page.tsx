import { Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import { MediaCard } from "@/components/media/media-card";
import { animeData } from "@/data/media";

export default function AnimePage() {
  return (
    <main className="flex-1">
      <SectionHeader
        icon={Sparkles}
        label="Anime"
        title="动漫"
        description="二次元的世界，每一帧都是艺术。"
        accent="purple"
        searchPlaceholder="搜索动漫..."
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {animeData.map((a) => (
              <MediaCard
                key={a.title}
                title={a.title}
                year={a.year}
                rating={a.rating}
                genre={a.genre}
                poster={a.poster}
                accent={a.accent}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
