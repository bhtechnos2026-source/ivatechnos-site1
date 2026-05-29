import { tenders } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Clock, IndianRupee } from "lucide-react";

function MatchRing({ score }: { score: number }) {
  return (
    <div className="relative h-12 w-12 shrink-0">
      <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
        <circle
          cx="18"
          cy="18"
          r="15.5"
          fill="none"
          stroke="#ededed"
          strokeWidth="3"
        />
        <circle
          cx="18"
          cy="18"
          r="15.5"
          fill="none"
          stroke="#4f46e5"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${(score / 100) * 97.4} 97.4`}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-ink">
        {score}
      </span>
    </div>
  );
}

export function TenderMatches() {
  return (
    <Section
      id="tenders"
      eyebrow="Pipeline"
      title="Tender Matches"
      description="AI-matched tenders ranked by capability fit and win probability."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {tenders.map((t, i) => (
          <Card
            key={t.id}
            className="flex flex-col animate-fade-up hover:shadow-lift"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <CardContent className="flex flex-1 flex-col pt-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold leading-snug tracking-tight text-ink">
                  {t.title}
                </h3>
                <MatchRing score={t.matchScore} />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-soft">
                <span className="inline-flex items-center gap-1">
                  <IndianRupee className="h-3.5 w-3.5 text-ink-faint" />
                  {t.value}
                </span>
                <Badge
                  tone={
                    t.deadlineUrgency === "high"
                      ? "high"
                      : t.deadlineUrgency === "medium"
                        ? "medium"
                        : "low"
                  }
                >
                  <Clock className="h-3 w-3" />
                  {t.deadline}
                </Badge>
              </div>

              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                  Why matched
                </p>
                <ul className="mt-2 space-y-1.5">
                  {t.reasons.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-2 text-sm text-ink-muted"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="secondary" size="sm" className="flex-1">
                View Details
              </Button>
              <Button size="sm" className="flex-1">
                Prepare Proposal
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}
