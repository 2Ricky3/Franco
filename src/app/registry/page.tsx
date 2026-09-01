import { PageIntro } from "@/components/PageIntro";
import { site } from "@/content/site";

export const metadata = {
  title: "Registry",
};

function hasContributionDetails() {
  const { accountName, bank, accountNumber, branchCode } =
    site.registry.contribution;
  return Boolean(accountName || bank || accountNumber || branchCode);
}

export default function RegistryPage() {
  const contribution = site.registry.contribution;
  const ready = hasContributionDetails();

  return (
    <div className="animate-fade-up pb-20">
      <PageIntro title={site.registry.title}>
        {site.registry.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </PageIntro>

      <section className="mx-auto mt-16 max-w-md px-5 text-center">
        <h2 className="font-script text-4xl">{contribution.heading}</h2>
        {ready ? (
          <dl className="mt-8 space-y-4 text-ink-soft">
            {contribution.accountName && (
              <div>
                <dt className="text-[11px] tracking-[0.18em] uppercase text-ink-faint">
                  Account name
                </dt>
                <dd className="mt-1">{contribution.accountName}</dd>
              </div>
            )}
            {contribution.bank && (
              <div>
                <dt className="text-[11px] tracking-[0.18em] uppercase text-ink-faint">
                  Bank
                </dt>
                <dd className="mt-1">{contribution.bank}</dd>
              </div>
            )}
            {contribution.accountNumber && (
              <div>
                <dt className="text-[11px] tracking-[0.18em] uppercase text-ink-faint">
                  Account number
                </dt>
                <dd className="mt-1">{contribution.accountNumber}</dd>
              </div>
            )}
            {contribution.branchCode && (
              <div>
                <dt className="text-[11px] tracking-[0.18em] uppercase text-ink-faint">
                  Branch code
                </dt>
                <dd className="mt-1">{contribution.branchCode}</dd>
              </div>
            )}
            <p className="pt-2 text-sm">{contribution.referenceHint}</p>
          </dl>
        ) : (
          <p className="mt-6 text-ink-soft">{contribution.placeholder}</p>
        )}
      </section>
    </div>
  );
}
