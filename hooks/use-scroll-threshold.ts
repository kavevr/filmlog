"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Returns `true` when the window scroll position exceeds the given threshold.
 * Uses a passive scroll listener for performance.
 */
export function useScrollThreshold(threshold: number): boolean {
  const [exceeded, setExceeded] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.scrollY > threshold;
  });

  const onScroll = useCallback(() => {
    setExceeded(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return exceeded;
}
