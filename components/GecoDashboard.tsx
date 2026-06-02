"use client";

import { useState, useMemo, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
} from "reactflow";
import {
  gecoCompany,
  gecoRecommendations,
  gecoTenders,
  gecoEvents,
  gecoTimeline,
  gecoGraphNodes,
  gecoGraphEdges,
  type GecoGraphNode,
} from "@/lib/geco-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/Modal";
import { NavMenu } from "@/components/NavMenu";
import {
  Building2,
  Users,
  Package,
  FileText,
  CalendarDays,
  Swords,
  Handshake,
  Check,
  Clock,
  Sparkles,
  MapPin,
  Star,
  AlertTriangle,
  ChevronRight,
  Maximize2,
  TrendingUp,
  Layers,
  IndianRupee,
  Radio,
  Wrench,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type GNodeType = GecoGraphNode["type"];
type ModalId =
  | `action:${string}`
  | `tender:${string}`
  | `event:${string}`
  | "graph";

// ─── Graph node (stable reference) ───────────────────────────────────────────

const gNodeMeta: Record<
  GNodeType,
  { label: string; icon: typeof Building2; bg: string; dot: string }
> = {
  company:    { label: "Company",    icon: Building2,    bg: "bg-indigo-800 text-white shadow-md", dot: "bg-indigo-700" },
  partner:    { label: "JV Partner", icon: Handshake,    bg: "bg-card border border-line shadow-card", dot: "bg-violet-500" },
  customer:   { label: "Customer",   icon: Users,        bg: "bg-card border border-line shadow-card", dot: "bg-teal-500"   },
  product:    { label: "Product",    icon: Package,      bg: "bg-card border border-line shadow-card", dot: "bg-orange-500" },
  tender:     { label: "Tender",     icon: FileText,     bg: "bg-card border border-line shadow-card", dot: "bg-amber-500" },
  event:      { label: "Event",      icon: CalendarDays, bg: "bg-card border border-line shadow-card", dot: "bg-sky-500"    },
  competitor: { label: "Competitor", icon: Swords,       bg: "bg-card border border-line shadow-card", dot: "bg-red-400"   },
};

function GecoIntelNode({ data }: NodeProps<{ label: string; type: GNodeType }>) {
  const meta = gNodeMeta[data.type];
  const Icon = meta.icon;
  const isCompany = data.type === "company";
  return (
    <div className={cn("flex items-center gap-2 rounded-xl px-3 py-2 font-medium", meta.bg, isCompany && "scale-110")}>
      <Handle type="target" position={Position.Top}    style={{ opacity: 0 }} />
      <span className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded", isCompany ? "bg-white/20" : "bg-surface")}>
        <Icon className={cn("h-3 w-3", isCompany ? "text-white" : "text-ink-soft")} />
      </span>
      <div className="leading-tight">
        <p className={cn("text-[12px] font-semibold", isCompany ? "text-white" : "text-ink")}>{data.label}</p>
        <p className={cn("text-[9px] uppercase tracking-wide", isCompany ? "text-white/50" : "text-ink-faint")}>{meta.label}</p>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
}

const gecoNodeTypes = { intel: GecoIntelNode };

const gecoPositions: Record<string, { x: number; y: number }> = {
  gco:     { x: 255, y: 165 },
  "part-1":{ x: 490, y: 55  },
  "cust-1":{ x: 35,  y: 50  },
  "cust-2":{ x: 20,  y: 185 },
  "prod-1":{ x: 55,  y: 320 },
  "prod-2":{ x: 275, y: 340 },
  "tend-1":{ x: 15,  y: 425 },
  "ev-1":  { x: 490, y: 185 },
  "comp-1":{ x: 490, y: 315 },
};

// ─── Modal detail panels ──────────────────────────────────────────────────────

function ActionDetail({ id }: { id: string }) {
  const rec = gecoRecommendations.find((r) => r.id === id);
  if (!rec) return null;
  const kindIcon = { tender: FileText, event: CalendarDays, risk: AlertTriangle };
  const Icon = kindIcon[rec.kind];
  return (
    <div className="space-y-5 p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500 dark:bg-indigo-900/30">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <Badge tone={rec.priority === "high" ? "high" : rec.priority === "medium" ? "medium" : "low"} className="mb-2">
            {rec.priority} priority
          </Badge>
          <h3 className="text-lg font-semibold text-ink">{rec.title}</h3>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-ink-muted">{rec.detail}</p>
      <div className="rounded-xl border border-line bg-surface p-4 text-sm text-ink-soft">
        <span className="font-medium text-ink">Quick rationale: </span>{rec.rationale}
      </div>
      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">{rec.cta} →</Button>
    </div>
  );
}

function TenderDetail({ id }: { id: string }) {
  const t = gecoTenders.find((x) => x.id === id);
  if (!t) return null;
  const urgencyTone = t.deadlineDays <= 14 ? "high" : t.deadlineDays <= 30 ? "medium" : "low";
  return (
    <div className="space-y-5 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-ink-faint">{t.client}</p>
          <h3 className="mt-1 text-lg font-semibold text-ink">{t.title}</h3>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-2xl font-bold text-orange-500">{t.matchScore}%</p>
          <p className="text-[11px] text-ink-faint">match score</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-ink-muted">{t.description}</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-orange-100 bg-orange-50 p-3 dark:border-orange-900/30 dark:bg-orange-900/20">
          <p className="text-[11px] uppercase tracking-wide text-orange-600 dark:text-orange-400">Value</p>
          <p className="mt-1 flex items-center gap-1 text-base font-semibold text-ink">
            <IndianRupee className="h-4 w-4" />{t.value.replace("₹", "")}
          </p>
        </div>
        <div className="rounded-xl border border-line p-3">
          <p className="text-[11px] uppercase tracking-wide text-ink-faint">Deadline</p>
          <Badge tone={urgencyTone} className="mt-2"><Clock className="h-3 w-3" /> {t.deadline}</Badge>
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-faint">Why matched</p>
        <ul className="space-y-2">
          {t.reasons.map((r) => (
            <li key={r} className="flex items-center gap-2 text-sm text-ink-muted">
              <Check className="h-4 w-4 shrink-0 text-teal-500" />{r}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1">View Details</Button>
        <Button className="flex-1 bg-orange-500 hover:bg-orange-600">Prepare Proposal</Button>
      </div>
    </div>
  );
}

function EventDetail({ id }: { id: string }) {
  const ev = gecoEvents.find((x) => x.id === id);
  if (!ev) return null;
  return (
    <div className="space-y-5 p-6">
      <div>
        <h3 className="text-lg font-semibold text-ink">{ev.name}</h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft">
          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-ink-faint" />{ev.location}</span>
          <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-ink-faint" />{ev.date}</span>
          <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-ink-faint" />{ev.attendees}</span>
        </div>
      </div>
      <div className="rounded-xl border border-teal-100 bg-teal-50 p-4 text-sm text-teal-700 dark:border-teal-900/30 dark:bg-teal-900/20 dark:text-teal-300">
        <p className="mb-1 flex items-center gap-1.5 font-medium"><Sparkles className="h-4 w-4" /> Suggested action</p>
        <p>{ev.suggestedAction}</p>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-faint">Why attend</p>
        <ul className="space-y-2">
          {ev.reasons.map((r) => (
            <li key={r} className="flex items-center gap-2 text-sm text-ink-muted">
              <Star className="h-4 w-4 shrink-0 text-amber-400" />{r}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1">View Event</Button>
        <Button className="flex-1 bg-teal-600 hover:bg-teal-700">Generate Outreach</Button>
      </div>
    </div>
  );
}

function GraphFullView() {
  const nodes: Node[] = useMemo(() =>
    gecoGraphNodes.map((n) => ({
      id: n.id, type: "intel",
      position: gecoPositions[n.id] ?? { x: 0, y: 0 },
      data: { label: n.label, type: n.type },
    })), []
  );
  const edges: Edge[] = useMemo(() =>
    gecoGraphEdges.map((e, i) => ({
      id: `ge-${i}`, source: e.source, target: e.target, label: e.label,
      animated: e.source === "gco",
      labelStyle: { fontSize: 10, fill: "rgb(var(--clr-ink-faint))" },
      labelBgStyle: { fill: "rgb(var(--clr-card))", fillOpacity: 0.9 },
      style: { strokeWidth: 1.5 },
    })), []
  );
  return (
    <div className="h-[70vh] w-full bg-surface">
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={gecoNodeTypes}
        fitView fitViewOptions={{ padding: 0.15 }} minZoom={0.3} maxZoom={2}
        proOptions={{ hideAttribution: true }}>
        <Background gap={20} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-card lg:flex">
      <div className="border-b border-line p-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-800 text-white">
            <Wrench className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold tracking-tight text-ink">{gecoCompany.name}</p>
            <p className="text-[11px] text-ink-faint">{gecoCompany.tagline}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            { label: "Revenue",  value: gecoCompany.revenue   },
            { label: "Team",     value: gecoCompany.employees },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-surface px-2.5 py-2">
              <p className="text-[10px] uppercase tracking-wide text-ink-faint">{s.label}</p>
              <p className="mt-0.5 text-xs font-semibold text-ink">{s.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-[11px] text-ink-faint">
          <MapPin className="h-3 w-3" /> {gecoCompany.location}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-faint">
          <Handshake className="h-3 w-3" /> {gecoCompany.ownership}
        </p>
      </div>

      <div className="border-b border-line p-5">
        <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-ink-faint">Key Products</p>
        <ul className="space-y-2">
          {gecoCompany.products.map((p) => (
            <li key={p} className="flex items-center gap-2 text-xs text-ink-soft">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />{p}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-ink-faint">Capabilities</p>
        <div className="flex flex-wrap gap-1.5">
          {gecoCompany.services.map((s) => (
            <span key={s} className="rounded-full border border-line bg-surface px-2 py-0.5 text-[11px] text-ink-soft">{s}</span>
          ))}
        </div>
      </div>

      <div className="border-t border-line p-4">
        <div className="flex items-center gap-2 text-[11px] text-ink-faint">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
          </span>
          Live · updated just now
        </div>
      </div>
    </aside>
  );
}

// ─── About Banner ─────────────────────────────────────────────────────────────

function AboutBanner() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-card px-5 py-4 shadow-card">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500 dark:bg-indigo-900/30">
        <Wrench className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-faint">About Bicelli Geco</p>
        <p className="mt-0.5 text-sm font-medium leading-snug text-ink">{gecoCompany.summary}</p>
      </div>
      <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-[11px] font-medium text-indigo-600 dark:border-indigo-700/40 dark:bg-indigo-900/25 dark:text-indigo-300 sm:inline-flex">
        <Sparkles className="h-3 w-3" />Generated by BlueLynk AI
      </span>
    </div>
  );
}

// ─── Actions Widget — indigo ──────────────────────────────────────────────────

function ActionsWidget({ onExpand }: { onExpand: (id: string) => void }) {
  const kindIcon = { tender: FileText, event: CalendarDays, risk: AlertTriangle };
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-line bg-card shadow-card">
      <div className="flex shrink-0 items-center justify-between border-b border-indigo-100 bg-indigo-50 px-4 py-3 dark:border-indigo-900/40 dark:bg-indigo-900/20">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-3.5 w-3.5 text-indigo-500" />
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">Recommended Actions</p>
        </div>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
          {gecoRecommendations.length}
        </span>
      </div>
      <div className="divide-y divide-line overflow-y-auto">
        {gecoRecommendations.map((rec) => {
          const Icon = kindIcon[rec.kind];
          return (
            <button
              key={rec.id}
              onClick={() => onExpand(rec.id)}
              className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-indigo-50/50 dark:hover:bg-indigo-900/15"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-400 group-hover:bg-indigo-100 dark:bg-indigo-900/30 dark:group-hover:bg-indigo-900/50">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{rec.title}</p>
                <p className="truncate text-[11px] text-ink-faint">{rec.rationale}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge tone={rec.priority === "high" ? "high" : rec.priority === "medium" ? "medium" : "low"}>{rec.priority}</Badge>
                <ChevronRight className="h-3.5 w-3.5 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </button>
          );
        })}
      </div>
      <div className="border-t border-indigo-100 px-4 py-2.5 text-[11px] text-ink-faint dark:border-indigo-900/30">
        <Sparkles className="mr-1 inline h-3 w-3 align-middle text-indigo-400" />
        BlueLynk AI identified 2 more strategic actions this week
        <span className="ml-1 cursor-pointer text-indigo-500 underline dark:text-indigo-400">View all →</span>
      </div>
    </div>
  );
}

// ─── Tenders Widget — orange ──────────────────────────────────────────────────

function MatchBar({ score }: { score: number }) {
  const color = score >= 85 ? "bg-teal-500" : score >= 75 ? "bg-orange-400" : "bg-ink-faint";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-line">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${score}%` }} />
      </div>
      <span className="text-[11px] font-semibold tabular-nums text-ink-soft">{score}%</span>
    </div>
  );
}

function TendersWidget({ onExpand }: { onExpand: (id: string) => void }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-line bg-card shadow-card">
      <div className="flex shrink-0 items-center justify-between border-b border-orange-100 bg-orange-50 px-4 py-3 dark:border-orange-900/40 dark:bg-orange-900/20">
        <div className="flex items-center gap-2">
          <FileText className="h-3.5 w-3.5 text-orange-500" />
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-700 dark:text-orange-300">Tender Pipeline</p>
        </div>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
          {gecoTenders.length}
        </span>
      </div>
      <div className="divide-y divide-line overflow-y-auto">
        {gecoTenders.map((t) => {
          const urgencyTone = t.deadlineDays <= 14 ? "high" : t.deadlineDays <= 30 ? "medium" : "low";
          return (
            <button
              key={t.id}
              onClick={() => onExpand(t.id)}
              className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-orange-50/50 dark:hover:bg-orange-900/15"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{t.title}</p>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="text-[11px] text-ink-faint">{t.value}</span>
                  <Badge tone={urgencyTone} className="text-[10px]"><Clock className="h-2.5 w-2.5" /> {t.deadline}</Badge>
                </div>
              </div>
              <div className="shrink-0"><MatchBar score={t.matchScore} /></div>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          );
        })}
      </div>
      <div className="border-t border-orange-100 px-4 py-2.5 text-[11px] text-ink-faint dark:border-orange-900/30">
        <Sparkles className="mr-1 inline h-3 w-3 align-middle text-orange-400" />
        BlueLynk AI found 3 more matching tenders this month
        <span className="ml-1 cursor-pointer text-orange-500 underline dark:text-orange-400">View all →</span>
      </div>
    </div>
  );
}

// ─── Events Widget — teal ─────────────────────────────────────────────────────

function EventsWidget({ onExpand }: { onExpand: (id: string) => void }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-line bg-card shadow-card">
      <div className="flex shrink-0 items-center justify-between border-b border-teal-100 bg-teal-50 px-4 py-3 dark:border-teal-900/40 dark:bg-teal-900/20">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5 text-teal-500" />
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">Events & Conferences</p>
        </div>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-[10px] font-bold text-white">
          {gecoEvents.length}
        </span>
      </div>
      <div className="divide-y divide-line overflow-y-auto">
        {gecoEvents.map((ev) => (
          <button
            key={ev.id}
            onClick={() => onExpand(ev.id)}
            className="group flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-teal-50/50 dark:hover:bg-teal-900/15"
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-400 group-hover:bg-teal-100 dark:bg-teal-900/30 dark:group-hover:bg-teal-900/50">
              <CalendarDays className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{ev.name}</p>
              <p className="flex items-center gap-1 text-[11px] text-ink-faint">
                <MapPin className="h-2.5 w-2.5" /> {ev.location} · {ev.date}
              </p>
              <p className="mt-1 line-clamp-2 text-[11px] text-ink-muted">{ev.suggestedAction}</p>
            </div>
            <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>
      <div className="border-t border-teal-100 px-4 py-2.5 text-[11px] text-ink-faint dark:border-teal-900/30">
        <Sparkles className="mr-1 inline h-3 w-3 align-middle text-amber-400" />
        BlueLynk AI identifies 4 more sector events this quarter
        <span className="ml-1 cursor-pointer text-teal-500 underline dark:text-teal-400">View all →</span>
      </div>
    </div>
  );
}

// ─── Graph Widget ─────────────────────────────────────────────────────────────

function GraphWidget({ onExpand }: { onExpand: () => void }) {
  const nodes: Node[] = useMemo(() =>
    gecoGraphNodes.map((n) => ({
      id: n.id, type: "intel",
      position: gecoPositions[n.id] ?? { x: 0, y: 0 },
      data: { label: n.label, type: n.type },
    })), []
  );
  const edges: Edge[] = useMemo(() =>
    gecoGraphEdges.map((e, i) => ({
      id: `ge-${i}`, source: e.source, target: e.target, label: e.label,
      animated: e.source === "gco",
      labelStyle: { fontSize: 10, fill: "rgb(var(--clr-ink-faint))" },
      labelBgStyle: { fill: "rgb(var(--clr-card))", fillOpacity: 0.9 },
      style: { strokeWidth: 1.5, stroke: "rgb(var(--clr-line))" },
    })), []
  );
  const legendTypes = Object.keys(gNodeMeta) as GNodeType[];

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-line bg-card shadow-card">
      <div className="flex shrink-0 items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <Layers className="h-3.5 w-3.5 text-ink-faint" />
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Intelligence Graph</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden flex-wrap gap-1.5 xl:flex">
            {legendTypes.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 rounded-full border border-line px-2 py-0.5 text-[10px] text-ink-faint">
                <span className={cn("h-1.5 w-1.5 rounded-full", gNodeMeta[t].dot)} />
                {gNodeMeta[t].label}
              </span>
            ))}
          </div>
          <button
            onClick={onExpand}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-surface text-ink-muted transition-colors hover:bg-card hover:text-ink"
            title="Expand graph"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      {/* Explicit height so ReactFlow renders in widget view */}
      <div style={{ height: 380 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={gecoNodeTypes}
          fitView
          fitViewOptions={{ padding: 0.22 }}
          minZoom={0.3}
          maxZoom={1.8}
          proOptions={{ hideAttribution: true }}
          nodesDraggable
          panOnScroll
        >
          <Background gap={18} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  );
}

// ─── Timeline Widget — rose ───────────────────────────────────────────────────

const gKindMeta = {
  tender:  { icon: FileText,      bg: "bg-orange-50  text-orange-500 dark:bg-orange-900/30"  },
  risk:    { icon: AlertTriangle, bg: "bg-red-50      text-red-500   dark:bg-red-900/30"     },
  event:   { icon: CalendarDays,  bg: "bg-teal-50     text-teal-500  dark:bg-teal-900/30"    },
  summary: { icon: Sparkles,      bg: "bg-indigo-50   text-indigo-500 dark:bg-indigo-900/30" },
};

function TimelineWidget() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-line bg-card shadow-card">
      <div className="flex shrink-0 items-center justify-between border-b border-rose-100 bg-rose-50 px-4 py-3 dark:border-rose-900/40 dark:bg-rose-900/20">
        <div className="flex items-center gap-2">
          <Radio className="h-3.5 w-3.5 text-rose-500" />
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-700 dark:text-rose-300">Activity Timeline</p>
        </div>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <ol className="relative space-y-4">
          <span className="absolute bottom-2 left-[13px] top-2 w-px bg-line" aria-hidden />
          {gecoTimeline.map((entry) => {
            const meta = gKindMeta[entry.kind];
            const Icon = meta.icon;
            return (
              <li key={entry.id} className="relative flex items-center gap-3">
                <span className={cn("relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-4 ring-card", meta.bg)}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-medium leading-snug text-ink">{entry.label}</p>
                  <time className="text-[11px] tabular-nums text-ink-faint">{entry.time}</time>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="border-t border-rose-100 px-4 py-2.5 text-[11px] text-ink-faint dark:border-rose-900/30">
        <Sparkles className="mr-1 inline h-3 w-3 align-middle text-rose-400" />
        BlueLynk AI generated 6 more signals today
        <span className="ml-1 cursor-pointer text-rose-500 underline dark:text-rose-400">View all →</span>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="flex h-10 shrink-0 items-center justify-center border-t border-line bg-card px-6">
      <p className="text-[12px] text-ink-faint">
        <span className="font-medium text-ink-soft">IVA Technos Lynk</span>
        <span className="mx-2 text-line">·</span>
        Powered by <span className="font-semibold text-indigo-600 dark:text-indigo-400">BlueLynk</span>
      </p>
    </footer>
  );
}

// ─── Main GecoDashboard ───────────────────────────────────────────────────────

export function GecoDashboard() {
  const [modal, setModal] = useState<ModalId | null>(null);
  const [dark, setDark] = useState(false);

  // Persist theme across navigation
  useEffect(() => {
    const stored = localStorage.getItem("lynk-theme");
    if (stored === "dark") setDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("lynk-theme", dark ? "dark" : "light");
  }, [dark]);

  const closeModal = () => setModal(null);

  const modalTitle = modal
    ? modal === "graph"
      ? "Intelligence Graph"
      : modal.startsWith("action:")
        ? gecoRecommendations.find((r) => r.id === modal.split(":")[1])?.title ?? ""
        : modal.startsWith("tender:")
          ? gecoTenders.find((t) => t.id === modal.split(":")[1])?.title ?? ""
          : gecoEvents.find((e) => e.id === modal.split(":")[1])?.name ?? ""
    : undefined;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-surface">
      <NavMenu dark={dark} onToggle={() => setDark((d) => !d)} activeCompany="geco" />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-3 pt-4 sm:p-4 sm:pt-4">
          <AboutBanner />

          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <ActionsWidget onExpand={(id) => setModal(`action:${id}`)} />
            <TendersWidget onExpand={(id) => setModal(`tender:${id}`)} />
            <EventsWidget onExpand={(id) => setModal(`event:${id}`)} />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <GraphWidget onExpand={() => setModal("graph")} />
            </div>
            <TimelineWidget />
          </div>
        </main>
      </div>

      <Footer />

      <Modal open={modal !== null && modal !== "graph"} onClose={closeModal} title={modal !== "graph" ? modalTitle : undefined} size="lg">
        {modal?.startsWith("action:") && <ActionDetail id={modal.split(":")[1]} />}
        {modal?.startsWith("tender:") && <TenderDetail id={modal.split(":")[1]} />}
        {modal?.startsWith("event:")  && <EventDetail  id={modal.split(":")[1]} />}
      </Modal>

      <Modal open={modal === "graph"} onClose={closeModal} title="Intelligence Graph — Bicelli Geco" size="xl">
        <GraphFullView />
      </Modal>
    </div>
  );
}
