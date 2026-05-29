import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  action,
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-ink-faint">
              {eyebrow}
            </p>
          )}
          <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            {title}
          </h2>
          {description && (
            <p className="mt-1.5 max-w-2xl text-sm text-ink-muted">
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children}
    </section>
  );
}
