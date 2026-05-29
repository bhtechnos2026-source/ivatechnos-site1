import { Button } from "@/components/ui/button";
import { Command } from "lucide-react";

const nav = [
  { href: "#actions", label: "Actions" },
  { href: "#tenders", label: "Tenders" },
  { href: "#events", label: "Events" },
  { href: "#graph", label: "Graph" },
  { href: "#timeline", label: "Timeline" },
];

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-white">
            <Command className="h-4 w-4" />
          </span>
          <div className="leading-none">
            <p className="text-sm font-semibold tracking-tight text-ink">
              EnterpriseCore
            </p>
            <p className="mt-0.5 text-[11px] text-ink-faint">
              AI Chief of Staff
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-lg px-3 py-1.5 text-sm text-ink-soft transition-colors hover:bg-surface hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <Button size="sm" className="hidden sm:inline-flex">
          Export Brief
        </Button>
      </div>
    </header>
  );
}
