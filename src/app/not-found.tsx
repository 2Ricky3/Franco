import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-5 py-24 text-center">
      <h1 className="font-script text-5xl">Page not found</h1>
      <p className="mt-4 text-ink-soft">This page isn’t part of the wedding website.</p>
      <Link
        href="/"
        className="mt-8 inline-block text-sm tracking-[0.16em] uppercase underline underline-offset-8"
      >
        Back home
      </Link>
    </div>
  );
}
