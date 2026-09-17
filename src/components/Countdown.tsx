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
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (digit === incoming) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(digit);
      setIncoming(digit);
      setFlipping(false);
      return;
    }

    setIncoming(digit);
    setFlipping(true);
    const id = window.setTimeout(() => {
      setShown(digit);
      setFlipping(false);
    }, 560);
    return () => window.clearTimeout(id);
  }, [digit, incoming]);

  return (
    <span className={`split-flap${flipping ? " is-flipping" : ""}`}>
      <span className="split-flap-inner">
        <span className="split-flap-half split-flap-static-top">
          <span className="split-flap-face">{incoming}</span>
        </span>
        <span className="split-flap-half split-flap-static-bottom">
          <span className="split-flap-face">{shown}</span>
        </span>
        <span className="split-flap-flip split-flap-flip-top">
          <span className="split-flap-face">{shown}</span>
        </span>
        <span className="split-flap-flip split-flap-flip-bottom">
          <span className="split-flap-face">{incoming}</span>
        </span>
        <span className="split-flap-hinge" aria-hidden />
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
      <div className="flex justify-center gap-[3px] sm:gap-1">
        {padded.split("").map((digit, index) => (
          <SplitFlapDigit key={`${label}-${index}`} digit={digit} />
        ))}
      </div>
      <p className="mt-2 text-[10px] tracking-[0.18em] uppercase text-ink-faint sm:text-[11px]">
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
    return <div className="mx-auto h-[4.75rem] max-w-md" aria-hidden />;
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
      className="flex justify-center gap-3 sm:gap-5"
      aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes, ${remaining.seconds} seconds until the wedding`}
    >
      <SplitFlapGroup label="Days" value={remaining.days} digits={3} />
      <SplitFlapGroup label="Hours" value={remaining.hours} digits={2} />
      <SplitFlapGroup label="Minutes" value={remaining.minutes} digits={2} />
      <SplitFlapGroup label="Seconds" value={remaining.seconds} digits={2} />
    </div>
  );
}
