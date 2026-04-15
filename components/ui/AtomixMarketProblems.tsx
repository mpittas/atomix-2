"use client";

import { type ReactNode, useState } from "react";
import {
  FaBan,
  FaBinoculars,
  FaClockRotateLeft,
  FaFileCircleXmark,
  FaHandHoldingDollar,
  FaHourglassHalf,
  FaLink,
  FaMoneyBillTransfer,
  FaPeopleGroup,
  FaPersonCircleQuestion,
  FaScaleUnbalanced,
  FaShieldHalved,
  FaShuffle,
  FaTriangleExclamation,
  FaUserLock,
  FaUserSlash,
  FaUsersSlash,
  FaXmark,
} from "react-icons/fa6";
import IconBox from "@/components/IconBox";

interface TabData {
  title: string;
  items: string[];
  iconBoxes: {
    src?: string;
    icon?: ReactNode;
    title: string;
    description: string;
  }[];
}

const icons = {
  noVisibility: <FaBinoculars className="h-10 w-10" />,
  noCompliance: <FaShieldHalved className="h-10 w-10" />,
  noAudit: <FaFileCircleXmark className="h-10 w-10" />,
  noAccess: <FaUserLock className="h-10 w-10" />,
  fragmented: <FaLink className="h-10 w-10" />,
  noWarning: <FaTriangleExclamation className="h-10 w-10" />,
  touchpoints: <FaPeopleGroup className="h-10 w-10" />,
  uneconomic: <FaScaleUnbalanced className="h-10 w-10" />,
  hiring: <FaUsersSlash className="h-10 w-10" />,
  fraud: <FaBan className="h-10 w-10" />,
  slow: <FaHourglassHalf className="h-10 w-10" />,
  noData: <FaXmark className="h-10 w-10" />,
  opaque: <FaPersonCircleQuestion className="h-10 w-10" />,
  delays: <FaClockRotateLeft className="h-10 w-10" />,
  chasing: <FaShuffle className="h-10 w-10" />,
  noMatch: <FaUserSlash className="h-10 w-10" />,
  costly: <FaMoneyBillTransfer className="h-10 w-10" />,
  scattered: <FaHandHoldingDollar className="h-10 w-10" />,
};

const tabsData: TabData[] = [
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
        icon: icons.noVisibility,
        title:
          "No real-time visibility into loan performance, policy adherence or portfolio analytics",
        description: "",
      },
      {
        icon: icons.noCompliance,
        title: "Must trust lenders to follow stated policies",
        description: "With checks only after the fact",
      },
      {
        icon: icons.fraud,
        title: "Fraud and misrepresentation risks",
        description:
          "Lending rules can be broken with no mechanism for detection",
      },
      {
        icon: icons.scattered,
        title: "Capital locked for the full term",
        description: "No secondary liquidity, no exit mechanism",
      },
      {
        icon: icons.fragmented,
        title:
          "Diversiﬁed small-loan portfolios are administratively punishing",
        description:
          "Pushing capital toward larger, more concentrated positions",
      },
      {
        icon: icons.costly,
        title: "Bolt-on compliance controls have become a permanent overhead",
        description:
          "Costs that exist because the underlying infrastructure cannot be trusted",
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
        icon: icons.touchpoints,
        title: "100+ manual touchpoints per loan",
        description:
          "Growth requires hiring, scaling requires heavy investment",
      },
      {
        icon: icons.noAccess,
        title: "Smaller originators shut out of institutional capital",
        description:
          "Too small for dedicated facilities, unable to achieve securitisation scale individually",
      },
      {
        icon: icons.uneconomic,
        title:
          "High ﬁxed processing costs make smaller, most in-demand loans uneconomic to originate",
        description: "",
      },
      {
        icon: icons.noAudit,
        title: "Existing systems are rigid and expensive to adapt",
        description:
          "New products, rule changes and workﬂow modiﬁcations require developers, long lead times and signiﬁcant cost",
      },
      {
        icon: icons.slow,
        title: "40-60% of applications never complete",
        description:
          "But their full processing costs are absorbed by completed loans, further eroding margins",
      },
      {
        icon: icons.costly,
        title: "Due diligence costs are prohibitive for smaller lenders",
        description:
          "Institutional capital remains out of reach regardless of loan book quality",
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
        icon: icons.chasing,
        title:
          "Re-enter the same data for every lender and every service provider",
        description: "",
      },
      {
        icon: icons.opaque,
        title: "No certainty of outcome until the ﬁnal moment",
        description: "Process lacks transparency, consistency and certainty",
      },
      {
        icon: icons.delays,
        title: "Opaque, slow process",
        description:
          "Completions exceed 35 days, initial underwriting alone takes up to a week",
      },
      {
        icon: icons.noVisibility,
        title: "No visibility into status or next steps",
        description:
          "Entirely dependent on manual updates and underwriter discretion",
      },
    ],
  },
];

export default function AtomixMarketProblems() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col items-center gap-y-12 w-full mx-auto">
      <div className="flex flex-col gap-y-6 items-center text-center max-w-6xl mx-auto mb-4">
        <h2 className="text-5xl leading-[1.2em] font-semibold text-white">
          Market Problems
        </h2>
        <p className="text-white/80 text-lg">
          Property lending is manual, slow and opaque — at every level.
        </p>
      </div>

      <div className="flex flex-col w-full">
        {/* Tab Buttons */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full mb-8">
          {tabsData.map((tab, index) => (
            <button
              key={tab.title}
              onClick={() => setActiveIndex(index)}
              className={`relative flex-1 flex flex-col justify-center gap-4 rounded-xl transition-all duration-300 p-5 overflow-hidden ${
                index === activeIndex
                  ? "bg-[#eaeff1] text-[#0f1b1e]"
                  : "bg-[#124652] text-white hover:bg-[#1a5a69]"
              }`}
            >
              <div className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute -top-8 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-center relative z-10">
                {tab.title}
              </h3>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          className={`grid ${activeIndex === 2 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"} gap-4 w-full`}
        >
          {tabsData[activeIndex].iconBoxes.map((iconBox, index) => (
            <div key={`${activeIndex}-${index}`} className="relative">
              <IconBox
                icon={iconBox.icon}
                src={iconBox.src}
                title={iconBox.title}
                description={iconBox.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
