import { PageIntro } from "@/components/PageIntro";
import { SitePhoto } from "@/components/SitePhoto";
import { site } from "@/content/site";

export const metadata = {
  title: "Registry",
};

export default function RegistryPage() {
  const contribution = site.registry.contribution;

  return (
    <div className="animate-fade-up pb-20">
      <PageIntro title={site.registry.title} />
      <div className="mx-auto mt-8 max-w-md px-5">
        <SitePhoto
          src={site.photos.registry}
          alt="Angelique and Franco"
          aspectClass="aspect-[4/5]"
        />
      </div>
      <div className="mx-auto mt-10 max-w-2xl space-y-4 px-5 text-center text-ink-soft">
        {site.registry.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <section className="mx-auto mt-16 max-w-md px-5 text-center">
        <h2 className="font-script text-4xl">{contribution.heading}</h2>
        <dl className="mt-8 space-y-4 text-ink-soft">
          <div>
            <dt className="text-[11px] tracking-[0.18em] uppercase text-ink-faint">
              Bank
            </dt>
            <dd className="mt-1">{contribution.bank}</dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.18em] uppercase text-ink-faint">
              Account name
            </dt>
            <dd className="mt-1">{contribution.accountName}</dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.18em] uppercase text-ink-faint">
              Account number
            </dt>
            <dd className="mt-1">{contribution.accountNumber}</dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.18em] uppercase text-ink-faint">
              Branch code
            </dt>
            <dd className="mt-1">{contribution.branchCode}</dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.18em] uppercase text-ink-faint">
              Account type
            </dt>
            <dd className="mt-1">{contribution.accountType}</dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.18em] uppercase text-ink-faint">
              Reference
            </dt>
            <dd className="mt-1">{contribution.referenceHint}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
