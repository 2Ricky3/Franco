"use client";

import { useEffect, useMemo, useState } from "react";
import { site } from "@/content/site";

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds, done: diff === 0 };
}

function pad(value: number, size: number) {
  return String(value).padStart(size, "0");
}

function SplitFlapDigit({ digit }: { digit: string }) {
  const [shown, setShown] = useState(digit);
  const [incoming, setIncoming] = useState(digit);
  const [phase, setPhase] = useState<"idle" | "top" | "bottom">("idle");

  useEffect(() => {
    if (digit === shown) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(digit);
      setIncoming(digit);
      setPhase("idle");
      return;
    }

    setIncoming(digit);
    setPhase("top");

    const topId = window.setTimeout(() => setPhase("bottom"), 180);
    const doneId = window.setTimeout(() => {
      setShown(digit);
      setPhase("idle");
    }, 360);

    return () => {
      window.clearTimeout(topId);
      window.clearTimeout(doneId);
    };
  }, [digit, shown]);

  const className = [
    "flap-cell",
    phase === "top" ? "is-top" : "",
    phase === "bottom" ? "is-bot" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={className}>
      <span className="flap-top">
        <span className="flap-glyph">{incoming}</span>
      </span>
      <span className="flap-bot">
        <span className="flap-glyph">{shown}</span>
      </span>
      <span className="flap-divider" aria-hidden />
      <span className="flap-top-anim">
        <span className="flap-glyph">{shown}</span>
      </span>
      <span className="flap-bot-anim">
        <span className="flap-glyph">{incoming}</span>
      </span>
    </span>
  );
}

function SplitFlapGroup({
  label,
  value,
  digits,
}: {
  label: string;
  value: number;
  digits: number;
}) {
  const padded = pad(value, digits);
  return (
    <div className="text-center">
      <div className="flex justify-center gap-[5px] sm:gap-1.5">
        {padded.split("").map((digit, index) => (
          <SplitFlapDigit key={`${label}-${index}`} digit={digit} />
        ))}
      </div>
      <p className="mt-2.5 text-[10px] tracking-[0.2em] uppercase text-white/45 sm:text-[11px]">
        {label}
      </p>
    </div>
  );
}

export function Countdown() {
  const target = useMemo(() => new Date(site.wedding.startAt).getTime(), []);
  const [remaining, setRemaining] = useState<ReturnType<
    typeof getRemaining
  > | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(getRemaining(target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (!remaining) {
    return <div className="mx-auto h-[7.5rem] max-w-md" aria-hidden />;
  }

  if (remaining.done) {
    return (
      <p className="text-center text-sm tracking-[0.18em] uppercase text-ink-soft">
        Today&apos;s the day
      </p>
    );
  }

  return (
    <div
      className="split-flap-board"
      aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes, ${remaining.seconds} seconds until the wedding`}
    >
      <SplitFlapGroup label="Days" value={remaining.days} digits={3} />
      <SplitFlapGroup label="Hours" value={remaining.hours} digits={2} />
      <SplitFlapGroup label="Minutes" value={remaining.minutes} digits={2} />
      <SplitFlapGroup label="Seconds" value={remaining.seconds} digits={2} />
    </div>
  );
}
