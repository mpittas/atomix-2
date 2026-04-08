"use client";

import MainHeroV3 from "@/components/MainHeroV3";
import HeaderRounded from "@/components/headerRounded";
import ScrollableTabsMission from "@/components/ScrollableTabsMission";
import ScrollableTabsVision from "@/components/ScrollableTabsVision";

export default function LandingPlatformPage() {
  return (
    <div className="overflow-x-hidden">
      <HeaderRounded />
      <MainHeroV3 />

      <ScrollableTabsMission />

      <ScrollableTabsVision />

      <div className="px-3">
        <div className="bg-green-900 min-h-screen rounded-3xl"></div>
      </div>
    </div>
  );
}
