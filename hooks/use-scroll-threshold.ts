"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Returns `true` when the window scroll position exceeds the given threshold.
 * Throttled via requestAnimationFrame to avoid excessive re-renders.
 *
 * Always initializes to `false` to match server render, then syncs
 * with the real scroll position after mount to avoid hydration mismatch.
 */
export function useScrollThreshold(threshold: number): boolean {
  const [exceeded, setExceeded] = useState(false);

  const rafRef = useRef<number | null>(null);

  const onScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      setExceeded(window.scrollY > threshold);
    });
  }, [threshold]);

  useEffect(() => {
    // Sync with real scroll position after mount (server always renders false)
    const isOver = window.scrollY > threshold;
    if (isOver) setExceeded(true);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [onScroll, threshold]);

  return exceeded;
}
