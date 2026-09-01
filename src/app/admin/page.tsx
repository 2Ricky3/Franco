import { loginAdmin } from "@/app/admin/actions";
import { AdminDashboard } from "@/components/AdminDashboard";
import { fetchAdminRsvps, isAdminLoggedIn } from "@/lib/admin";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const loggedIn = await isAdminLoggedIn();
  const params = await searchParams;

  if (loggedIn) {
    const rsvps = await fetchAdminRsvps();
    return <AdminDashboard rsvps={rsvps} />;
  }

  return (
    <div className="mx-auto max-w-sm px-5 py-20 text-center">
      <h1 className="font-script text-5xl">Couple login</h1>
      <p className="mt-4 text-sm text-ink-soft">
        View RSVP responses and guest totals.
      </p>
      <form action={loginAdmin} className="mt-10 text-left">
        <label className="block">
          <span className="text-sm tracking-[0.14em] uppercase">Password</span>
          <input
            required
            type="password"
            name="password"
            className="mt-2 w-full border-0 border-b border-[#3d2b1f]/30 bg-transparent py-3 outline-none focus:border-ink"
          />
        </label>
        {params.error && (
          <p className="mt-4 text-sm text-ink-soft">That password isn&apos;t right.</p>
        )}
        <button
          type="submit"
          className="mt-8 w-full bg-fill py-3 text-sm tracking-[0.18em] uppercase text-white transition-opacity hover:opacity-85"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
