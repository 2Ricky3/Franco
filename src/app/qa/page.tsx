import { FaqAccordion } from "@/components/FaqAccordion";
import { PageIntro } from "@/components/PageIntro";
import { SitePhoto } from "@/components/SitePhoto";
import { site } from "@/content/site";

export const metadata = {
  title: "Q&A",
};

export default function QaPage() {
  return (
    <div className="animate-fade-up pb-20">
      <PageIntro title="Q&A" />
      <div className="mx-auto mt-8 max-w-md px-5">
        <SitePhoto
          src={site.photos.qa}
          alt="Angelique and Franco"
          aspectClass="aspect-[4/5]"
        />
      </div>
      <div className="mx-auto mt-10 max-w-2xl px-5">
        <FaqAccordion />
      </div>
    </div>
  );
}
