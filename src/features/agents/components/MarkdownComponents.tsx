"use client";

import { AnchorHTMLAttributes, FC, HTMLAttributes } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const MarkdownLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  href,
  children,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary font-medium hover:underline inline-flex items-center gap-0.5 cursor-pointer underline-offset-2"
  >
    {children}
    <ExternalLink className="size-3 inline shrink-0" />
  </a>
);

export const MARKDOWN_COMPONENTS = {
  a: MarkdownLink,
  h1: ({ children }: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-xl font-bold text-foreground mt-4 mb-2 tracking-tight">
      {children}
    </h1>
  ),
  h2: ({ children }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-lg font-bold text-foreground mt-3 mb-1.5 tracking-tight">
      {children}
    </h2>
  ),
  h3: ({ children }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-base font-semibold text-foreground mt-2.5 mb-1 tracking-tight">
      {children}
    </h3>
  ),
  p: ({ children }: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="leading-relaxed mb-2 last:mb-0 text-foreground/90">
      {children}
    </p>
  ),
  ul: ({ children }: HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-5 my-2 space-y-1 text-foreground/90">
      {children}
    </ul>
  ),
  ol: ({ children }: HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-5 my-2 space-y-1 text-foreground/90">
      {children}
    </ol>
  ),
  li: ({ children }: HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed pl-0.5">{children}</li>
  ),
  blockquote: ({ children }: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-3 border-primary bg-primary/5 dark:bg-primary/10 pl-3.5 py-2 my-2.5 italic rounded-r-lg text-foreground/90">
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }: HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "font-mono text-xs bg-muted/80 text-primary px-1.5 py-0.5 rounded border border-border/40 font-medium",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  ),
  del: ({ children }: HTMLAttributes<HTMLElement>) => (
    <del className="line-through text-muted-foreground">{children}</del>
  ),
  hr: () => <hr className="my-3 border-border/60" />,
};
