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

export function Countdown() {
  const target = useMemo(
    () => new Date(site.wedding.startAt).getTime(),
    [],
  );
  const [remaining, setRemaining] = useState(() => getRemaining(target));

  useEffect(() => {
    const id = window.setInterval(() => {
      setRemaining(getRemaining(target));
    }, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (remaining.done) {
    return (
      <p className="text-center text-sm tracking-[0.18em] uppercase text-ink-soft">
        Today&apos;s the day
      </p>
    );
  }

  const units = [
    { label: "Days", value: remaining.days },
    { label: "Hours", value: remaining.hours },
    { label: "Minutes", value: remaining.minutes },
    { label: "Seconds", value: remaining.seconds },
  ];

  return (
    <div className="flex justify-center gap-6 sm:gap-10">
      {units.map((unit) => (
        <div key={unit.label} className="text-center">
          <p className="text-2xl tabular-nums sm:text-3xl">
            {String(unit.value).padStart(2, "0")}
          </p>
          <p className="mt-1 text-[11px] tracking-[0.18em] uppercase text-ink-faint">
            {unit.label}
          </p>
        </div>
      ))}
    </div>
  );
}
