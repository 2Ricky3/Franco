import { PageIntro } from "@/components/PageIntro";
import { RsvpForm } from "@/components/RsvpForm";
import { site } from "@/content/site";

export const metadata = {
  title: "RSVP",
};

export default function RsvpPage() {
  return (
    <div className="pb-20">
      <PageIntro title="RSVP">
        <p>
          Please RSVP by <strong>{site.rsvp.deadlineLabel}</strong> so we can
          have an accurate headcount.
        </p>
      </PageIntro>
      <div className="mt-12 px-5" data-aos="fade-up">
        <RsvpForm />
      </div>
    </div>
  );
}
