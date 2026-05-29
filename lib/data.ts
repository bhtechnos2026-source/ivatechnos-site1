// Mock data for the EnterpriseCore Company Intelligence Page (MVP).
// In production this would be served by a JSON API; for the MVP it is static.

export type Priority = "high" | "medium" | "low";

export interface Company {
  name: string;
  industry: string;
  revenue: string;
  employees: string;
  products: string[];
  summary: string;
}

export interface Recommendation {
  id: string;
  title: string;
  priority: Priority;
  rationale: string;
  cta: string;
  kind: "tender" | "event" | "risk";
}

export interface Tender {
  id: string;
  title: string;
  value: string;
  deadline: string;
  deadlineUrgency: "high" | "medium" | "low";
  matchScore: number;
  reasons: string[];
}

export interface EventItem {
  id: string;
  name: string;
  location: string;
  date: string;
  reasons: string[];
  suggestedAction: string;
}

export interface TimelineEntry {
  id: string;
  time: string;
  label: string;
  kind: "tender" | "risk" | "event" | "summary";
}

export interface GraphNodeData {
  id: string;
  label: string;
  type: "company" | "customer" | "product" | "tender" | "event" | "competitor";
}

export interface GraphEdgeData {
  source: string;
  target: string;
  label?: string;
}

export const company: Company = {
  name: "Roots Precision Components",
  industry: "Automotive Components",
  revenue: "₹120 Cr Revenue",
  employees: "350 Employees",
  products: ["CNC Machined Parts", "Transmission Housings", "EV Drive Components"],
  summary:
    "Leading CNC machining supplier expanding into EV components with strong railway manufacturing potential.",
};

export const recommendations: Recommendation[] = [
  {
    id: "rec-1",
    title: "Apply for Railway Components Tender",
    priority: "high",
    rationale:
      "Matches current CNC capability and past railway supply experience.",
    cta: "Review Tender",
    kind: "tender",
  },
  {
    id: "rec-2",
    title: "Attend EV Manufacturing Summit",
    priority: "medium",
    rationale: "Competitors and OEM buyers attending.",
    cta: "View Event",
    kind: "event",
  },
  {
    id: "rec-3",
    title: "Review Steel Supplier Risk",
    priority: "high",
    rationale: "Price escalation signals detected.",
    cta: "Review Risk",
    kind: "risk",
  },
];

export const tenders: Tender[] = [
  {
    id: "tender-1",
    title: "Railway CNC Components Tender",
    value: "₹45L",
    deadline: "5 days",
    deadlineUrgency: "high",
    matchScore: 87,
    reasons: [
      "CNC machining capability",
      "Railway manufacturing experience",
      "ISO certification",
    ],
  },
  {
    id: "tender-2",
    title: "EV Powertrain Housing Supply",
    value: "₹1.2 Cr",
    deadline: "18 days",
    deadlineUrgency: "medium",
    matchScore: 79,
    reasons: [
      "Active EV component expansion",
      "Precision casting + machining fit",
      "OEM tier-1 qualification",
    ],
  },
  {
    id: "tender-3",
    title: "Defence Transmission Sub-Assembly",
    value: "₹68L",
    deadline: "27 days",
    deadlineUrgency: "low",
    matchScore: 72,
    reasons: [
      "Transmission housing portfolio",
      "Quality systems compliance",
      "In-house tooling capacity",
    ],
  },
];

export const events: EventItem[] = [
  {
    id: "event-1",
    name: "EV Manufacturing Summit",
    location: "Chennai",
    date: "12 Jun 2026",
    reasons: [
      "EV OEMs attending",
      "Competitors participating",
      "Relevant to EV expansion plans",
    ],
    suggestedAction: "Schedule meetings before event.",
  },
  {
    id: "event-2",
    name: "India Railway Sourcing Expo",
    location: "New Delhi",
    date: "24 Jul 2026",
    reasons: [
      "Indian Railways procurement leads present",
      "Aligns with active railway tender",
      "Direct buyer access for components",
    ],
    suggestedAction: "Prepare capability deck for buyers.",
  },
];

export const timeline: TimelineEntry[] = [
  { id: "t-1", time: "10:00 AM", label: "Tender match detected", kind: "tender" },
  { id: "t-2", time: "11:15 AM", label: "Supplier risk updated", kind: "risk" },
  {
    id: "t-3",
    time: "1:30 PM",
    label: "Event recommendation generated",
    kind: "event",
  },
  {
    id: "t-4",
    time: "3:45 PM",
    label: "Executive summary refreshed",
    kind: "summary",
  },
];

export const graphNodes: GraphNodeData[] = [
  { id: "company", label: "Roots Precision", type: "company" },
  { id: "cust-1", label: "Tata Motors", type: "customer" },
  { id: "cust-2", label: "Ashok Leyland", type: "customer" },
  { id: "prod-1", label: "CNC Parts", type: "product" },
  { id: "prod-2", label: "EV Drive Units", type: "product" },
  { id: "tender-1", label: "Railway Tender", type: "tender" },
  { id: "tender-2", label: "EV Housing Tender", type: "tender" },
  { id: "event-1", label: "EV Summit", type: "event" },
  { id: "comp-1", label: "PrecisionCast Ltd", type: "competitor" },
];

export const graphEdges: GraphEdgeData[] = [
  { source: "company", target: "cust-1", label: "supplies" },
  { source: "company", target: "cust-2", label: "supplies" },
  { source: "company", target: "prod-1", label: "makes" },
  { source: "company", target: "prod-2", label: "makes" },
  { source: "prod-1", target: "tender-1", label: "qualifies" },
  { source: "prod-2", target: "tender-2", label: "qualifies" },
  { source: "company", target: "event-1", label: "recommended" },
  { source: "comp-1", target: "event-1", label: "attending" },
  { source: "comp-1", target: "tender-2", label: "competes" },
];
