"use client";

import {
  TrendingUp,
  Play,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";
import { MediaCard } from "@/components/media/media-card";
import { useMediaStore } from "@/store/media";
import { statsItems } from "@/data/media";

export default function Home() {
  const featured = useMediaStore((s) => s.featured);
  const recent = useMediaStore((s) => s.recent);
  return (
    <main className="flex-1">
      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* bg grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-3"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10">

          <h1 className="max-w-2xl text-5xl font-bold tracking-tight sm:text-7xl">
            <span className="bg-linear-to-r from-foreground via-foreground/70 to-muted-foreground bg-clip-text text-transparent">
              追踪你的
            </span>
            <br />
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              每一帧热爱
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
            记录、评分、发现。用最优雅的方式管理你的影视库。
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-black shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]">
              <Play className="h-4 w-4" />
              开始使用
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-foreground/70 transition-all hover:border-white/20 hover:bg-white/10">
              <Zap className="h-4 w-4" />
              了解更多
            </button>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <span className="h-12 w-px bg-linear-to-b from-muted-foreground to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-t border-white/4 px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {statsItems.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-2 rounded-2xl border border-white/6 bg-white/2 px-6 py-6 backdrop-blur-sm transition-all hover:border-white/12 hover:bg-white/4"
              >
                <s.icon className="h-5 w-5 text-cyan-400/70" />
                <span className="text-2xl font-bold text-foreground">
                  {s.value}
                </span>
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured ── */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">热门推荐</h2>
              <p className="mt-1 text-sm text-muted-foreground">本周最受关注的作品</p>
            </div>
            <button className="inline-flex items-center gap-1 text-sm text-cyan-400 transition-colors hover:text-cyan-300">
              查看全部 <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((f) => (
              <MediaCard
                key={f.title}
                title={f.title}
                year={f.year}
                rating={f.rating}
                genre={f.genre}
                poster={f.poster}
                accent={f.accent}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Activity ── */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-foreground">最近观看</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              你最近的观影与追剧记录
            </p>
          </div>

          <div className="space-y-2">
            {recent.map((r, i) => (
              <div
                key={r.title}
                className="flex items-center justify-between rounded-xl border border-white/4 bg-white/1 px-5 py-4 transition-all hover:border-white/10 hover:bg-white/3"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-muted-foreground w-8 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{r.title}</p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                </div>
                <span className="text-sm text-amber-400/80">{r.rating}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="rounded-3xl border border-white/6 bg-white/2 px-8 py-16 backdrop-blur-sm">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
              <TrendingUp className="h-8 w-8 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              准备好开始记录了吗？
            </h2>
            <p className="mt-3 text-muted-foreground">
              加入数千名影迷，追踪你的每一部电影和剧集。
            </p>
            <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-500 px-8 py-3.5 text-sm font-semibold text-black shadow-[0_0_30px_rgba(6,182,212,0.25)] transition-all hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]">
              <Sparkles className="h-4 w-4" />
              免费注册
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/4 px-4 py-10 text-center">
        <p className="text-xs text-muted-foreground">
          © 2026 FilmLog — Built with Next.js & Tailwind CSS
        </p>
      </footer>
    </main>
  );
}
