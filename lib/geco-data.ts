export type Priority = "high" | "medium" | "low";

export interface GecoCompany {
  name: string;
  tagline: string;
  industry: string;
  revenue: string;
  employees: string;
  location: string;
  founded: string;
  ownership: string;
  products: string[];
  services: string[];
  summary: string;
}

export interface GecoRecommendation {
  id: string;
  title: string;
  priority: Priority;
  rationale: string;
  detail: string;
  cta: string;
  kind: "tender" | "event" | "risk";
}

export interface GecoTender {
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

export interface GecoEvent {
  id: string;
  name: string;
  location: string;
  date: string;
  attendees: string;
  reasons: string[];
  suggestedAction: string;
}

export interface GecoTimelineEntry {
  id: string;
  time: string;
  label: string;
  kind: "tender" | "risk" | "event" | "summary";
}

export interface GecoGraphNode {
  id: string;
  label: string;
  type: "company" | "partner" | "customer" | "product" | "tender" | "event" | "competitor";
}

export interface GecoGraphEdge {
  source: string;
  target: string;
  label?: string;
}

export const gecoCompany: GecoCompany = {
  name: "Bicelli Geco",
  tagline: "Hydraulics · Indo-Italian JV",
  industry: "Hydraulic Cylinder Manufacturing",
  revenue: "₹85 Cr",
  employees: "150+ Specialists",
  location: "Kallapalayam, Coimbatore",
  founded: "Est. 2015",
  ownership: "Indo-Italian Joint Venture",
  products: [
    "Welded Hydraulic Cylinders",
    "Telescopic Hydraulic Cylinders",
    "Tie-Rod Cylinders",
    "Mill Duty Cylinders",
    "Custom Hydraulic Cylinders",
  ],
  services: [
    "Design & Engineering",
    "Precision Machining",
    "Welding",
    "Assembly & Testing",
    "Painting & Finishing",
    "After-Sales Support",
    "Customisation",
    "Export Supply",
  ],
  summary:
    "Indo-Italian joint venture producing 60,000+ hydraulic cylinders yearly, serving OEMs in construction, mining, and agriculture with precision-engineered welded, telescopic, and custom cylinder solutions — IMS certified and export-ready.",
};

export const gecoRecommendations: GecoRecommendation[] = [
  {
    id: "grec-1",
    title: "Bid for BEML Mining Equipment Cylinders",
    priority: "high",
    rationale: "Matches mill-duty and high-pressure welded cylinder capability; BEML is an existing supply chain contact.",
    detail:
      "SAIL/NMDC-linked BEML has floated a ₹1.2 Cr tender for hydraulic cylinders used in surface mining equipment. Bicelli Geco's mill-duty cylinder range and IMS certification make it a top-tier bidder. Recommend prioritising this over the L&T tender given the higher match score and shorter deadline.",
    cta: "Review Tender",
    kind: "tender",
  },
  {
    id: "grec-2",
    title: "Exhibit at bauma CONEXPO India",
    priority: "medium",
    rationale: "Top construction and mining OEMs attending; direct showcase opportunity for telescopic cylinder range.",
    detail:
      "bauma CONEXPO India in Greater Noida (10 Sep 2026) is the largest construction equipment show in the region. A branded booth showcasing the telescopic and welded cylinder range alongside the Italian Bicelli SRL partnership story could generate 30–50 qualified OEM leads. Competing suppliers Hydrolynk India are confirmed exhibitors.",
    cta: "View Event",
    kind: "event",
  },
  {
    id: "grec-3",
    title: "Develop EV Agriculture Cylinder Line",
    priority: "high",
    rationale: "Electric tractor adoption accelerating; TAFE and Mahindra both expanding EV range requiring new cylinder specs.",
    detail:
      "India's electric tractor market is projected to grow at 42% CAGR through 2030. TAFE and Mahindra are actively sourcing cylinder suppliers for their EV platforms. Bicelli Geco's precision machining and custom cylinder capability positions it perfectly to develop a new EV-optimised line with lower friction seals and compact profiles. Estimated 6-month development timeline.",
    cta: "Start Roadmap",
    kind: "risk",
  },
];

export const gecoTenders: GecoTender[] = [
  {
    id: "gt-1",
    title: "Mining Equipment Hydraulic Cylinders",
    client: "BEML / SAIL",
    value: "₹1.2 Cr",
    deadline: "12 days",
    deadlineDays: 12,
    matchScore: 89,
    reasons: [
      "Mill-duty cylinder manufacturing capability",
      "High-pressure welded cylinder portfolio",
      "IMS certification meets BEML vendor requirements",
    ],
    description:
      "Supply of hydraulic cylinders for surface mining and earth-moving equipment including draglines and shovels. Requires high-pressure rated, corrosion-resistant cylinders with full traceability documentation.",
  },
  {
    id: "gt-2",
    title: "Agricultural Tractor Cylinder Supply",
    client: "TAFE, Chennai",
    value: "₹65L",
    deadline: "28 days",
    deadlineDays: 28,
    matchScore: 82,
    reasons: [
      "Existing supply relationship with TAFE",
      "Tie-rod cylinder design matches tractor spec",
      "Local Coimbatore proximity reduces logistics cost",
    ],
    description:
      "Annual supply contract for hydraulic lift cylinders used in TAFE's MF series tractors. Requires consistent dimensional tolerances and painting specifications compliant with TAFE quality standards.",
  },
  {
    id: "gt-3",
    title: "Construction Equipment Hydraulics",
    client: "L&T Heavy Engineering",
    value: "₹90L",
    deadline: "45 days",
    deadlineDays: 45,
    matchScore: 74,
    reasons: [
      "Custom cylinder fabrication experience",
      "Telescopic cylinder range fits excavator specs",
      "Assembly and testing facility on-site",
    ],
    description:
      "Supply of custom-designed hydraulic cylinders for L&T's new generation of compact excavators and wheel loaders. Includes design collaboration, prototype validation, and series production ramp-up.",
  },
];

export const gecoEvents: GecoEvent[] = [
  {
    id: "gev-1",
    name: "bauma CONEXPO India",
    location: "Greater Noida",
    date: "10 Sep 2026",
    attendees: "30,000+ trade visitors",
    reasons: [
      "Top construction OEMs purchasing teams present",
      "Telescopic cylinder showcase opportunity",
      "Hydrolynk India and Italian competitors exhibiting",
    ],
    suggestedAction: "Book 18sqm booth, showcase telescopic and welded cylinder range alongside Bicelli SRL Italy branding.",
  },
  {
    id: "gev-2",
    name: "Indo-Italian Industrial Summit",
    location: "Mumbai",
    date: "5 Nov 2026",
    attendees: "500+ senior executives",
    reasons: [
      "Bilateral trade mission with Bicelli SRL Italy alignment",
      "Export market development opportunities",
      "Government procurement officials attending",
    ],
    suggestedAction: "Register as Indo-Italian JV case study presenter to highlight export success story.",
  },
];

export const gecoTimeline: GecoTimelineEntry[] = [
  { id: "gt1", time: "8:45 AM",  label: "Mining cylinder tender matched — 89% fit",     kind: "tender"  },
  { id: "gt2", time: "10:30 AM", label: "TAFE repeat order signal detected",              kind: "summary" },
  { id: "gt3", time: "2:00 PM",  label: "bauma CONEXPO registration deadline reminder",   kind: "event"   },
  { id: "gt4", time: "4:15 PM",  label: "Steel raw material price escalation flagged",    kind: "risk"    },
];

export const gecoGraphNodes: GecoGraphNode[] = [
  { id: "gco",     label: "Bicelli Geco",      type: "company"    },
  { id: "part-1",  label: "Bicelli SRL Italy", type: "partner"    },
  { id: "cust-1",  label: "TAFE",              type: "customer"   },
  { id: "cust-2",  label: "BEML",              type: "customer"   },
  { id: "prod-1",  label: "Telescopic Cyl.",   type: "product"    },
  { id: "prod-2",  label: "Welded Cylinders",  type: "product"    },
  { id: "tend-1",  label: "Mining Tender",     type: "tender"     },
  { id: "ev-1",    label: "bauma CONEXPO",     type: "event"      },
  { id: "comp-1",  label: "Hydrolynk India",   type: "competitor" },
];

export const gecoGraphEdges: GecoGraphEdge[] = [
  { source: "gco",    target: "part-1", label: "JV partner" },
  { source: "gco",    target: "cust-1", label: "supplies"   },
  { source: "gco",    target: "cust-2", label: "supplies"   },
  { source: "gco",    target: "prod-1", label: "makes"      },
  { source: "gco",    target: "prod-2", label: "makes"      },
  { source: "prod-1", target: "tend-1", label: "qualifies"  },
  { source: "prod-2", target: "tend-1", label: "qualifies"  },
  { source: "gco",    target: "ev-1",   label: "recommended"},
  { source: "comp-1", target: "tend-1", label: "competes"   },
];
