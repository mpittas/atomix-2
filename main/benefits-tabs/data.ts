export interface TabItem {
  icon: string;
  text: string;
}

export interface TabData {
  title: string;
  description: string;
  mainImage: string;
  smallImages?: string[];
  smallImage?: string;
  items: TabItem[];
}

export const tabsData: TabData[] = [
  {
    title: "Capital Providers",
    description:
      "Invest with full transparency, automated compliance, and access to diversified lending opportunities.",
    mainImage: "/images/dashboard-cp-main.svg",
    smallImages: [
      "/images/dashboard-cp-1.svg",
      "/images/dashboard-cp-2.svg",
      "/images/dashboard-cp-3.svg",
    ],
    smallImage: undefined as string | undefined,
    items: [
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Blind trust replaced — with real-time transparency and verifiable audit trails",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Fraud eliminated at source — by design, not as an afterthought",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Due diligence costs slashed — through automated compliance checks",
      },
      {
        icon: "/icons/white/rocket-simple.svg",
        text: "Liquidity unlocked — via on-chain asset tokenization",
      },
      {
        icon: "/icons/white/path-arrows.svg",
        text: "Granularity penalty eliminated — enabling fractional investment",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Bolt-on compliance controls replaced by architecture — every decision is auditable",
      },
    ],
  },
  {
    title: "Lenders",
    description:
      "Automate lending workflows, access capital faster, and scale operations without increasing headcount.",
    mainImage: "/images/dashboard-lenders-main.svg",
    smallImage: "/images/dashboard-lenders-small.svg",
    items: [
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Underwriter bottleneck broken — goal-driven workflow automation processes loans at scale; human touchpoints only where chosen",
      },
      {
        icon: "/icons/white/user-minus.svg",
        text: "Smaller loans profitable — usage-based fees scale with loan size, no fixed processing floor",
      },
      {
        icon: "/icons/white/scales.svg",
        text: "Capital access opened — platform compliance and audit infrastructure attracts institutional and private investors directly",
      },
      {
        icon: "/icons/white/module-simple.svg",
        text: "Rule changes in minutes — no-code configuration means no developer dependency, no delays, no operational risk",
      },
      {
        icon: "/icons/white/rocket-simple.svg",
        text: "Faster completion cuts funding costs directly — every day removed from the cycle reduces the cost of capital per loan",
      },
      {
        icon: "/icons/white/electricity-simple.svg",
        text: "Earlier automated decisioning reduces abort rates — costs no longer absorbed across completed loans, improving per-loan economics across the book",
      },
    ],
  },
  {
    title: "Borrowers",
    description:
      "Borrowers move from enquiry to drawdown in a structured, transparent journey.",
    mainImage: "/images/dashboard-partner-main.svg",
    smallImage: "/images/dashboard-partner-small.svg",
    items: [
      {
        icon: "/icons/white/electricity-simple.svg",
        text: "One application, every lender — data entered once, used across the entire journey via unified workspace",
      },
      {
        icon: "/icons/white/rocket-simple.svg",
        text: "Certainty from the start — instant indicative offer refined automatically as more information is provided",
      },
      {
        icon: "/icons/white/path-arrows.svg",
        text: "Live loan status throughout — consistent outcomes, no chasing, no dependence on underwriter discretion",
      },
      {
        icon: "/icons/white/module-simple.svg",
        text: "Faster process — underwriting instant; legal and valuation steps coordinated within the platform, not left to fragment",
      },
    ],
  },
];
