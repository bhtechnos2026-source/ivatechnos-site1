import { TopBar } from "@/components/sections/TopBar";
import { Header } from "@/components/sections/Header";
import { ExecutiveSummary } from "@/components/sections/ExecutiveSummary";
import { RecommendedActions } from "@/components/sections/RecommendedActions";
import { TenderMatches } from "@/components/sections/TenderMatches";
import { Events } from "@/components/sections/Events";
import { IntelligenceGraph } from "@/components/sections/IntelligenceGraph";
import { Timeline } from "@/components/sections/Timeline";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="space-y-16 sm:space-y-20">
          <Header />
          <ExecutiveSummary />
          <RecommendedActions />
          <TenderMatches />
          <Events />
          <IntelligenceGraph />
          <Timeline />
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-8 text-xs text-ink-faint sm:flex-row">
          <p>EnterpriseCore — Company Intelligence Page (MVP)</p>
          <p>Built for ivatechnos · Coimbatore · Demo data</p>
        </div>
      </footer>
    </div>
  );
}
