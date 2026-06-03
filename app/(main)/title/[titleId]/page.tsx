import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Globe,
  Languages,
  Calendar,
  Star,
  Clapperboard,
  PenLine,
  Users,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LazyImage } from "@/components/media/lazy-image";
import { getDetailById } from "@/data/movie-details";
import { fetchMovieDetail, apiDetailToMovieDetail } from "@/lib/api";
import { posterImageUrl, cn } from "@/lib/utils";
import type { MovieDetail } from "@/types/media";

function isUrl(str: string): boolean {
  return str.startsWith("http://") || str.startsWith("https://");
}

interface Props {
  params: Promise<{ titleId: string }>;
}

export default async function TitleDetailPage({ params }: Props) {
  const { titleId } = await params;
  const id = parseInt(titleId, 10);

  if (isNaN(id)) {
    notFound();
  }

  // Try static seed data first, then fall back to API
  let detail: MovieDetail | undefined = getDetailById(id);

  if (!detail) {
    try {
      const res = await fetchMovieDetail(titleId);
      detail = apiDetailToMovieDetail(titleId, res.data);
    } catch {
      notFound();
    }
  }

  if (!detail) {
    notFound();
  }

  const { titles, cast_and_crew: cc } = detail;
  const hasAka = titles.aka.length > 0;

  return (
    <main className="flex-1">
      {/* Back + hero */}
      <section className="relative border-b border-white/4 px-4 pt-28 pb-10">
        <div className="mx-auto max-w-5xl">
          {/* Back link */}
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>

          <div className="flex flex-col gap-8 sm:flex-row">
            {/* Poster */}
            <div className="shrink-0">
              <LazyImage
                src={isUrl(detail.poster_url) ? detail.poster_url : posterImageUrl(id)}
                alt={titles.main_title}
                fallback="bg-linear-to-br from-cyan-500/20 to-blue-800/30"
                className="aspect-3/4 w-48 overflow-hidden rounded-2xl border border-white/8 sm:w-56"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                  {titles.main_title}
                </h1>
                {hasAka && (
                  <p className="mt-2 flex flex-wrap gap-1.5">
                    {titles.aka.map((name) => (
                      <Badge
                        key={name}
                        variant="outline"
                        className="text-xs text-muted-foreground"
                      >
                        {name}
                      </Badge>
                    ))}
                  </p>
                )}
              </div>

              {/* Metadata grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:flex sm:flex-wrap sm:gap-x-6">
                <Meta icon={Calendar} label="上映日期" value={detail.release_date} />
                <Meta icon={Clock} label="时长" value={`${detail.duration_minutes} 分钟`} />
                <Meta icon={Globe} label="地区" value={detail.region_of_origin} />
                <Meta icon={Languages} label="语言" value={detail.original_language} />
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {detail.genres.map((g) => (
                  <Badge
                    key={g}
                    className="border-cyan-400/20 bg-cyan-400/10 text-cyan-400"
                  >
                    {g}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      {detail.description && (
        <section className="px-4 pt-12">
          <div className="mx-auto max-w-5xl">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-cyan-400" />
              <h2 className="text-xl font-semibold text-foreground">剧情简介</h2>
            </div>
            <p className="max-w-3xl leading-relaxed text-muted-foreground">
              {detail.description}
            </p>
          </div>
        </section>
      )}

      {/* Cast & Crew */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl space-y-10">
          {/* Directors */}
          <CrewSection
            icon={Clapperboard}
            title="导演"
            people={cc.directors}
          />

          {/* Writers */}
          <CrewSection
            icon={PenLine}
            title="编剧"
            people={cc.writers}
          />

          <Separator className="bg-white/6" />

          {/* Actors */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <Users className="h-5 w-5 text-cyan-400" />
              <h2 className="text-xl font-semibold text-foreground">演员</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cc.actors
                .sort((a, b) => (a.sequence ?? 99) - (b.sequence ?? 99))
                .map((actor) => (
                  <div
                    key={actor.person_id}
                    className="flex items-center gap-3 rounded-xl border border-white/4 bg-white/2 px-4 py-3 transition-all hover:border-white/10 hover:bg-white/4"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-xs font-semibold text-muted-foreground">
                      {actor.sequence ?? "·"}
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {actor.name}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── Helpers ── */

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-sm">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-muted-foreground">{label}:</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

function CrewSection({
  icon: Icon,
  title,
  people,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  people: { person_id: number; name: string }[];
}) {
  if (people.length === 0) return null;
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-5 w-5 text-cyan-400" />
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      </div>
      <div className="flex flex-wrap gap-3">
        {people.map((p) => (
          <div
            key={p.person_id}
            className="rounded-full border border-white/6 bg-white/3 px-4 py-2 text-sm text-foreground transition-all hover:border-white/12"
          >
            {p.name}
          </div>
        ))}
      </div>
    </div>
  );
}
