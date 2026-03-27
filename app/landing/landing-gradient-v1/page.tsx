"use client";

import Header from "@/components/header";
import MainHero from "./components/MainHero";
import DefHeading from "@/components/typo/DefHeading";
import FlowGraphicLight from "@/components/FlowGraphicLight";
import FlowCardsHor from "@/components/FlowCardsHor";
import { Button as DefButton } from "@/components/ui";
import { DefTabs } from "@/components/ui";
import SolutionsRow from "./components/SolutionsRow";

import {
  CapitalProvidersContent,
  LendersContent,
  BorrowersContent,
} from "./components/SimpleIconBoxRows";

export default function LandingGradientV1Page() {
  return (
    <div className="overflow-x-hidden">
      <div className="bg-white px-12" id="def-hero-main">
        <Header />
        <MainHero />
      </div>

      <div className="px-12 mt-16 min-h-[300vh] flex flex-col gap-2">
        <div className="h-full">
          <div className="px-18 py-36 rounded-t-3xl bg-linear-to-b from-[#020637] to-[#BFC3ED]">
            <div className="max-w-[1060px] mx-auto px-4">
              <DefHeading
                theme="light"
                badgeText="Executive Summary"
                badgeColor="blue"
                title="Automating the UK Bridging Loans Market"
                description="Collaborative, Trusted, End-to-End Automation"
              />

              <div className="mt-12 flex flex-col items-center">
                <FlowGraphicLight />

                <div className="mt-14">
                  <DefButton size="large">Learn more</DefButton>
                </div>
              </div>
            </div>
          </div>

          <div className="px-18 py-36 rounded-b-3xl bg-linear-to-t from-[#020637] to-[#BFC3ED]">
            <div className="max-w-[1060px] mx-auto px-4">
              <DefHeading
                theme="light"
                badgeText="The Market Reality"
                title="Market Problems in Bridging Loans"
                description="Opaque systems limit control, visibility and trust across capital providers, lenders and borrowers."
              />

              <div className="mt-12 flex flex-col items-center">
                <DefTabs
                  tabs={[
                    {
                      id: "capital-providers",
                      label: "Capital Providers",
                      content: <CapitalProvidersContent />,
                    },
                    {
                      id: "lenders",
                      label: "Lenders",
                      content: <LendersContent />,
                    },
                    {
                      id: "borrowers",
                      label: "Borrowers",
                      content: <BorrowersContent />,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="h-full">
          <div className="px-18 py-36 rounded-t-3xl bg-linear-to-b from-[#020637] to-[#BFC3ED]">
            <div className="max-w-[1060px] mx-auto px-4">
              <DefHeading
                theme="light"
                badgeText="The Opportunity"
                title="Existing Tech Limitations"
                description="Move beyond fragmented tools and manual coordination. Experience collaborative, secure, end-to-end automation 
built for real-world complexity."
              />

              <div className="mt-12 flex flex-col items-center">
                <FlowCardsHor />
                <div className="mt-14">
                  <DefButton size="large">Learn more</DefButton>
                </div>
              </div>
            </div>
          </div>

          <div className="px-18 py-36 rounded-b-3xl bg-linear-to-t from-[#020637] to-[#BFC3ED]">
            <div className="max-w-[1260px] mx-auto px-4">
              <div className="max-w-[1060px] mx-auto">
                <DefHeading
                  theme="light"
                  badgeText="Solutions"
                  title="The Tech Stack Solution"
                  description="AI-powered rule enforcement, full end-to-end automation, and blockchain-backed auditability
— delivering visibility, collaboration, and trust across the lending ecosystem."
                />
              </div>

              <div className="mt-12 flex flex-col items-center">
                <SolutionsRow />

                <div className="mt-14">
                  <DefButton size="large">Learn more</DefButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
