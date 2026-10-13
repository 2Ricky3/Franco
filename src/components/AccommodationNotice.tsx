"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

const STORAGE_KEY = "af-accommodation-notice";

export function AccommodationNotice() {
  const [visible, setVisible] = useState(false);
  const { notice } = site.accommodation;

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;

    function show() {
      setVisible(true);
      window.removeEventListener("scroll", onScroll);
    }

    function onScroll() {
      if (window.scrollY < 64) return;
      show();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function dismiss() {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="accommodation-notice fixed inset-x-0 bottom-0 z-50 border-t border-[#3d2b1f]/15 bg-background px-5 py-4 shadow-[0_-8px_24px_rgba(61,43,31,0.12)]"
      role="dialog"
      aria-labelledby="accommodation-notice-title"
      aria-describedby="accommodation-notice-body"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div>
          <p
            id="accommodation-notice-title"
            className="text-sm tracking-[0.14em] uppercase"
          >
            {notice.title}
          </p>
          <p id="accommodation-notice-body" className="mt-1 text-sm text-ink-soft">
            {notice.body}{" "}
            <a
              href={notice.phoneHref}
              className="font-medium text-ink underline underline-offset-4"
            >
              {notice.phoneLabel}
            </a>
          </p>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="bg-fill px-6 py-2.5 text-sm tracking-[0.14em] uppercase text-white transition-opacity hover:opacity-85"
        >
          {notice.dismissLabel}
        </button>
      </div>
    </div>
  );
}
