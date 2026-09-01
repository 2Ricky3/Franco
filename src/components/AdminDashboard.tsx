"use client";

import { logoutAdmin } from "@/app/admin/actions";
import type { RsvpRow } from "@/lib/admin";

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Johannesburg",
  });
}

function toCsv(rsvps: RsvpRow[]) {
  const header = [
    "Name",
    "Email",
    "Attending",
    "Guest count",
    "Notes",
    "Submitted",
  ];
  const rows = rsvps.map((rsvp) => [
    rsvp.full_name,
    rsvp.email,
    rsvp.attending ? "Yes" : "No",
    String(rsvp.guest_count),
    rsvp.notes,
    rsvp.created_at,
  ]);
  return [header, ...rows]
    .map((row) =>
      row
        .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
        .join(","),
    )
    .join("\n");
}

export function AdminDashboard({ rsvps }: { rsvps: RsvpRow[] }) {
  const confirmedGuests = rsvps
    .filter((rsvp) => rsvp.attending)
    .reduce((sum, rsvp) => sum + rsvp.guest_count, 0);
  const decliningParties = rsvps.filter((rsvp) => !rsvp.attending).length;
  const attendingParties = rsvps.filter((rsvp) => rsvp.attending).length;

  function downloadCsv() {
    const blob = new Blob([toCsv(rsvps)], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "angelique-franco-rsvps.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-5xl px-5 pb-20 pt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-script text-5xl">RSVPs</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Responses for Angelique & Franco
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={downloadCsv}
            className="bg-fill px-4 py-2 text-xs tracking-[0.14em] uppercase text-white transition-opacity hover:opacity-85"
          >
            Download CSV
          </button>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="px-4 py-2 text-xs tracking-[0.14em] uppercase text-ink-soft transition-opacity hover:opacity-70"
            >
              Log out
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-ink-faint">
            Confirmed guests
          </p>
          <p className="mt-2 text-3xl tabular-nums">{confirmedGuests}</p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-ink-faint">
            Attending parties
          </p>
          <p className="mt-2 text-3xl tabular-nums">{attendingParties}</p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-ink-faint">
            Declining parties
          </p>
          <p className="mt-2 text-3xl tabular-nums">{decliningParties}</p>
        </div>
      </div>

      <div className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="text-[11px] tracking-[0.16em] uppercase text-ink-faint">
              <th className="py-3 font-medium">Name</th>
              <th className="py-3 font-medium">Email</th>
              <th className="py-3 font-medium">Attending</th>
              <th className="py-3 font-medium">Guests</th>
              <th className="py-3 font-medium">Notes</th>
              <th className="py-3 font-medium">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-ink-soft">
                  No RSVPs yet.
                </td>
              </tr>
            ) : (
              rsvps.map((rsvp) => (
                <tr key={rsvp.id} className="align-top">
                  <td className="py-3 pr-4">{rsvp.full_name}</td>
                  <td className="py-3 pr-4">{rsvp.email}</td>
                  <td className="py-3 pr-4">
                    {rsvp.attending ? "Yes" : "No"}
                  </td>
                  <td className="py-3 pr-4 tabular-nums">{rsvp.guest_count}</td>
                  <td className="py-3 pr-4 text-ink-soft">{rsvp.notes || "—"}</td>
                  <td className="py-3 text-ink-soft">
                    {formatDate(rsvp.created_at)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
