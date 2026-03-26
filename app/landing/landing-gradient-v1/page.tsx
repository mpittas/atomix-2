"use client";

import Header from "@/components/header";
import MainHero from "./components/MainHero";

export default function LandingGradientV1Page() {
  return (
    <div className="overflow-x-hidden">
      <div className="bg-white px-12" id="def-hero-main">
        <Header />
        <MainHero />
      </div>

      <div className="h-[300vh]"></div>
    </div>
  );
}
