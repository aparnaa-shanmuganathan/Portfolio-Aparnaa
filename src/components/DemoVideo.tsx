"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { VideoDemo } from "@/content/projects";

type Props = { video: VideoDemo; mode: "card" | "detail"; title: string };

/**
 * card:   poster only until near the viewport, then plays muted/looped while visible or hovered.
 * detail: controls, nothing downloads until the visitor presses play (preload="none").
 * Reduced motion: card shows the poster only and never autoplays.
 */
export function DemoVideo({ video, mode, title }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(mode === "detail");
  const [failed, setFailed] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (mode !== "card" || reduced.current) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "100px", threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mode]);

  const { poster } = video;
  if (failed) {
    return (
      <Image
        src={poster.src}
        alt={poster.alt}
        width={poster.width}
        height={poster.height}
        className="aspect-video w-full rounded-lg border border-line object-cover"
      />
    );
  }

  const isCard = mode === "card";
  return (
    <video
      ref={ref}
      className="aspect-video w-full rounded-lg border border-line bg-tag object-cover"
      poster={poster.src}
      aria-label={isCard ? `${title} demo (muted preview)` : `${title} demo video`}
      muted={isCard}
      loop={isCard}
      playsInline
      controls={!isCard}
      preload="none"
      onMouseEnter={isCard && !reduced.current ? () => ref.current?.play().catch(() => {}) : undefined}
      onError={() => setFailed(true)}
    >
      {near &&
        video.sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
      {(video.captions ?? []).map((c, i) => (
        <track key={c.src} kind="captions" src={c.src} srcLang={c.srclang} label={c.label} default={i === 0} />
      ))}
    </video>
  );
}
