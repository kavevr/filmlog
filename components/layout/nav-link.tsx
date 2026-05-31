"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface NavLinkProps {
  href: string;
  isActive: boolean;
  icon: LucideIcon;
  label: string;
  /** e.g. "text-cyan-400 border-cyan-400/20 bg-cyan-400/8" */
  accentClass?: string;
}

const defaultAccent =
  "text-cyan-400 bg-cyan-400/8 shadow-[0_0_20px_rgba(6,182,212,0.15)] border border-cyan-400/20";

export function NavLink({
  href,
  isActive,
  icon: Icon,
  label,
  accentClass = defaultAccent,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "relative inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-medium whitespace-nowrap",
        "transition-all duration-300",
        "hover:bg-white/6",
        isActive ? accentClass : "text-muted-foreground hover:text-foreground",
      )}
    >
      {isActive && (
        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-3 rounded-full bg-current opacity-50" />
      )}
      <Icon
        className={cn(
          "h-3.5 w-3.5 transition-transform duration-300",
          isActive && "scale-110",
        )}
      />
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
