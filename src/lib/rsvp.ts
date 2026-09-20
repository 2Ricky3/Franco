import { createAnonSupabase } from "@/lib/supabase";

export type RsvpResult =
  | { status: "thanks-yes" }
  | { status: "thanks-no" }
  | { status: "duplicate" }
  | { status: "error"; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseRsvpInput(input: {
  fullName: string;
  email: string;
  notes: string;
  attending: string;
}) {
  return {
    fullName: input.fullName.trim(),
    email: input.email.trim(),
    notes: input.notes.trim(),
    willAttend: input.attending !== "no",
  };
}

export async function saveRsvp(input: {
  fullName: string;
  email: string;
  notes: string;
  attending: string;
}): Promise<RsvpResult> {
  const { fullName, email, notes, willAttend } = parseRsvpInput(input);
  const guestCount = willAttend ? 1 : 0;

  if (fullName.length < 2 || fullName.length > 120) {
    return { status: "error", message: "Please enter your full name." };
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 200) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  if (notes.length > 1000) {
    return {
      status: "error",
      message: "Additional information must be 1000 characters or fewer.",
    };
  }

  try {
    const supabase = createAnonSupabase();
    const { error } = await supabase.from("rsvps").insert({
      full_name: fullName,
      email,
      attending: willAttend,
      guest_count: guestCount,
      notes,
    });

    if (error) {
      if (
        error.code === "23505" ||
        error.code === "409" ||
        /duplicate|unique/i.test(`${error.message} ${error.details ?? ""}`)
      ) {
        return { status: "duplicate" };
      }

      console.error("RSVP insert failed", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return {
        status: "error",
        message: "Something went wrong. Please try again in a moment.",
      };
    }

    return { status: willAttend ? "thanks-yes" : "thanks-no" };
  } catch (error) {
    console.error("RSVP submit failed", error);
    return {
      status: "error",
      message: "Something went wrong. Please try again in a moment.",
    };
  }
}
