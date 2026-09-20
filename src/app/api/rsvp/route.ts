import { NextResponse } from "next/server";
import { saveRsvp } from "@/lib/rsvp";

export const dynamic = "force-dynamic";

async function readInput(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = (await request.json()) as Record<string, unknown>;
    return {
      fullName: String(body.fullName ?? ""),
      email: String(body.email ?? ""),
      notes: String(body.notes ?? ""),
      attending: String(body.attending ?? "yes"),
    };
  }

  const formData = await request.formData();
  return {
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    notes: String(formData.get("notes") ?? ""),
    attending: String(formData.get("attending") ?? "yes"),
  };
}

export async function POST(request: Request) {
  try {
    const input = await readInput(request);
    const result = await saveRsvp(input);
    const wantsJson =
      (request.headers.get("accept") ?? "").includes("application/json") ||
      (request.headers.get("content-type") ?? "").includes("application/json");

    if (wantsJson) {
      return NextResponse.json(result);
    }

    const url = new URL("/rsvp", request.url);
    url.searchParams.set("result", result.status);
    return NextResponse.redirect(url, 303);
  } catch (error) {
    console.error("RSVP route failed", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Something went wrong. Please try again in a moment.",
      },
      { status: 500 },
    );
  }
}
