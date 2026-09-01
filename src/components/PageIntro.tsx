export function PageIntro({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl px-5 pt-10 text-center md:pt-16">
      <h1 className="font-script text-5xl md:text-6xl">{title}</h1>
      {children && (
        <div className="mt-6 space-y-4 text-ink-soft">{children}</div>
      )}
    </div>
  );
}
