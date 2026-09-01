"use client";

import { FormEvent, useState, useSyncExternalStore } from "react";
import { site } from "@/content/site";
import { createBrowserSupabase } from "@/lib/supabase";

const STORAGE_KEY = "af-rsvp-email";
const listeners = new Set<() => void>();
let cachedEmail: string | null | undefined;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getStoredEmail() {
  if (typeof window === "undefined") return null;
  if (cachedEmail === undefined) {
    cachedEmail = window.localStorage.getItem(STORAGE_KEY);
  }
  return cachedEmail;
}

function saveStoredEmail(email: string) {
  window.localStorage.setItem(STORAGE_KEY, email);
  cachedEmail = email;
  listeners.forEach((listener) => listener());
}

type Status = "idle" | "submitting" | "error";
type Result = "thanks-yes" | "thanks-no" | "duplicate" | "already";

export function RsvpForm() {
  const storedEmail = useSyncExternalStore(subscribe, getStoredEmail, () => null);
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [status, setStatus] = useState<Status>("idle");
  const [submitted, setSubmitted] = useState<Exclude<Result, "already"> | null>(
    null,
  );
  const result: Result | null = submitted ?? (storedEmail ? "already" : null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fullName = String(data.get("fullName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const guestCountRaw = Number(data.get("guestCount") ?? 1);
    const notes = String(data.get("notes") ?? "").trim();
    const willAttend = attending === "yes";
    const guestCount = willAttend ? Math.min(20, Math.max(1, guestCountRaw)) : 0;

    setStatus("submitting");

    try {
      const supabase = createBrowserSupabase();
      const { error } = await supabase.from("rsvps").insert({
        full_name: fullName,
        email,
        attending: willAttend,
        guest_count: guestCount,
        notes,
      });

      if (error) {
        if (error.code === "23505" || /duplicate|unique/i.test(error.message)) {
          saveStoredEmail(email);
          setSubmitted("duplicate");
          setStatus("idle");
          return;
        }
        setStatus("error");
        return;
      }

      saveStoredEmail(email);
      setSubmitted(willAttend ? "thanks-yes" : "thanks-no");
      setStatus("idle");
      form.reset();
      setAttending("yes");
    } catch {
      setStatus("error");
    }
  }

  if (result) {
    const title =
      result === "duplicate" || result === "already"
        ? "Already received"
        : site.rsvp.confirmationTitle;
    const body =
      result === "duplicate"
        ? site.rsvp.duplicateMessage
        : result === "already"
          ? site.rsvp.alreadyMessage
          : result === "thanks-no"
            ? site.rsvp.confirmationDeclining
            : site.rsvp.confirmationAttending;

    return (
      <div className="mx-auto max-w-md text-center">
        <h2 className="font-script text-4xl">{title}</h2>
        <p className="mt-4 text-ink-soft">{body}</p>
        {storedEmail && (
          <p className="mt-6 text-sm text-ink-faint">{storedEmail}</p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md space-y-8">
      <label className="block">
        <span className="text-sm tracking-[0.14em] uppercase">Full name</span>
        <input
          required
          name="fullName"
          autoComplete="name"
          className="mt-2 w-full border-0 border-b border-[#3d2b1f]/30 bg-transparent py-3 outline-none transition-colors focus:border-ink"
        />
      </label>

      <label className="block">
        <span className="text-sm tracking-[0.14em] uppercase">Email</span>
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          className="mt-2 w-full border-0 border-b border-[#3d2b1f]/30 bg-transparent py-3 outline-none transition-colors focus:border-ink"
        />
      </label>

      <fieldset>
        <legend className="text-sm tracking-[0.14em] uppercase">Will you attend?</legend>
        <div className="mt-4 flex gap-4">
          <label className="flex flex-1 cursor-pointer items-center justify-center py-3 text-sm tracking-[0.12em] uppercase transition-opacity hover:opacity-80">
            <input
              type="radio"
              name="attending"
              className="sr-only"
              checked={attending === "yes"}
              onChange={() => setAttending("yes")}
            />
            <span
              className={
                attending === "yes"
                  ? "bg-fill px-6 py-2 text-white"
                  : "px-6 py-2 text-ink-soft"
              }
            >
              Yes
            </span>
          </label>
          <label className="flex flex-1 cursor-pointer items-center justify-center py-3 text-sm tracking-[0.12em] uppercase transition-opacity hover:opacity-80">
            <input
              type="radio"
              name="attending"
              className="sr-only"
              checked={attending === "no"}
              onChange={() => setAttending("no")}
            />
            <span
              className={
                attending === "no"
                  ? "bg-fill px-6 py-2 text-white"
                  : "px-6 py-2 text-ink-soft"
              }
            >
              No
            </span>
          </label>
        </div>
      </fieldset>

      {attending === "yes" && (
        <label className="block">
          <span className="text-sm tracking-[0.14em] uppercase">
            Number of adult guests
          </span>
          <input
            required
            type="number"
            name="guestCount"
            min={1}
            max={20}
            defaultValue={1}
            className="mt-2 w-full border-0 border-b border-[#3d2b1f]/30 bg-transparent py-3 outline-none transition-colors focus:border-ink"
          />
          <span className="mt-2 block text-sm text-ink-faint">
            Including yourself. Children are not included on the day.
          </span>
        </label>
      )}

      <label className="block">
        <span className="text-sm tracking-[0.14em] uppercase">
          Additional information
        </span>
        <textarea
          name="notes"
          rows={4}
          maxLength={1000}
          className="mt-2 w-full resize-y border-0 border-b border-[#3d2b1f]/30 bg-transparent py-3 outline-none transition-colors focus:border-ink"
        />
      </label>

      {status === "error" && (
        <p className="text-center text-sm text-ink-soft">
          Something went wrong. Please try again in a moment.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-fill py-3.5 text-sm tracking-[0.18em] uppercase text-white transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send RSVP"}
      </button>
    </form>
  );
}
