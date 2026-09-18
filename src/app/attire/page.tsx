import { PageIntro } from "@/components/PageIntro";
import { site } from "@/content/site";

export const metadata = {
  title: "Semi-formal attire",
  robots: { index: false, follow: false },
};

function AttireGallery({
  heading,
  pinterestLabel,
  pinterestUrl,
  photos,
}: {
  heading: string;
  pinterestLabel: string;
  pinterestUrl: string;
  photos: readonly { src: string; alt: string }[];
}) {
  return (
    <section className="mx-auto mt-16 max-w-lg px-5 text-center" data-aos="fade-up">
      <h2 className="font-script text-4xl md:text-5xl">{heading}</h2>
      <a
        href={pinterestUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-block text-sm tracking-[0.16em] uppercase underline underline-offset-8 transition-opacity hover:opacity-70"
      >
        {pinterestLabel}
      </a>
      <div className="mt-10 space-y-8">
        {photos.map((photo) => (
          <div key={photo.src} className="overflow-hidden rounded-2xl bg-[#f4f0ec]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.src} alt={photo.alt} className="h-auto w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function AttirePage() {
  const { attire } = site;

  return (
    <div className="pb-20">
      <PageIntro title={attire.title}>
        <p>{attire.intro}</p>
      </PageIntro>

      <AttireGallery
        heading={attire.women.heading}
        pinterestLabel={attire.women.pinterestLabel}
        pinterestUrl={attire.women.pinterestUrl}
        photos={attire.women.photos}
      />

      <AttireGallery
        heading={attire.men.heading}
        pinterestLabel={attire.men.pinterestLabel}
        pinterestUrl={attire.men.pinterestUrl}
        photos={attire.men.photos}
      />
    </div>
  );
}
