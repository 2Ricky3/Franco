import { PageIntro } from "@/components/PageIntro";
import { SitePhoto } from "@/components/SitePhoto";
import { site } from "@/content/site";

export const metadata = {
  title: "Accommodation",
};

export default function AccommodationPage() {
  return (
    <div className="animate-fade-up pb-20">
      <PageIntro title={site.accommodation.title} />
      <div className="mx-auto mt-10 max-w-2xl space-y-4 px-5 text-center text-ink-soft">
        {site.accommodation.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <section className="mx-auto mt-16 max-w-2xl px-5">
        <h2 className="text-center font-script text-4xl">Directory</h2>
        <div className="mt-10 space-y-12">
          {site.accommodation.listings.map((listing) => (
            <article key={listing.id} className="text-center">
              <h3 className="text-lg">{listing.name}</h3>
              <p className="mt-2 text-ink-soft">{listing.note}</p>
              {listing.photo ? (
                <div className="mx-auto mt-6 max-w-lg">
                  <SitePhoto
                    src={listing.photo}
                    alt={listing.name}
                    aspectClass="aspect-[16/10]"
                  />
                </div>
              ) : null}
              <a
                href={listing.url}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block bg-fill px-6 py-3 text-sm tracking-[0.14em] uppercase text-white transition-opacity hover:opacity-85"
              >
                Visit website
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
