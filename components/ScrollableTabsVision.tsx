"use client";

import {
  ScrollableTabsSection,
  type ScrollableTabsSectionTabData,
} from "@/components/ScrollableTabsMission";

const visionTabsData: ScrollableTabsSectionTabData[] = [
  {
    title: "Capital Providers",
    items: [
      "Invest with full transparency",
      "Automated compliance checks",
      "Diversified lending opportunities",
      "Real-time portfolio tracking",
    ],
    iconBoxes: [
      {
        src: "/icons/white/money-coins-white.svg",
        title:
          "Access diversified, on-chain-audited loan pools across multiple lenders via a single integration",
        description: "",
      },
      {
        src: "/icons/white/clock-white.svg",
        title: "Tokenised liquidity",
        description:
          "Loans as active financial instruments: collateral that can be deployed, financed an traded, not just held",
      },
      {
        src: "/icons/white/arrows-white.svg",
        title: "Hybrid capital architecture",
        description:
          "Permissioned RWA collateral combined with open liquidity pools, with compliance embedded into market design",
      },
      {
        src: "/icons/white/eye-white-crossed.svg",
        title:
          "Real-time compliance enforcement and portfolio visibility across every loan in the ecosystem",
        description: "",
      },
    ],
  },
  {
    title: "Lenders",
    items: [
      "Automate lending workflows",
      "Access capital faster",
      "Scale without adding headcount",
      "Reduce manual touchpoints",
    ],
    iconBoxes: [
      {
        src: "/icons/white/money-coins-white.svg",
        title: "Multi-lender marketplace",
        description:
          "compete on a level playing field with credit rules enforced by the platform, not individuals",
      },
      {
        src: "/icons/white/clock-white.svg",
        title: "Tokenised liquidity pools",
        description:
          "Enabling lenders to access secondary capital markets and broaden their funding base",
      },
      {
        src: "/icons/white/arrows-white.svg",
        title: "Consumer mortgages",
        description:
          "The same proven infrastructure applied to the world's largest retail lending market",
      },
      {
        src: "/icons/white/eye-white-crossed.svg",
        title: "Asset-backed lending",
        description:
          "Built for property first; designed to extend across other asset classes and connected financial services",
      },
    ],
  },
  {
    title: "Borrowers",
    items: [
      "Faster loan approvals",
      "Transparent process tracking",
      "Reduced documentation burden",
      "Better rate accessibility",
    ],
    iconBoxes: [
      {
        src: "/icons/white/money-coins-white.svg",
        title: "Real-time lender comparison and click-to-completion",
        description: "A single unbroken journey from enquiry to drawdown",
      },
      {
        src: "/icons/white/clock-white.svg",
        title: "AI agents available 24/7",
        description:
          "Handling queries, tracking progress and answering specific questions about their loan in natural language",
      },
      {
        src: "/icons/white/arrows-white.svg",
        title: "Loan optimiser",
        description:
          "Matched lenders, predicted rates and approval likelihood, powered by AI",
      },
      {
        src: "/icons/white/eye-white-crossed.svg",
        title: "Direct investment model",
        description:
          "Access to a broader, more competitive pool of capital as the marketplace scales",
      },
    ],
  },
];

export default function ScrollableTabsVision() {
  return (
    <ScrollableTabsSection
      title="Vision"
      sectionId="vision"
      description="A global marketplace for property lending — commercial and residential, starting in the UK and expanding internationally."
      tabsData={visionTabsData}
    />
  );
}
