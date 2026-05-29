import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent" | "high" | "medium" | "low" | "success";

const tones: Record<Tone, string> = {
  neutral: "bg-surface text-ink-soft border-line",
  accent: "bg-accent-soft text-accent border-accent/15",
  high: "bg-red-50 text-red-600 border-red-100",
  medium: "bg-amber-50 text-amber-600 border-amber-100",
  low: "bg-emerald-50 text-emerald-600 border-emerald-100",
  success: "bg-emerald-50 text-emerald-600 border-emerald-100",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5",
        "text-[11px] font-medium uppercase tracking-wide",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
