"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-32 rounded-xl border border-white/8 bg-popover/95 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.6)] p-1.5"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm cursor-pointer text-muted-foreground hover:bg-white/5 hover:text-foreground focus:bg-white/5 focus:text-foreground"
        >
          <Sun className="h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm cursor-pointer text-muted-foreground hover:bg-white/5 hover:text-foreground focus:bg-white/5 focus:text-foreground"
        >
          <Moon className="h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm cursor-pointer text-muted-foreground hover:bg-white/5 hover:text-foreground focus:bg-white/5 focus:text-foreground"
        >
          <span className="h-4 w-4 inline-flex items-center justify-center text-xs">💻</span>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
