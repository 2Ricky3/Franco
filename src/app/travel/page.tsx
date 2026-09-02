import { PageIntro } from "@/components/PageIntro";
import { RichText } from "@/components/RichText";
import { SitePhoto } from "@/components/SitePhoto";
import { VenueNotice } from "@/components/VenueNotice";
import { site } from "@/content/site";

export const metadata = {
  title: "Travel",
};

export default function TravelPage() {
  return (
    <div className="animate-fade-up pb-20">
      <PageIntro title="Travel" />
      <div className="mx-auto mt-8 max-w-md px-5">
        <SitePhoto
          src={site.photos.travel}
          alt="The way to the venue"
          aspectClass="aspect-[4/5]"
        />
      </div>

      <div className="mt-12">
        <VenueNotice />
      </div>

      <ol className="mx-auto mt-16 max-w-xl space-y-10 px-5">
        {site.travelSteps.map((step) => (
          <li key={step.step} className="text-center">
            <p className="text-sm tracking-[0.22em] uppercase text-ink-faint">
              Step {step.step}
            </p>
            <h3 className="mt-2 text-lg">{step.title}</h3>
            <p className="mt-2 text-ink-soft">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-col items-center gap-4 px-5">
        <a
          href={site.venue.directionsToTownUrl}
          target="_blank"
          rel="noreferrer"
          className="bg-fill px-8 py-3.5 text-sm tracking-[0.16em] uppercase text-white transition-opacity hover:opacity-85"
        >
          Get directions to Haenertsburg
        </a>
        <a
          href={site.venue.directionsToVenueUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm tracking-[0.14em] uppercase underline underline-offset-8 transition-opacity hover:opacity-70"
        >
          Then to Minas Farm Venue
        </a>
      </div>

      <section className="mx-auto mt-20 max-w-xl px-5 text-center">
        <h2 className="font-script text-4xl">{site.parking.title}</h2>
        <RichText className="mt-5 text-ink-soft" text={site.parking.body} />
      </section>
    </div>
  );
}
