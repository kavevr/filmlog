import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { AccentColor } from "@/types/media";
import type { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  /** Visual accent color — derives border, background, and focus classes */
  accent: AccentColor;
  searchPlaceholder?: string;
}

const accentMap: Record<AccentColor, { text: string; border: string; bg: string; focus: string }> = {
  cyan:   { text: "text-cyan-400",   border: "border-cyan-400/20",   bg: "bg-cyan-400/5",   focus: "focus:border-cyan-400/30" },
  purple: { text: "text-purple-400", border: "border-purple-400/20", bg: "bg-purple-400/5", focus: "focus:border-purple-400/30" },
  rose:   { text: "text-rose-400",   border: "border-rose-400/20",   bg: "bg-rose-400/5",   focus: "focus:border-rose-400/30" },
  pink:   { text: "text-pink-400",   border: "border-pink-400/20",   bg: "bg-pink-400/5",   focus: "focus:border-pink-400/30" },
  amber:  { text: "text-amber-400",  border: "border-amber-400/20",  bg: "bg-amber-400/5",  focus: "focus:border-amber-400/30" },
};

export function SectionHeader({
  icon: Icon,
  label,
  title,
  description,
  accent,
  searchPlaceholder,
}: SectionHeaderProps) {
  const colors = accentMap[accent];

  return (
    <section className="border-b border-white/4 px-4 pt-32 pb-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-end justify-between">
          <div>
            <div
              className={cn(
                "mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs",
                colors.text,
                colors.border,
                colors.bg,
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{label}</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground">{title}</h1>
            <p className="mt-2 text-muted-foreground">{description}</p>
          </div>

          {searchPlaceholder && (
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                className={cn(
                  "w-64 rounded-full border-white/8 bg-white/3 py-2.5 pl-10 pr-4",
                  "text-sm text-foreground/70 placeholder:text-muted-foreground",
                  "transition-all",
                  colors.focus,
                  "focus:bg-white/5",
                )}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
