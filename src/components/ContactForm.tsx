"use client";

import { useState, type FormEvent } from "react";
import { formspreeId } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-fg placeholder:text-muted focus-visible:border-accent";

function MailLink({ address }: { address: string }) {
  return (
    <a className="font-semibold text-accent underline" href={`mailto:${address}`}>
      {address}
    </a>
  );
}

export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return; // honeypot: bots fill this hidden field
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (!formspreeId) return null; // not configured: the Email button in Contact is the way in

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Name
        </label>
        <input id="name" name="name" type="text" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Message
        </label>
        <textarea id="message" name="message" required rows={5} minLength={10} className={field} />
      </div>
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-11 items-center rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-accent-fg hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p role="status" aria-live="polite" className="min-h-6 text-sm">
        {status === "sent" && "Thanks! Your message was sent and I'll reply soon."}
        {status === "error" && (
          <span>
            Something went wrong. Please email <MailLink address={fallbackEmail} /> instead.
          </span>
        )}
      </p>
    </form>
  );
}
