"use client";

import Header from "@/components/header";
import MainHero from "./components/MainHero";
import DefHeading from "@/components/typo/DefHeading";

export default function LandingGradientV1Page() {
  return (
    <div className="overflow-x-hidden">
      <div className="bg-white px-12" id="def-hero-main">
        <Header />
        <MainHero />
      </div>

      <div className="px-12 mt-16 min-h-[300vh]">
        <div className="bg-black/8 rounded-3xl h-full p-12">
          <DefHeading
            theme="dark"
            badgeText="Executive Summary"
            badgeColor="blue"
            title="Automating the UK Bridging Loans Market"
            description="Collaborative, Trusted, End-to-End Automation"
          />
        </div>
      </div>
    </div>
  );
}
