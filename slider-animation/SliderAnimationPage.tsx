import React from "react";
import { TabsSlider, TabData } from "./components/TabsSlider";
import { TabsSliderMobile } from "./components/TabsSliderMobile";
import { getStartedSlides } from "./data/getStartedSlides";
import { getStartedMobileSlides } from "./data/getStartedMobileSlides";
import { loanOfferSlides } from "./data/loanOfferSlides";

const TABS_DATA: TabData[] = [
  {
    id: "get-started",
    title: "Get started",
    slides: getStartedSlides,
  },
  {
    id: "loan-offer",
    title: "Loan offer",
    slides: loanOfferSlides,
  },
];

const MOBILE_TABS_DATA: TabData[] = [
  {
    id: "get-started",
    title: "Get started",
    slides: getStartedMobileSlides,
  },
];

interface SliderAnimationPageProps {
  isDesktop: boolean;
}

export function SliderAnimationPage({ isDesktop }: SliderAnimationPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center pt-12 pb-32">
      <div className="w-full max-w-[1000px] mx-auto px-4 text-center mb-0">
        <h1 className="text-4xl font-semibold text-black tracking-tight mb-4">
          Borrower Journey
        </h1>
      </div>

      <div className="w-full">
        {isDesktop ? (
          <TabsSlider tabs={TABS_DATA} />
        ) : (
          <TabsSliderMobile tabs={MOBILE_TABS_DATA} />
        )}
      </div>
    </div>
  );
}
