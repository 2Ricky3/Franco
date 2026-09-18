"use client";

import { useEffect, useRef } from "react";
import { animate, splitText, stagger } from "animejs";
import { site } from "@/content/site";

export function HomeTitle() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      title.style.opacity = "1";
      return;
    }

    let cancelled = false;
    let split: ReturnType<typeof splitText> | undefined;

    const start = async () => {
      try {
        if (document.fonts?.ready) {
          await document.fonts.ready;
        }
        if (cancelled || !titleRef.current) return;

        title.style.opacity = "1";
        split = splitText(title, { chars: true });
        const animation = animate(split.chars, {
          y: { from: "0.45em" },
          opacity: { from: 0 },
          duration: 900,
          ease: "out(3)",
          delay: stagger(32),
        });
        split.addEffect(() => animation);
      } catch {
        title.style.opacity = "1";
      }
    };

    void start();

    return () => {
      cancelled = true;
      split?.revert();
    };
  }, []);

  return (
    <h1
      ref={titleRef}
      className="home-title font-script whitespace-nowrap text-[clamp(2.15rem,8.4vw,3.4rem)] leading-none"
    >
      {site.couple.names}
    </h1>
  );
}
