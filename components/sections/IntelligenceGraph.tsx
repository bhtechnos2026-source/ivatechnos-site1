"use client";

import { useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
} from "reactflow";
import { graphNodes, graphEdges, type GraphNodeData } from "@/lib/data";
import { Section } from "@/components/ui/section";
import {
  Building2,
  Users,
  Package,
  FileText,
  CalendarDays,
  Swords,
} from "lucide-react";

type NodeType = GraphNodeData["type"];

const typeMeta: Record<
  NodeType,
  { label: string; icon: typeof Building2; dot: string; chip: string }
> = {
  company: { label: "Company", icon: Building2, dot: "bg-ink", chip: "border-ink/15 bg-ink text-white" },
  customer: { label: "Customer", icon: Users, dot: "bg-indigo-500", chip: "border-indigo-100 bg-white text-ink" },
  product: { label: "Product", icon: Package, dot: "bg-emerald-500", chip: "border-emerald-100 bg-white text-ink" },
  tender: { label: "Tender", icon: FileText, dot: "bg-amber-500", chip: "border-amber-100 bg-white text-ink" },
  event: { label: "Event", icon: CalendarDays, dot: "bg-sky-500", chip: "border-sky-100 bg-white text-ink" },
  competitor: { label: "Competitor", icon: Swords, dot: "bg-red-500", chip: "border-red-100 bg-white text-ink" },
};

function IntelNode({ data }: NodeProps<{ label: string; type: NodeType }>) {
  const meta = typeMeta[data.type];
  const Icon = meta.icon;
  const isCompany = data.type === "company";
  return (
    <div
      className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 shadow-card transition-shadow hover:shadow-lift ${meta.chip} ${
        isCompany ? "scale-105" : ""
      }`}
    >
      <Handle type="target" position={Position.Top} />
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-md ${
          isCompany ? "bg-white/15" : "bg-surface"
        }`}
      >
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="leading-tight">
        <p className="text-[13px] font-semibold">{data.label}</p>
        <p
          className={`text-[10px] uppercase tracking-wide ${
            isCompany ? "text-white/60" : "text-ink-faint"
          }`}
        >
          {meta.label}
        </p>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

// Hand-tuned radial-ish layout around the company node.
const positions: Record<string, { x: number; y: number }> = {
  company: { x: 360, y: 230 },
  "cust-1": { x: 60, y: 60 },
  "cust-2": { x: 60, y: 200 },
  "prod-1": { x: 120, y: 360 },
  "prod-2": { x: 360, y: 420 },
  "tender-1": { x: 30, y: 470 },
  "tender-2": { x: 620, y: 380 },
  "event-1": { x: 660, y: 120 },
  "comp-1": { x: 680, y: 250 },
};

export function IntelligenceGraph() {
  const [activeType, setActiveType] = useState<NodeType | null>(null);

  const nodes: Node[] = useMemo(
    () =>
      graphNodes.map((n) => ({
        id: n.id,
        type: "intel",
        position: positions[n.id] ?? { x: 0, y: 0 },
        data: { label: n.label, type: n.type },
        style: {
          opacity: activeType && n.type !== activeType ? 0.3 : 1,
          transition: "opacity 0.2s ease",
        },
      })),
    [activeType]
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
        labelBgStyle: { fill: "#ffffff", fillOpacity: 0.85 },
        style: { strokeWidth: 1.5 },
      })),
    []
  );

  const legendTypes = Object.keys(typeMeta) as NodeType[];

  return (
    <Section
      id="graph"
      eyebrow="Relationships"
      title="Company Intelligence Graph"
      description="Explore how the company connects to customers, products, tenders, events, and competitors."
      action={
        <div className="hidden flex-wrap gap-1.5 sm:flex">
          {legendTypes.map((t) => {
            const meta = typeMeta[t];
            const active = activeType === t;
            return (
              <button
                key={t}
                onClick={() => setActiveType(active ? null : t)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  active
                    ? "border-ink/20 bg-ink text-white"
                    : "border-line bg-white text-ink-soft hover:bg-surface"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                {meta.label}
              </button>
            );
          })}
        </div>
      }
    >
      <div className="h-[520px] w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={{ intel: IntelNode }}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.4}
          maxZoom={1.6}
          proOptions={{ hideAttribution: true }}
          nodesDraggable
          panOnScroll
        >
          <Background color="#e5e5e5" gap={22} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </Section>
  );
}
