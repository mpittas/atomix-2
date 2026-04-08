"use client";

import MainHeroV3 from "@/components/MainHeroV3";
import HeaderRounded from "@/components/headerRounded";
import ScrollableTabsMission from "@/components/ScrollableTabsMission";
import ScrollableTabsVision from "@/components/ScrollableTabsVision";
import DefCta from "@/components/DefCta";
import Footer from "@/components/Footer";

export default function LandingPlatformPage() {
  return (
    <div className="overflow-x-hidden">
      <HeaderRounded />
      <MainHeroV3 />

      <ScrollableTabsMission />

      <ScrollableTabsVision />

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
