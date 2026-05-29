import { timeline, type TimelineEntry } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { FileText, ShieldAlert, CalendarDays, Sparkles } from "lucide-react";

const kindMeta: Record<
  TimelineEntry["kind"],
  { icon: typeof FileText; ring: string; bg: string }
> = {
  tender: { icon: FileText, ring: "ring-indigo-100", bg: "bg-indigo-50 text-indigo-600" },
  risk: { icon: ShieldAlert, ring: "ring-red-100", bg: "bg-red-50 text-red-600" },
  event: { icon: CalendarDays, ring: "ring-amber-100", bg: "bg-amber-50 text-amber-600" },
  summary: { icon: Sparkles, ring: "ring-emerald-100", bg: "bg-emerald-50 text-emerald-600" },
};

export function Timeline() {
  return (
    <Section
      id="timeline"
      eyebrow="Live signals"
      title="Activity Timeline"
      description="Recent AI-generated signals and actions across your intelligence feeds."
    >
      <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
        <ol className="relative space-y-6">
          <span
            className="absolute left-[15px] top-2 bottom-2 w-px bg-line"
            aria-hidden
          />
          {timeline.map((entry) => {
            const meta = kindMeta[entry.kind];
            const Icon = meta.icon;
            return (
              <li key={entry.id} className="relative flex items-center gap-4">
                <span
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4 ring-white ${meta.bg}`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4">
                  <p className="text-sm font-medium text-ink">{entry.label}</p>
                  <time className="text-xs tabular-nums text-ink-faint">
                    {entry.time}
                  </time>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
