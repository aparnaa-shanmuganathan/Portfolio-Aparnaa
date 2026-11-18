"use client";

import Image from "next/image";
import { useState } from "react";
import type { FlowStep } from "@/content/projects";
import { DemoVideo } from "./DemoVideo";
import { FlowDiagram } from "./FlowDiagram";

export function Walkthrough({ steps, title }: { steps: FlowStep[]; title: string }) {
  const [index, setIndex] = useState(0);
  const step = steps[index];
  const btn =
    "inline-flex min-h-11 items-center rounded-lg border border-line px-4 py-2 text-sm font-semibold hover:bg-surface disabled:opacity-40";

  return (
    <div className="space-y-5">
      <FlowDiagram
        nodes={steps}
        label={`${title} architecture. Select a stage to see details.`}
        activeId={step.id}
        onSelect={(id) => setIndex(steps.findIndex((s) => s.id === id))}
      />
      <div aria-live="polite" className="space-y-4 rounded-xl border border-line bg-surface p-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          Step {index + 1} of {steps.length}
        </p>
        <h3 className="text-lg font-bold">{step.label}</h3>
        <p className="text-muted">{step.description}</p>
        {step.media?.kind === "image" && (
          <Image
            src={step.media.image.src}
            alt={step.media.image.alt}
            width={step.media.image.width}
            height={step.media.image.height}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="aspect-video w-full rounded-lg border border-line object-cover"
          />
        )}
        {step.media?.kind === "video" && <DemoVideo video={step.media.video} mode="detail" title={`${title}: ${step.label}`} />}
      </div>
      <div className="flex gap-3">
        <button type="button" className={btn} disabled={index === 0} onClick={() => setIndex(index - 1)}>
          Previous
        </button>
        <button type="button" className={btn} disabled={index === steps.length - 1} onClick={() => setIndex(index + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
