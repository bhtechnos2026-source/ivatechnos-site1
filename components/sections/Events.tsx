import { events } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, CalendarDays, Sparkles, Star } from "lucide-react";

export function Events() {
  return (
    <Section
      id="events"
      eyebrow="Be in the room"
      title="Events & Conferences"
      description="Strategic gatherings where buyers, OEMs, and competitors converge."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {events.map((e, i) => (
          <Card
            key={e.id}
            className="flex flex-col animate-fade-up hover:shadow-lift"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <CardContent className="flex flex-1 flex-col pt-6">
              <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink">
                {e.name}
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-ink-soft">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-ink-faint" />
                  {e.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-ink-faint" />
                  {e.date}
                </span>
              </div>

              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                  Why attend
                </p>
                <ul className="mt-2 space-y-1.5">
                  {e.reasons.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-2 text-sm text-ink-muted"
                    >
                      <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex items-start gap-2 rounded-xl bg-accent-soft px-4 py-3 text-sm text-accent">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  <span className="font-medium">Suggested action: </span>
                  {e.suggestedAction}
                </span>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="secondary" size="sm" className="flex-1">
                View Event
              </Button>
              <Button size="sm" className="flex-1">
                Generate Outreach
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}
