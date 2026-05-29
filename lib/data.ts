export type Priority = "high" | "medium" | "low";

export interface Company {
  name: string;
  tagline: string;
  industry: string;
  revenue: string;
  employees: string;
  location: string;
  products: string[];
  services: string[];
  summary: string;
}

export interface Recommendation {
  id: string;
  title: string;
  priority: Priority;
  rationale: string;
  detail: string;
  cta: string;
  kind: "tender" | "event" | "risk";
}

export interface Tender {
  id: string;
  title: string;
  client: string;
  value: string;
  deadline: string;
  deadlineDays: number;
  matchScore: number;
  reasons: string[];
  description: string;
}

export interface EventItem {
  id: string;
  name: string;
  location: string;
  date: string;
  reasons: string[];
  suggestedAction: string;
  attendees: string;
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
  name: "IVA Technos",
  tagline: "Embedded · Automotive · IoT",
  industry: "Embedded Systems & Automotive Tech",
  revenue: "₹45 Cr",
  employees: "200+ Engineers",
  location: "Coimbatore, Tamil Nadu",
  products: ["H200 Diagnostic Tool", "Compressor Controller", "T4 Test Rig", "XCP CAN Tool"],
  services: [
    "Embedded & IoT",
    "Automotive ADAS",
    "Infotainment Systems",
    "Industrial Automation",
    "Web & Mobile Apps",
    "3D Printing",
    "Data Annotation",
    "CI/CD & DevOps",
  ],
  summary:
    "Full-stack embedded and automotive technology firm delivering OEM diagnostic tools, IoT controllers, and ADAS software — positioned to capture emerging EV diagnostics and industrial automation contracts.",
};

export const recommendations: Recommendation[] = [
  {
    id: "rec-1",
    title: "Bid for ADAS Software Contract",
    priority: "high",
    rationale: "Matches QT/QML and ADAS expertise; H200 diagnostic experience strengthens credibility.",
    detail:
      "The Ministry of Road Transport has floated a ₹85L ADAS software development tender for commercial vehicles. IVA Technos's experience in infotainment HMI (QT/QML), digital cluster development, and the H200 OBD diagnostic tool puts it in the top tier of eligible bidders. Recommend immediate proposal preparation.",
    cta: "Review Tender",
    kind: "tender",
  },
  {
    id: "rec-2",
    title: "Exhibit at Embedded World India",
    priority: "medium",
    rationale: "Automotive OEM buyers and industrial clients attending; high ROI on lead generation.",
    detail:
      "Embedded World India in Bangalore (15 Jul 2026) is the premier embedded systems showcase in the region. Showcasing the H200 Diagnostic Tool and Compressor Controller at a branded booth could generate 20–40 qualified OEM leads. Competitors DiagTech India and AutoSense are confirmed exhibitors.",
    cta: "View Event",
    kind: "event",
  },
  {
    id: "rec-3",
    title: "Accelerate H200 EV Expansion",
    priority: "high",
    rationale: "EV adoption accelerating; CAN/K-Line expertise directly applicable to EV diagnostics.",
    detail:
      "The EV commercial vehicle market is growing at 38% CAGR. IVA Technos's H200 Diagnostic Scan Tool supports CAN and K-Line protocols — the same protocols used in EV BMS and motor controllers. A targeted firmware update to support EV-specific PIDs could open a new product line within 2 quarters with minimal R&D investment.",
    cta: "Start Roadmap",
    kind: "risk",
  },
];

export const tenders: Tender[] = [
  {
    id: "tender-1",
    title: "ADAS Software for Commercial CVs",
    client: "Ministry of Road Transport",
    value: "₹85L",
    deadline: "8 days",
    deadlineDays: 8,
    matchScore: 91,
    reasons: [
      "ADAS & digital cluster experience",
      "QT/QML HMI development capability",
      "OEM integration track record",
    ],
    description:
      "Development of Advanced Driver Assistance System (ADAS) software stack including lane departure warning, collision avoidance, and driver fatigue detection for heavy commercial vehicles.",
  },
  {
    id: "tender-2",
    title: "Industrial IoT Gateway Platform",
    client: "BHEL, Trichy",
    value: "₹1.2 Cr",
    deadline: "22 days",
    deadlineDays: 22,
    matchScore: 83,
    reasons: [
      "Embedded IoT systems expertise",
      "Compressor controller portfolio",
      "CI/CD & cloud integration",
    ],
    description:
      "Design and deployment of an Industrial IoT gateway platform to monitor and control manufacturing equipment, with cloud dashboard and predictive maintenance capabilities.",
  },
  {
    id: "tender-3",
    title: "Infotainment System Integration",
    client: "Ashok Leyland",
    value: "₹55L",
    deadline: "35 days",
    deadlineDays: 35,
    matchScore: 76,
    reasons: [
      "Infotainment HMI development",
      "Android/iOS application expertise",
      "In-vehicle entertainment track record",
    ],
    description:
      "Integration of next-generation infotainment system with connected vehicle features, OTA updates, and Android Automotive OS support for Ashok Leyland's new commercial vehicle platform.",
  },
];

export const events: EventItem[] = [
  {
    id: "event-1",
    name: "Embedded World India",
    location: "Bangalore",
    date: "15 Jul 2026",
    attendees: "5,000+ industry professionals",
    reasons: [
      "Top automotive OEMs attending as buyers",
      "IoT product showcase opportunity",
      "DiagTech India & AutoSense exhibiting",
    ],
    suggestedAction: "Showcase H200 Diagnostic Tool and Compressor Controller at a branded booth.",
  },
  {
    id: "event-2",
    name: "Auto Expo Technology Summit",
    location: "New Delhi",
    date: "20 Aug 2026",
    attendees: "15,000+ trade visitors",
    reasons: [
      "EV and ADAS buyers present",
      "Aligns with H200 EV expansion plans",
      "Ministry of Road Transport officials attending",
    ],
    suggestedAction: "Register for buyer meeting program and present EV diagnostic roadmap.",
  },
];

export const timeline: TimelineEntry[] = [
  { id: "t-1", time: "9:30 AM", label: "ADAS tender match detected — 91% fit", kind: "tender" },
  { id: "t-2", time: "11:00 AM", label: "Electronics component delay flagged", kind: "risk" },
  { id: "t-3", time: "1:15 PM", label: "Embedded World deadline reminder", kind: "event" },
  { id: "t-4", time: "3:30 PM", label: "H200 EV expansion brief generated", kind: "summary" },
];

export const graphNodes: GraphNodeData[] = [
  { id: "company", label: "IVA Technos", type: "company" },
  { id: "cust-1", label: "Tata Motors", type: "customer" },
  { id: "cust-2", label: "Ashok Leyland", type: "customer" },
  { id: "prod-1", label: "H200 Diagnostic", type: "product" },
  { id: "prod-2", label: "Industrial IoT", type: "product" },
  { id: "tender-1", label: "ADAS Tender", type: "tender" },
  { id: "tender-2", label: "IoT Gateway Tender", type: "tender" },
  { id: "event-1", label: "Embedded World", type: "event" },
  { id: "comp-1", label: "DiagTech India", type: "competitor" },
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
  { source: "comp-1", target: "tender-1", label: "competes" },
];
