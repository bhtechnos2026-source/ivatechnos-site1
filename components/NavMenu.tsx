"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Moon, Sun, FileDown, Cpu, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavMenuProps {
  dark: boolean;
  onToggle: () => void;
  activeCompany: "iva" | "geco";
}

export function NavMenu({ dark, onToggle, activeCompany }: NavMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={ref} className="fixed right-4 top-4 z-50">
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-card text-ink-muted shadow-lift transition-colors hover:text-ink"
        aria-label="Open menu"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-11 w-56 overflow-hidden rounded-xl border border-line bg-card shadow-lift animate-fade-up">
          {/* Companies */}
          <p className="px-3 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
            Companies
          </p>

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors hover:bg-surface",
              activeCompany === "geco" ? "text-ink font-semibold" : "text-ink-soft"
            )}
          >
            <Wrench className="h-4 w-4 shrink-0 text-indigo-500" />
            Geco Bicelli
            {activeCompany === "geco" && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500" />
            )}
          </Link>

          <Link
            href="/ivatechnos"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors hover:bg-surface",
              activeCompany === "iva" ? "text-ink font-semibold" : "text-ink-soft"
            )}
          >
            <Cpu className="h-4 w-4 shrink-0 text-violet-500" />
            IVA Technos
            {activeCompany === "iva" && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500" />
            )}
          </Link>

          <div className="my-1 border-t border-line" />

          {/* Settings */}
          <p className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
            Settings
          </p>

          <button
            onClick={onToggle}
            className="flex w-full items-center gap-2.5 px-3 py-2.5 text-sm text-ink-soft transition-colors hover:bg-surface"
          >
            {dark ? (
              <Sun className="h-4 w-4 shrink-0 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 shrink-0 text-slate-400" />
            )}
            {dark ? "Light Mode" : "Dark Mode"}
          </button>

          <div className="my-1 border-t border-line" />

          {/* Export */}
          <button className="flex w-full items-center gap-2.5 px-3 py-2.5 pb-3 text-sm text-ink-soft transition-colors hover:bg-surface">
            <FileDown className="h-4 w-4 shrink-0 text-emerald-500" />
            Export Brief
          </button>
        </div>
      )}
    </div>
  );
}
