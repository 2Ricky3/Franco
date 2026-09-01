import Link from "next/link";
import { site } from "@/content/site";
import { RichText } from "@/components/RichText";

type VenueNoticeProps = {
  compact?: boolean;
};

export function VenueNotice({ compact = false }: VenueNoticeProps) {
  return (
    <section className="mx-auto max-w-2xl px-5 text-center">
      <p className="text-[13px] font-medium tracking-[0.28em] uppercase">
        <span className="animate-important">IMPORTANT</span>
        {" — GETTING TO THE VENUE"}
      </p>
      <h2 className="mt-5 font-script text-4xl md:text-5xl">
        {site.travelNotice.title}
      </h2>
      <div className="mt-6 space-y-4 text-ink-soft">
        {site.travelNotice.paragraphs.map((paragraph) => (
          <RichText key={paragraph} text={paragraph} />
        ))}
      </div>
      {compact && (
        <Link
          href="/travel"
          className="mt-8 inline-block text-sm tracking-[0.16em] uppercase underline underline-offset-8 transition-opacity hover:opacity-70"
        >
          Read travel details
        </Link>
      )}
    </section>
  );
}
