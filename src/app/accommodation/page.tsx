import { PageIntro } from "@/components/PageIntro";
import { SitePhoto } from "@/components/SitePhoto";
import { site } from "@/content/site";

export const metadata = {
  title: "Accommodation",
};

export default function AccommodationPage() {
  return (
    <div className="pb-20">
      <PageIntro title={site.accommodation.title} />
      <div
        className="mx-auto mt-10 max-w-2xl space-y-4 px-5 text-center text-ink-soft"
        data-aos="fade-up"
      >
        {site.accommodation.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <section className="mx-auto mt-16 max-w-2xl px-5">
        <h2 className="text-center font-script text-4xl" data-aos="fade-up">
          Directory
        </h2>
        <div className="mt-10 space-y-12">
          {site.accommodation.listings.map((listing) => (
            <article
              key={listing.id}
              className="text-center"
              data-aos="fade-up"
            >
              <h3 className="text-lg">{listing.name}</h3>
              <p className="mt-2 text-ink-soft">{listing.note}</p>
              {listing.photo ? (
                <div className="mx-auto mt-6 max-w-lg">
                  <SitePhoto
                    src={listing.photo}
                    alt={listing.name}
                    aspectClass="aspect-[16/10]"
                    animate={false}
                  />
                </div>
              ) : null}
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                {listing.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-fill px-6 py-3 text-sm tracking-[0.14em] uppercase text-white transition-opacity hover:opacity-85"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
