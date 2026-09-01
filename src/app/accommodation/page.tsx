import { PageIntro } from "@/components/PageIntro";
import { SitePhoto } from "@/components/SitePhoto";
import { site } from "@/content/site";

export const metadata = {
  title: "Where to Stay",
};

export default function AccommodationPage() {
  return (
    <div className="animate-fade-up pb-20">
      <PageIntro title={site.accommodation.title}>
        {site.accommodation.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </PageIntro>

      <div className="mx-auto mt-12 max-w-2xl px-5">
        <SitePhoto
          src={site.photos.accommodationDirectory}
          alt={site.accommodation.directoryImageCaption}
          aspectClass="aspect-[3/4] md:aspect-[4/3]"
        />
        <p className="mt-3 text-center text-sm text-ink-faint">
          {site.accommodation.directoryImageCaption}
        </p>
      </div>

      <section className="mx-auto mt-16 max-w-2xl px-5">
        <h2 className="text-center font-script text-4xl">Directory</h2>
        <div className="mt-10 space-y-12">
          {site.accommodation.listings.map((listing) => (
            <article key={listing.id} className="text-center">
              <SitePhoto
                src={listing.photo}
                alt={listing.name}
                aspectClass="aspect-[16/10]"
              />
              <h3 className="mt-6 text-lg">{listing.name}</h3>
              <p className="mt-2 text-ink-soft">{listing.note}</p>
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
