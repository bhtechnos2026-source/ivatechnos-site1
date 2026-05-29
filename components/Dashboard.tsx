"use client";

import { useState, useMemo } from "react";
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
  company,
  recommendations,
  tenders,
  events,
  timeline,
  graphNodes,
  graphEdges,
  type GraphNodeData,
  type Priority,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/Modal";
import {
  Command,
  Building2,
  Users,
  Package,
  FileText,
  CalendarDays,
  Swords,
  Check,
  Clock,
  Sparkles,
  MapPin,
  Star,
  AlertTriangle,
  ChevronRight,
  Maximize2,
  TrendingUp,
  Zap,
  Layers,
  IndianRupee,
  Radio,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type NodeType = GraphNodeData["type"];
type ModalId =
  | `action:${string}`
  | `tender:${string}`
  | `event:${string}`
  | "graph";

// ─── Graph node (must be outside component for stable reference) ───────────────

const nodeMeta: Record<
  NodeType,
  { label: string; icon: typeof Building2; bg: string; isLight?: boolean; dot: string }
> = {
  company: { label: "Company", icon: Building2, bg: "bg-ink text-white shadow-md", dot: "bg-ink" },
  customer: { label: "Customer", icon: Users, bg: "bg-white border border-line shadow-card", isLight: true, dot: "bg-indigo-500" },
  product: { label: "Product", icon: Package, bg: "bg-white border border-line shadow-card", isLight: true, dot: "bg-emerald-500" },
  tender: { label: "Tender", icon: FileText, bg: "bg-white border border-line shadow-card", isLight: true, dot: "bg-amber-500" },
  event: { label: "Event", icon: CalendarDays, bg: "bg-white border border-line shadow-card", isLight: true, dot: "bg-sky-500" },
  competitor: { label: "Competitor", icon: Swords, bg: "bg-white border border-line shadow-card", isLight: true, dot: "bg-red-500" },
};

function IntelNode({ data }: NodeProps<{ label: string; type: NodeType }>) {
  const meta = nodeMeta[data.type];
  const Icon = meta.icon;
  const isCompany = data.type === "company";
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium",
        meta.bg,
        isCompany && "scale-110"
      )}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded",
          isCompany ? "bg-white/20" : "bg-surface"
        )}
      >
        <Icon className={cn("h-3 w-3", isCompany ? "text-white" : "text-ink-soft")} />
      </span>
      <div className="leading-tight">
        <p className={cn("text-[12px] font-semibold", isCompany ? "text-white" : "text-ink")}>
          {data.label}
        </p>
        <p className={cn("text-[9px] uppercase tracking-wide", isCompany ? "text-white/50" : "text-ink-faint")}>
          {meta.label}
        </p>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
}

const nodeTypes = { intel: IntelNode };

const graphPositions: Record<string, { x: number; y: number }> = {
  company: { x: 280, y: 170 },
  "cust-1": { x: 50, y: 40 },
  "cust-2": { x: 50, y: 180 },
  "prod-1": { x: 90, y: 310 },
  "prod-2": { x: 320, y: 330 },
  "tender-1": { x: 20, y: 420 },
  "tender-2": { x: 520, y: 300 },
  "event-1": { x: 520, y: 80 },
  "comp-1": { x: 520, y: 190 },
};

// ─── Modal detail panels ──────────────────────────────────────────────────────

function ActionDetail({ id }: { id: string }) {
  const rec = recommendations.find((r) => r.id === id);
  if (!rec) return null;
  const kindIcon = { tender: FileText, event: CalendarDays, risk: AlertTriangle };
  const Icon = kindIcon[rec.kind];
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface text-ink-soft">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <Badge
            tone={rec.priority === "high" ? "high" : rec.priority === "medium" ? "medium" : "low"}
            className="mb-2"
          >
            {rec.priority} priority
          </Badge>
          <h3 className="text-lg font-semibold text-ink">{rec.title}</h3>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-ink-muted">{rec.detail}</p>
      <div className="rounded-xl border border-line bg-surface p-4 text-sm text-ink-soft">
        <span className="font-medium text-ink">Quick rationale: </span>
        {rec.rationale}
      </div>
      <Button className="w-full">{rec.cta} →</Button>
    </div>
  );
}

