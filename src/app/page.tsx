import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { SitePhoto } from "@/components/SitePhoto";
import { VenueNotice } from "@/components/VenueNotice";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <div className="animate-fade-up pb-16">
      <section className="mx-auto max-w-3xl px-5 pt-8 text-center md:pt-14">
        <h1 className="font-script text-6xl leading-tight md:text-8xl">
          {site.couple.names}
        </h1>
        <div className="mx-auto mt-10 max-w-md md:mt-14">
          <SitePhoto
            src={site.photos.couple}
            alt={`${site.couple.names}`}
            aspectClass="aspect-[4/5]"
          />
        </div>
        <p className="mt-10 text-base tracking-[0.12em] uppercase md:text-lg">
          {site.wedding.dateLabel}
        </p>
        <p className="mt-2 text-base text-ink-soft md:text-lg">
          {site.wedding.locationLabel}
        </p>
        <Link
          href="/rsvp"
          className="mt-10 inline-block bg-fill px-10 py-3.5 text-sm tracking-[0.2em] uppercase text-white transition-opacity hover:opacity-85"
        >
          RSVP
        </Link>
        <div className="mt-12">
          <Countdown />
        </div>
      </section>

      <div className="mt-20">
        <VenueNotice compact />
      </div>
    </div>
  );
}
