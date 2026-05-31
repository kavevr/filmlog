"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Eye, ChevronDown, Info } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "@/components/layout/nav-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useScrollThreshold } from "@/hooks/use-scroll-threshold";
import { mainNavItems, adultNavItems } from "@/constants/navigation";
import { siteConfig } from "@/config/site";

const roseAccent =
  "text-rose-400 bg-rose-400/8 shadow-[0_0_20px_rgba(251,113,133,0.15)] border border-rose-400/20";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const scrolled = useScrollThreshold(siteConfig.scrollThreshold);
  const [adultOpen, setAdultOpen] = useState(false);

  const isAdultActive = adultNavItems.some((s) => pathname.startsWith(s.href));

  return (
    <header
      className={cn(
        "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
        scrolled ? "top-0 w-full" : "top-6 w-1/4 min-w-115",
      )}
    >
      <nav
        className={cn(
          "flex items-center justify-center gap-0.5 px-3 py-2.5 flex-nowrap",
          "bg-background/40 backdrop-blur-2xl",
          "border border-white/6",
          "shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.02)_inset,0_0_60px_rgba(6,182,212,0.06)]",
          "transition-all duration-500",
          scrolled ? "rounded-none border-t-0" : "rounded-full",
        )}
      >
        {/* top highlight — floating only */}
        {!scrolled && (
          <div className="absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/20 to-transparent" />
        )}

        {/* ── main nav items ── */}
        {mainNavItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <NavLink
              key={item.href}
              href={item.href}
              isActive={isActive}
              icon={item.icon!}
              label={item.label}
            />
          );
        })}

        {/* ── adult dropdown (shadcn) ── */}
        <DropdownMenu onOpenChange={setAdultOpen}>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "relative inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-medium whitespace-nowrap",
                "transition-all duration-300 cursor-pointer",
                "hover:bg-white/6",
                isAdultActive ? roseAccent : "text-zinc-500 hover:text-zinc-300",
              )}
            >
              {isAdultActive && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-3 rounded-full bg-rose-400/50" />
              )}
              <Eye
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-300",
                  isAdultActive && "scale-110",
                )}
              />
              <span className="hidden sm:inline">成人</span>
              <ChevronDown
                className={cn("h-3 w-3 transition-transform duration-200", adultOpen && "rotate-180")}
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="center"
            sideOffset={10}
            className={cn(
              "min-w-36 rounded-xl border border-white/8",
              "bg-popover/95 backdrop-blur-xl",
              "shadow-[0_16px_48px_rgba(0,0,0,0.6)]",
              "p-1.5",
            )}
          >
            {adultNavItems.map((sub) => {
              const isSubActive = pathname.startsWith(sub.href);
              return (
                <DropdownMenuItem
                  key={sub.href}
                  onSelect={() => router.push(sub.href)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-colors",
                    isSubActive
                      ? "bg-rose-400/8 text-rose-400"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground focus:bg-white/5 focus:text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full shrink-0",
                      isSubActive
                        ? "bg-rose-400 shadow-[0_0_6px_rgba(251,113,133,0.6)]"
                        : "bg-muted-foreground/40",
                    )}
                  />
                  {sub.label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ── theme toggle ── */}
        <ThemeToggle />

        {/* ── about ── */}
        <NavLink
          href="/about"
          isActive={pathname === "/about"}
          icon={Info}
          label="关于"
        />
      </nav>
    </header>
  );
}
