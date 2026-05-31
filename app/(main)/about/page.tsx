import { Info, Zap, Cpu, Globe, Code2, Heart } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "极速体验",
    desc: "基于 Next.js 16 与 Turbopack，页面秒开，流畅无卡顿。",
  },
  {
    icon: Cpu,
    title: "AI 驱动",
    desc: "智能推荐算法，根据你的观影偏好发现下一部心头好。",
  },
  {
    icon: Globe,
    title: "多端同步",
    desc: "Web、移动端全覆盖，随时随地记录你的观影足迹。",
  },
  {
    icon: Heart,
    title: "开源免费",
    desc: "代码完全开源，社区驱动，永远免费使用。",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Header */}
      <section className="border-b border-white/4 px-4 pt-32 pb-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-400">
            <Info className="h-3.5 w-3.5" />
            <span>About</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground">关于 FilmLog</h1>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            FilmLog 是一个为影迷打造的影视追踪平台。记录你的每一部电影、
            每一季剧集，用数据读懂你的观影品味。
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-foreground">
            为什么选择 FilmLog
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-white/6 bg-white/2 px-6 py-8 transition-all hover:border-white/12 hover:bg-white/4"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                  <f.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer note */}
      <section className="px-4 pb-20 text-center">
        <div className="mx-auto max-w-md">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/6 bg-white/2 px-5 py-3">
            <Code2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Made with{" "}
              <Heart className="inline h-3.5 w-3.5 text-red-400 fill-red-400" />{" "}
              by film lovers, for film lovers.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
