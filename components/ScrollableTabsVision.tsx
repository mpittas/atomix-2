"use client";

import {
  ScrollableTabsSection,
  type ScrollableTabsSectionTabData,
} from "@/components/ScrollableTabsMission";
import {
  FaArrowsToEye,
  FaChartPie,
  FaCoins,
  FaEarthEurope,
  FaGears,
  FaHandHoldingDollar,
  FaLandmark,
  FaMoneyBillTransfer,
  FaRobot,
  FaScaleBalanced,
  FaTableCellsLarge,
  FaUsersViewfinder,
} from "react-icons/fa6";

const visionIcons = {
  diversifiedPools: <FaTableCellsLarge className="h-10 w-10" />,
  tokenLiquidity: <FaCoins className="h-10 w-10" />,
  hybridArchitecture: <FaScaleBalanced className="h-10 w-10" />,
  realtimeCompliance: <FaArrowsToEye className="h-10 w-10" />,
  marketplace: <FaUsersViewfinder className="h-10 w-10" />,
  lenderLiquidity: <FaMoneyBillTransfer className="h-10 w-10" />,
  mortgages: <FaLandmark className="h-10 w-10" />,
  assetBacked: <FaEarthEurope className="h-10 w-10" />,
  comparison: <FaChartPie className="h-10 w-10" />,
  agents: <FaRobot className="h-10 w-10" />,
  optimiser: <FaGears className="h-10 w-10" />,
  directInvest: <FaHandHoldingDollar className="h-10 w-10" />,
};

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
        icon: visionIcons.diversifiedPools,
        title:
          "Access diversified, on-chain-audited loan pools across multiple lenders via a single integration",
        description: "",
      },
      {
        icon: visionIcons.tokenLiquidity,
        title: "Tokenised liquidity",
        description:
          "Loans as active financial instruments: collateral that can be deployed, financed an traded, not just held",
      },
      {
        icon: visionIcons.hybridArchitecture,
        title: "Hybrid capital architecture",
        description:
          "Permissioned RWA collateral combined with open liquidity pools, with compliance embedded into market design",
      },
      {
        icon: visionIcons.realtimeCompliance,
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
        icon: visionIcons.marketplace,
        title: "Multi-lender marketplace",
        description:
          "compete on a level playing field with credit rules enforced by the platform, not individuals",
      },
      {
        icon: visionIcons.lenderLiquidity,
        title: "Tokenised liquidity pools",
        description:
          "Enabling lenders to access secondary capital markets and broaden their funding base",
      },
      {
        icon: visionIcons.mortgages,
        title: "Consumer mortgages",
        description:
          "The same proven infrastructure applied to the world's largest retail lending market",
      },
      {
        icon: visionIcons.assetBacked,
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
        icon: visionIcons.comparison,
        title: "Real-time lender comparison and click-to-completion",
        description: "A single unbroken journey from enquiry to drawdown",
      },
      {
        icon: visionIcons.agents,
        title: "AI agents available 24/7",
        description:
          "Handling queries, tracking progress and answering specific questions about their loan in natural language",
      },
      {
        icon: visionIcons.optimiser,
        title: "Loan optimiser",
        description:
          "Matched lenders, predicted rates and approval likelihood, powered by AI",
      },
      {
        icon: visionIcons.directInvest,
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
