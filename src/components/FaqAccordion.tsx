"use client";

import { useState } from "react";
import { RichText } from "@/components/RichText";
import { site } from "@/content/site";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[#3d2b1f]/15">
      {site.faqs.map((faq, index) => {
        const open = openIndex === index;
        return (
          <div key={faq.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span className="text-base md:text-lg">{faq.question}</span>
              <span className="text-xl leading-none text-ink-faint" aria-hidden>
                {open ? "–" : "+"}
              </span>
            </button>
            {open && (
              <div className="pb-6 text-ink-soft">
                <RichText text={faq.answer} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
