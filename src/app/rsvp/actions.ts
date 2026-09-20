"use server";

import { createAnonSupabase } from "@/lib/supabase";

export type RsvpActionState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "duplicate" }
  | { status: "thanks-yes" }
  | { status: "thanks-no" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitRsvp(
  _prev: RsvpActionState,
  formData: FormData,
): Promise<RsvpActionState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const willAttend = String(formData.get("attending") ?? "yes") !== "no";
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
      if (error.code === "23505" || /duplicate|unique/i.test(error.message)) {
        return { status: "duplicate" };
      }

      console.error("RSVP insert failed", error);
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
