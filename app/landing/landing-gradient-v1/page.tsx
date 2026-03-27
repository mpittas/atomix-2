"use client";

import Header from "@/components/header";
import MainHero from "./components/MainHero";
import DefHeading from "@/components/typo/DefHeading";
import FlowGraphicLight from "@/components/FlowGraphicLight";
import { Button as DefButton } from "@/components/ui";
import { DefTabs } from "@/components/ui";

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
                      content:
                        "Capital providers must trust lenders to follow lending rules with no real-time visibility into the process.",
                    },
                    {
                      id: "lenders",
                      label: "Lenders",
                      content:
                        "Lenders deal with 100+ manual touchpoints per loan, creating inefficiencies and delays.",
                    },
                    {
                      id: "borrowers",
                      label: "Borrowers",
                      content:
                        "Borrowers face an opaque and slow process with limited transparency throughout their journey.",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
