"use client";

import { useState, useRef, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  /** Tailwind gradient class shown as fallback on error */
  fallback: string;
  className?: string;
}

export function LazyImage({ src, alt, fallback, className }: LazyImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const imgRef = useRef<HTMLImageElement>(null);

  // If the image is already cached (complete), show it immediately
  useEffect(() => {
    if (imgRef.current?.complete) {
      setStatus("loaded");
    }
  }, []);

  if (status === "error") {
    return (
      <div className={cn("relative flex items-center justify-center", fallback, className)}>
        <span className="text-xs text-white/10">no image</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Skeleton placeholder */}
      {status === "loading" && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
      )}

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-700",
          status === "loaded" ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
