export function RichText({ text, className }: { text: string; className?: string }) {
  const paragraphs = text.split("\n\n");

  return (
    <div className={className}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={index > 0 ? "mt-4" : undefined}>
          {paragraph.split(/(\*\*[^*]+\*\*)/g).map((part, partIndex) => {
            const match = part.match(/^\*\*(.+)\*\*$/);
            if (match) {
              return <strong key={partIndex}>{match[1]}</strong>;
            }
            return <span key={partIndex}>{part}</span>;
          })}
        </p>
      ))}
    </div>
  );
}
