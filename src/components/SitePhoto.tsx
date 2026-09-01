import fs from "node:fs";
import path from "node:path";

type SitePhotoProps = {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
};

export function SitePhoto({
  src,
  alt,
  className = "",
  aspectClass = "aspect-[4/5]",
}: SitePhotoProps) {
  const relative = src.replace(/^\//, "");
  const filePath = path.join(process.cwd(), "public", relative);
  const exists = fs.existsSync(filePath);

  if (!exists) {
    return (
      <div
        className={`${aspectClass} w-full bg-[#f4f0ec] flex items-center justify-center ${className}`}
      >
        <p className="text-sm tracking-[0.18em] uppercase text-ink-faint">
          Photo coming soon
        </p>
      </div>
    );
  }

  return (
    <div className={`${aspectClass} w-full overflow-hidden ${className}`}>
      {/* Files are dropped into public/photos later; a plain img keeps missing files from breaking the build. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}
