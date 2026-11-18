import Image from "next/image";
import type { Project } from "@/content/projects";
import { DemoVideo } from "./DemoVideo";
import { FlowDiagram } from "./FlowDiagram";
import { ImageIcon } from "./Icons";

/** Card media. Every variant is 16:9, so swapping content causes no layout shift. */
export function ProjectMedia({ project: p }: { project: Project }) {
  const d = p.demo;
  const video = d?.type === "video" ? d : d?.type === "live" ? d.fallback : undefined;
  if (video) return <DemoVideo video={video} mode="card" title={p.title} />;

  if (d?.type === "walkthrough") {
    return (
      <div className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-line bg-tag p-3">
        <FlowDiagram nodes={d.steps} label={`${p.title} pipeline`} />
      </div>
    );
  }
  if (p.image) {
    return (
      <Image
        src={p.image.src}
        alt={p.image.alt}
        width={p.image.width}
        height={p.image.height}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="aspect-video w-full rounded-lg border border-line object-cover"
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`Screenshot of ${p.title} coming soon`}
      className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line bg-tag text-muted"
    >
      <ImageIcon />
      <span className="text-xs">Demo coming soon</span>
    </div>
  );
}
