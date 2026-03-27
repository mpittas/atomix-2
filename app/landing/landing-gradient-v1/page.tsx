"use client";

import Header from "@/components/header";
import MainHero from "./components/MainHero";
import DefHeading from "@/components/typo/DefHeading";
import FlowGraphicLight from "@/components/FlowGraphicLight";
import { Button as DefButton } from "@/components/ui";

export default function LandingGradientV1Page() {
  return (
    <div className="overflow-x-hidden">
      <div className="bg-white px-12" id="def-hero-main">
        <Header />
        <MainHero />
      </div>

      <div className="px-12 mt-16 min-h-[300vh] flex flex-col gap-2">
        <div className="bg-black/3 rounded-3xl h-full p-12">
          <div className="max-w-[1060px] mx-auto px-4">
            <DefHeading
              theme="dark"
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

        <div className="bg-black/3 rounded-3xl h-full p-12">
          <div className="max-w-[1060px] mx-auto px-4">
            <DefHeading
              theme="dark"
              badgeText="The Market Reality"
              badgeColor="red"
              title="Market Problems in Bridging Loans"
              description="Opaque systems limit control, visibility and trust across capital providers, lenders and borrowers."
            />

            <div className="mt-12 flex flex-col items-center">Hello World!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
