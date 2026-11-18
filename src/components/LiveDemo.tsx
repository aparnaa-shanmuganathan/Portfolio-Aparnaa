"use client";

import { useEffect, useState } from "react";
import type { LiveDemo as Live } from "@/content/projects";
import { ButtonLink } from "./ButtonLink";
import { DemoVideo } from "./DemoVideo";
import { ExternalIcon } from "./Icons";

type Props = { demo: Live; title: string; /** Result of the server-side reachability check */ reachable: boolean };
type State = "idle" | "loading" | "ready" | "failed";

const LOAD_TIMEOUT_MS = 20_000;

/**
 * The iframe is not mounted until the visitor clicks, so it never affects page load.
 * Cross-origin iframes don't expose HTTP errors, so "failed" means: the server-side check said the app is
 * down, the iframe errored, or it didn't finish loading within 20s. Any of those swaps in the fallback video.
 */
export function LiveDemo({ demo, title, reachable }: Props) {
  const [state, setState] = useState<State>(reachable ? "idle" : "failed");

  useEffect(() => {
    if (state !== "loading") return;
    const t = setTimeout(() => setState("failed"), LOAD_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [state]);

  if (state === "failed") {
    return (
      <div className="space-y-3">
        <p role="status" className="text-sm text-muted">
          The live app is asleep or unreachable right now. Here&apos;s a recorded demo instead.
        </p>
        {demo.fallback ? (
          <DemoVideo video={demo.fallback} mode="detail" title={title} />
        ) : null}
        <ButtonLink href={demo.url}>
          <ExternalIcon /> Try opening the app directly
        </ButtonLink>
      </div>
    );
  }

  if (state === "idle") {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 rounded-lg border border-line bg-tag p-6 text-center">
        <p className="max-w-md text-sm text-muted">
          Runs the real app inside this page. It may take a few seconds to start.
        </p>
        <button
          type="button"
          onClick={() => setState("loading")}
          className="inline-flex min-h-11 items-center rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-accent-fg hover:opacity-90"
        >
          Launch live demo
        </button>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-line bg-tag sm:aspect-video">
      {state === "loading" && (
        <p role="status" className="absolute inset-0 flex items-center justify-center text-sm text-muted">
          Starting the app…
        </p>
      )}
      <iframe
        src={demo.url}
        title={`${title} live demo`}
        loading="lazy"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        allow=""
        onLoad={() => setState("ready")}
        onError={() => setState("failed")}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
