"use client";

import { useActionState, useState } from "react";
import { submitRsvp, type RsvpActionState } from "@/app/rsvp/actions";
import { site } from "@/content/site";

const initialState: RsvpActionState = { status: "idle" };

export function RsvpForm() {
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [state, formAction, pending] = useActionState(submitRsvp, initialState);

  if (
    state.status === "duplicate" ||
    state.status === "thanks-yes" ||
    state.status === "thanks-no"
  ) {
    const title =
      state.status === "duplicate"
        ? "Already received"
        : site.rsvp.confirmationTitle;
    const body =
      state.status === "duplicate"
        ? site.rsvp.duplicateMessage
        : state.status === "thanks-no"
          ? site.rsvp.confirmationDeclining
          : site.rsvp.confirmationAttending;

    return (
      <div className="mx-auto max-w-md text-center">
        <h2 className="font-script text-4xl">{title}</h2>
        <p className="mt-4 text-ink-soft">{body}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="mx-auto w-full max-w-md space-y-8">
      <label className="block">
        <span className="text-sm tracking-[0.14em] uppercase">Full name</span>
        <input
          required
          name="fullName"
          autoComplete="name"
          minLength={2}
          maxLength={120}
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
          maxLength={200}
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
              value="yes"
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
              value="no"
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
        <span className="mt-2 block text-sm text-ink-faint">
          Unfortunately a plus one is not possible unless you were specifically
          told you may bring someone.
        </span>
      </label>

      {state.status === "error" && (
        <p className="text-center text-sm text-ink-soft" role="alert">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-fill py-3.5 text-sm tracking-[0.18em] uppercase text-white transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send RSVP"}
      </button>
    </form>
  );
}
