import { PageIntro } from "@/components/PageIntro";
import { RichText } from "@/components/RichText";
import { SitePhoto } from "@/components/SitePhoto";
import { site } from "@/content/site";

export const metadata = {
  title: "Schedule",
};

export default function SchedulePage() {
  const events = [...site.schedule, ...site.scheduleTba];

  return (
    <div className="animate-fade-up pb-20">
      <PageIntro title="Schedule" />
      <div className="mx-auto mt-8 max-w-md px-5">
        <SitePhoto
          src={site.photos.schedule}
          alt="Angelique and Franco"
          aspectClass="aspect-[4/5]"
        />
      </div>
      <div className="mx-auto mt-12 max-w-2xl space-y-20 px-5">
        {events.map((event) => (
          <article key={event.id} className="text-center">
            <h2 className="font-script text-4xl md:text-5xl">{event.title}</h2>
            {event.venue && (
              <p className="mt-4 text-sm tracking-[0.16em] uppercase text-ink-soft">
                {event.id === "ceremony" ? `📍 ${event.venue}` : event.venue}
              </p>
            )}
            {event.photo && (
              <div className="mx-auto mt-8 max-w-lg">
                <SitePhoto
                  src={event.photo}
                  alt={event.title}
                  aspectClass="aspect-[4/5]"
                />
              </div>
            )}
            <div className="mt-8 space-y-4 text-ink-soft">
              {event.details.map((detail) => (
                <RichText key={detail} text={detail} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
