import { FaqAccordion } from "@/components/FaqAccordion";
import { PageIntro } from "@/components/PageIntro";

export const metadata = {
  title: "Q&A",
};

export default function QaPage() {
  return (
    <div className="animate-fade-up pb-20">
      <PageIntro title="Q&A">
        <p>A few details that may help you plan your weekend.</p>
      </PageIntro>
      <div className="mx-auto mt-10 max-w-2xl px-5">
        <FaqAccordion />
      </div>
    </div>
  );
}
