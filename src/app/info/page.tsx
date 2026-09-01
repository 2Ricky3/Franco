import { PageIntro } from "@/components/PageIntro";
import { site } from "@/content/site";

export const metadata = {
  title: "Additional Information",
};

export default function InfoPage() {
  return (
    <div className="animate-fade-up pb-20">
      <PageIntro title={site.additionalInfo.title} />
      <div className="mx-auto mt-12 max-w-xl space-y-12 px-5 text-center">
        {site.additionalInfo.items.map((item) => (
          <article key={item.id}>
            <h2 className="font-script text-4xl">{item.title}</h2>
            <p className="mt-4 text-ink-soft">{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