function TenderDetail({ id }: { id: string }) {
  const t = tenders.find((x) => x.id === id);
  if (!t) return null;
  const urgencyTone = t.deadlineDays <= 10 ? "high" : t.deadlineDays <= 25 ? "medium" : "low";
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-ink-faint">{t.client}</p>
          <h3 className="mt-1 text-lg font-semibold text-ink">{t.title}</h3>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-2xl font-bold text-ink">{t.matchScore}%</p>
          <p className="text-[11px] text-ink-faint">match score</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-ink-muted">{t.description}</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-line p-3">
          <p className="text-[11px] text-ink-faint uppercase tracking-wide">Value</p>
          <p className="mt-1 flex items-center gap-1 text-base font-semibold text-ink">
            <IndianRupee className="h-4 w-4" />
            {t.value.replace("₹", "")}
          </p>
        </div>
        <div className="rounded-xl border border-line p-3">
          <p className="text-[11px] text-ink-faint uppercase tracking-wide">Deadline</p>
          <Badge tone={urgencyTone} className="mt-2">
            <Clock className="h-3 w-3" /> {t.deadline}
          </Badge>
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-faint">Why matched</p>
        <ul className="space-y-2">
          {t.reasons.map((r) => (
            <li key={r} className="flex items-center gap-2 text-sm text-ink-muted">
              <Check className="h-4 w-4 shrink-0 text-emerald-500" />
              {r}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1">View Details</Button>
        <Button className="flex-1">Prepare Proposal</Button>
      </div>
    </div>
  );
}

function EventDetail({ id }: { id: string }) {
  const ev = events.find((x) => x.id === id);
  if (!ev) return null;
  return (
    <div className="p-6 space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-ink">{ev.name}</h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft">
          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-ink-faint" />{ev.location}</span>
          <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-ink-faint" />{ev.date}</span>
          <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-ink-faint" />{ev.attendees}</span>
        </div>
      </div>
      <div className="rounded-xl border border-accent/20 bg-accent-soft p-4 text-sm text-accent">
        <p className="font-medium mb-1 flex items-center gap-1.5"><Sparkles className="h-4 w-4" /> Suggested action</p>
        <p>{ev.suggestedAction}</p>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-faint">Why attend</p>
        <ul className="space-y-2">
          {ev.reasons.map((r) => (
            <li key={r} className="flex items-center gap-2 text-sm text-ink-muted">
              <Star className="h-4 w-4 shrink-0 text-amber-400" />
              {r}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1">View Event</Button>
        <Button className="flex-1">Generate Outreach</Button>
      </div>
    </div>
  );
}

function GraphFullView() {
  const nodes: Node[] = useMemo(
    () =>
      graphNodes.map((n) => ({
        id: n.id,
        type: "intel",
        position: graphPositions[n.id] ?? { x: 0, y: 0 },
        data: { label: n.label, type: n.type },
      })),
    []
  );
  const edges: Edge[] = useMemo(
    () =>
      graphEdges.map((e, i) => ({
        id: `e-${i}`,
        source: e.source,
        target: e.target,
        label: e.label,
        animated: e.source === "company",
        labelStyle: { fontSize: 10, fill: "#a3a3a3" },
        labelBgStyle: { fill: "#fff", fillOpacity: 0.85 },
        style: { strokeWidth: 1.5 },
      })),
    []
  );
  return (
    <div className="h-[70vh] w-full bg-surface">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.3}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#e5e5e5" gap={20} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-white lg:flex">
      {/* Company card */}
      <div className="border-b border-line p-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink text-white">
            <Zap className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold tracking-tight text-ink">{company.name}</p>
            <p className="text-[11px] text-ink-faint">{company.tagline}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            { label: "Revenue", value: company.revenue },
            { label: "Team", value: company.employees },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-surface px-2.5 py-2">
              <p className="text-[10px] uppercase tracking-wide text-ink-faint">{s.label}</p>
              <p className="mt-0.5 text-xs font-semibold text-ink">{s.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-[11px] text-ink-faint">
          <MapPin className="h-3 w-3" /> {company.location}
        </p>
      </div>

      {/* Products */}
      <div className="border-b border-line p-5">
        <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
          Key Products
        </p>
        <ul className="space-y-2">
          {company.products.map((p) => (
            <li key={p} className="flex items-center gap-2 text-xs text-ink-soft">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink-faint" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Services */}
      <div className="flex-1 overflow-y-auto p-5">
        <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
          Services
        </p>
        <div className="flex flex-wrap gap-1.5">
          {company.services.map((s) => (
            <span
              key={s}
              className="rounded-full border border-line bg-surface px-2 py-0.5 text-[11px] text-ink-soft"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Live indicator */}
      <div className="border-t border-line p-4">
        <div className="flex items-center gap-2 text-[11px] text-ink-faint">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live · updated just now
        </div>
      </div>
    </aside>
  );
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────

function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-line bg-white px-4 sm:px-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-white">
          <Command className="h-3.5 w-3.5" />
        </span>
        <div className="leading-none">
          <p className="text-sm font-semibold tracking-tight text-ink">EnterpriseCore</p>
          <p className="text-[10px] text-ink-faint">AI Chief of Staff</p>
        </div>
      </div>

      <div className="hidden items-center gap-1 sm:flex">
        {["Actions", "Tenders", "Events", "Graph", "Timeline"].map((label) => (
          <span
            key={label}
            className="rounded-lg px-2.5 py-1 text-[12px] text-ink-faint transition-colors hover:bg-surface hover:text-ink cursor-default select-none"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11px] text-ink-faint sm:flex">
          <Radio className="h-2.5 w-2.5 text-emerald-500" /> Live
        </span>
        <Button size="sm">Export Brief</Button>
      </div>
    </header>
  );
}

// ─── AI Banner ────────────────────────────────────────────────────────────────

function AIBanner() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-card">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
        <Sparkles className="h-4 w-4" />
      </span>
      <p className="min-w-0 flex-1 text-sm font-medium leading-snug text-ink">
        <span className="text-ink-faint font-normal">AI Summary — </span>
        {company.summary}
      </p>
      <Badge tone="accent" className="shrink-0 hidden sm:inline-flex">AI</Badge>
    </div>
  );
}

// ─── Actions Widget ───────────────────────────────────────────────────────────

function ActionsWidget({ onExpand }: { onExpand: (id: string) => void }) {
  const kindIcon = { tender: FileText, event: CalendarDays, risk: AlertTriangle };
  return (
    <div className="flex h-full flex-col rounded-xl border border-line bg-white shadow-card">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-3.5 w-3.5 text-ink-faint" />
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Recommended Actions
          </p>
        </div>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white">
          {recommendations.length}
        </span>
      </div>
      <div className="flex-1 divide-y divide-line overflow-y-auto">
        {recommendations.map((rec) => {
          const Icon = kindIcon[rec.kind];
          return (
            <button
              key={rec.id}
              onClick={() => onExpand(rec.id)}
              className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-surface"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface text-ink-soft group-hover:bg-white">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{rec.title}</p>
                <p className="truncate text-[11px] text-ink-faint">{rec.rationale}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge
                  tone={rec.priority === "high" ? "high" : rec.priority === "medium" ? "medium" : "low"}
                >
                  {rec.priority}
                </Badge>
                <ChevronRight className="h-3.5 w-3.5 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Tenders Widget ───────────────────────────────────────────────────────────

function MatchBar({ score }: { score: number }) {
  const color = score >= 85 ? "bg-emerald-500" : score >= 75 ? "bg-amber-400" : "bg-ink-faint";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-line">
        <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${score}%` }} />
      </div>
      <span className="text-[11px] font-semibold tabular-nums text-ink-soft">{score}%</span>
    </div>
  );
}

function TendersWidget({ onExpand }: { onExpand: (id: string) => void }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-line bg-white shadow-card">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <FileText className="h-3.5 w-3.5 text-ink-faint" />
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Tender Pipeline
          </p>
        </div>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white">
          {tenders.length}
        </span>
      </div>
      <div className="flex-1 divide-y divide-line overflow-y-auto">
        {tenders.map((t) => {
          const urgencyTone =
            t.deadlineDays <= 10 ? "high" : t.deadlineDays <= 25 ? "medium" : "low";
          return (
            <button
              key={t.id}
              onClick={() => onExpand(t.id)}
              className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-surface"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{t.title}</p>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="text-[11px] text-ink-faint">{t.value}</span>
                  <Badge tone={urgencyTone} className="text-[10px]">
                    <Clock className="h-2.5 w-2.5" /> {t.deadline}
                  </Badge>
                </div>
              </div>
              <div className="shrink-0">
                <MatchBar score={t.matchScore} />
              </div>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Events Widget ────────────────────────────────────────────────────────────

function EventsWidget({ onExpand }: { onExpand: (id: string) => void }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-line bg-white shadow-card">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5 text-ink-faint" />
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Events & Conferences
          </p>
        </div>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white">
          {events.length}
        </span>
      </div>
      <div className="flex-1 divide-y divide-line overflow-y-auto">
        {events.map((ev) => (
          <button
            key={ev.id}
            onClick={() => onExpand(ev.id)}
            className="group flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-surface"
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface text-ink-soft group-hover:bg-white">
              <CalendarDays className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{ev.name}</p>
              <p className="flex items-center gap-1 text-[11px] text-ink-faint">
                <MapPin className="h-2.5 w-2.5" /> {ev.location} · {ev.date}
              </p>
              <p className="mt-1 text-[11px] text-ink-muted line-clamp-2">{ev.suggestedAction}</p>
            </div>
            <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}

        {/* Upcoming hint */}
        <div className="px-4 py-3 text-[11px] text-ink-faint">
          <Sparkles className="mb-1 h-3 w-3 text-amber-400 inline mr-1" />
          AI identifies 3 more relevant events this quarter
          <span className="ml-1 text-accent underline cursor-pointer">View all →</span>
        </div>
      </div>
    </div>
  );
}

// ─── Graph Widget ─────────────────────────────────────────────────────────────

function GraphWidget({ onExpand }: { onExpand: () => void }) {
  const nodes: Node[] = useMemo(
    () =>
      graphNodes.map((n) => ({
        id: n.id,
        type: "intel",
        position: graphPositions[n.id] ?? { x: 0, y: 0 },
        data: { label: n.label, type: n.type },
      })),
    []
  );
  const edges: Edge[] = useMemo(
    () =>
      graphEdges.map((e, i) => ({
        id: `e-${i}`,
        source: e.source,
        target: e.target,
        label: e.label,
        animated: e.source === "company",
        labelStyle: { fontSize: 10, fill: "#a3a3a3" },
        labelBgStyle: { fill: "#fafafa", fillOpacity: 0.9 },
        style: { strokeWidth: 1.5, stroke: "#d4d4d4" },
      })),
    []
  );
  const legendTypes = Object.keys(nodeMeta) as NodeType[];

  return (
    <div className="flex h-full flex-col rounded-xl border border-line bg-white shadow-card">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <Layers className="h-3.5 w-3.5 text-ink-faint" />
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Intelligence Graph
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden flex-wrap gap-1.5 md:flex">
            {legendTypes.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-full border border-line px-2 py-0.5 text-[10px] text-ink-faint"
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", nodeMeta[t].dot)} />
                {nodeMeta[t].label}
              </span>
            ))}
          </div>
          <button
            onClick={onExpand}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-surface text-ink-muted transition-colors hover:bg-white hover:text-ink"
            title="Expand graph"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.3}
          maxZoom={1.8}
          proOptions={{ hideAttribution: true }}
          nodesDraggable
          panOnScroll
        >
          <Background color="#e5e5e5" gap={18} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  );
}

// ─── Timeline Widget ──────────────────────────────────────────────────────────

const kindMeta = {
  tender: { icon: FileText, bg: "bg-indigo-50 text-indigo-600" },
  risk: { icon: AlertTriangle, bg: "bg-red-50 text-red-500" },
  event: { icon: CalendarDays, bg: "bg-amber-50 text-amber-600" },
  summary: { icon: Sparkles, bg: "bg-emerald-50 text-emerald-600" },
};

function TimelineWidget() {
  return (
    <div className="flex h-full flex-col rounded-xl border border-line bg-white shadow-card">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <Radio className="h-3.5 w-3.5 text-ink-faint" />
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Activity Timeline
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <ol className="relative space-y-4">
          <span className="absolute left-[13px] top-2 bottom-2 w-px bg-line" aria-hidden />
          {timeline.map((entry) => {
            const meta = kindMeta[entry.kind];
            const Icon = meta.icon;
            return (
              <li key={entry.id} className="relative flex items-center gap-3">
                <span
                  className={cn(
                    "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-4 ring-white",
                    meta.bg
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-medium text-ink leading-snug">{entry.label}</p>
                  <time className="text-[11px] tabular-nums text-ink-faint">{entry.time}</time>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

// ─── Main Dashboard Export ────────────────────────────────────────────────────

export function Dashboard() {
  const [modal, setModal] = useState<ModalId | null>(null);

  const openAction = (id: string) => setModal(`action:${id}`);
  const openTender = (id: string) => setModal(`tender:${id}`);
  const openEvent = (id: string) => setModal(`event:${id}`);
  const closeModal = () => setModal(null);

  const modalTitle = modal
    ? modal === "graph"
      ? "Intelligence Graph"
      : modal.startsWith("action:")
        ? recommendations.find((r) => r.id === modal.split(":")[1])?.title ?? ""
        : modal.startsWith("tender:")
          ? tenders.find((t) => t.id === modal.split(":")[1])?.title ?? ""
          : events.find((e) => e.id === modal.split(":")[1])?.name ?? ""
    : undefined;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-surface">
      <TopBar />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar />

        {/* Main content */}
        <main className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-3 sm:p-4">
          {/* AI Summary strip */}
          <AIBanner />

          {/* Widget row 1: Actions | Tenders | Events */}
          <div className="grid min-h-[220px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:h-[240px] lg:min-h-0 lg:shrink-0">
            <ActionsWidget onExpand={openAction} />
            <TendersWidget onExpand={openTender} />
            <EventsWidget onExpand={openEvent} />
          </div>

          {/* Widget row 2: Graph | Timeline — fills remaining space */}
          <div className="grid min-h-[340px] flex-1 grid-cols-1 gap-3 lg:min-h-0 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <GraphWidget onExpand={() => setModal("graph")} />
            </div>
            <TimelineWidget />
          </div>
        </main>
      </div>

      {/* Detail modal */}
      <Modal
        open={modal !== null && modal !== "graph"}
        onClose={closeModal}
        title={modal !== "graph" ? modalTitle : undefined}
        size="lg"
      >
        {modal?.startsWith("action:") && (
          <ActionDetail id={modal.split(":")[1]} />
        )}
        {modal?.startsWith("tender:") && (
          <TenderDetail id={modal.split(":")[1]} />
        )}
        {modal?.startsWith("event:") && (
          <EventDetail id={modal.split(":")[1]} />
        )}
      </Modal>

      {/* Graph full-screen modal */}
      <Modal
        open={modal === "graph"}
        onClose={closeModal}
        title="Intelligence Graph"
        size="xl"
      >
        <GraphFullView />
      </Modal>
    </div>
  );
}
