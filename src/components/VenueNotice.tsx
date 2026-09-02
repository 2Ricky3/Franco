import Link from "next/link";
import { site } from "@/content/site";
import { RichText } from "@/components/RichText";

type VenueNoticeProps = {
  compact?: boolean;
};

export function VenueNotice({ compact = false }: VenueNoticeProps) {
  return (
    <section className="mx-auto max-w-2xl px-5 text-center">
      <p className="text-[11px] font-medium tracking-[0.22em] uppercase">
        <span className="animate-important">IMPORTANT NOTICE</span>
      </p>
      <h2 className="mt-4 font-script text-3xl md:text-4xl">
        {site.travelNotice.title}
      </h2>
      <div className="mt-5 space-y-3 text-sm text-ink-soft">
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
