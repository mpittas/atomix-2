"use client";

import MainHeroV3 from "@/components/MainHeroV3";
import HeaderRounded from "@/components/headerRounded";
import DefCta from "@/components/DefCta";
import Footer from "@/components/Footer";
import ScrollableTabsPlatform from "@/components/ScrollableTabsPlatform";

export default function LandingPlatformPage() {
  return (
    <div className="overflow-x-hidden">
      <HeaderRounded />
      <MainHeroV3 />

      <ScrollableTabsPlatform />

      <div id="def-cta" className="pt-30">
        <DefCta
          title="Build the Future of
Asset-Backed Lending"
        />
      </div>

      <Footer />
    </div>
  );
}
