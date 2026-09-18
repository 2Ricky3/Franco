import Link from "next/link";
import type { ReactNode } from "react";

function renderInline(text: string) {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        <span key={`t-${key++}`}>{text.slice(lastIndex, match.index)}</span>,
      );
    }

    if (match[1]) {
      nodes.push(<strong key={`b-${key++}`}>{match[1]}</strong>);
    } else {
      const label = match[2];
      const href = match[3];
      const className = "underline underline-offset-4 transition-opacity hover:opacity-70";
      if (href.startsWith("/")) {
        nodes.push(
          <Link key={`l-${key++}`} href={href} className={className}>
            {label}
          </Link>,
        );
      } else {
        nodes.push(
          <a
            key={`a-${key++}`}
            href={href}
            target="_blank"
            rel="noreferrer"
            className={className}
          >
            {label}
          </a>,
        );
      }
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(<span key={`t-${key++}`}>{text.slice(lastIndex)}</span>);
  }

  return nodes;
}

export function RichText({ text, className }: { text: string; className?: string }) {
  const paragraphs = text.split("\n\n");

  return (
    <div className={className}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={index > 0 ? "mt-4" : undefined}>
          {renderInline(paragraph)}
        </p>
      ))}
    </div>
  );
}
