import { recommendations, type Priority } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, CalendarDays, ShieldAlert } from "lucide-react";

const priorityTone: Record<Priority, "high" | "medium" | "low"> = {
  high: "high",
  medium: "medium",
  low: "low",
};

const kindIcon = {
  tender: FileText,
  event: CalendarDays,
  risk: ShieldAlert,
};

export function RecommendedActions() {
  return (
    <Section
      id="actions"
      eyebrow="Do this today"
      title="Recommended Actions"
      description="Prioritized, AI-generated moves with the highest impact on revenue and risk."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {recommendations.map((rec, i) => {
          const Icon = kindIcon[rec.kind];
          return (
            <Card
              key={rec.id}
              className="group flex flex-col animate-fade-up hover:shadow-lift"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <CardContent className="flex flex-1 flex-col pt-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-ink-soft">
                    <Icon className="h-4 w-4" />
                  </span>
                  <Badge tone={priorityTone[rec.priority]}>
                    {rec.priority} priority
                  </Badge>
                </div>
                <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight text-ink">
                  {rec.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  <span className="font-medium text-ink-soft">Reason: </span>
                  {rec.rationale}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full justify-between group-hover:border-ink/20"
                >
                  {rec.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
