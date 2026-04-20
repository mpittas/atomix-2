"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "@/components/header";
import MainHero from "@/main/MainHero";
import MainProblemsTabs from "@/main/MainProblemsTabs";
import MainPyramidWrapper from "@/main/MainPyramidWrapper";
import MainSolutionsAnimation from "@/main/MainSolutionsAnimation";
import MainBenefitsTabs from "@/main/benefits-tabs/";
import MainTheMarket from "@/main/MainTheMarket";

import DefHeading from "@/components/typo/DefHeading";
import { Button as DefButton } from "@/components/ui";
import IconBox from "@/components/IconBox";
import { FaGlobe, FaUsers, FaMicrochip } from "react-icons/fa6";
import DefCta from "@/components/DefCta";
import Footer from "@/components/Footer";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import ScrollableTabsv2 from "@/components/ScrollableTabsv2";
import TechLimitations from "@/components/TechLimitations";
import WhyAtomixLayout from "@/components/WhyAtomixLayout";
import TheMarket from "@/components/TheMarket";
import ScrollableTabsBenefits from "@/components/ScrollableTabsBenefits";
import CurrentStatusDiagram from "@/components/CurrentStatusDiagram";
import MainCurrentStatus from "@/main/MainCurrentStatus";
import MainWhyWorkWithUs from "@/main/MainWhyWorkWithUs";

export default function MissionVisionSections() {
  return (
    <div className="html-wrap  relative">
      <div className="fixed inset-0 w-[1240px] left-1/2 -translate-x-1/2 border-l border-r border-dashed border-gray-950/30 z-[9999] pointer-events-none"></div>
      <Header />
      <div className="mt-24 py-32 bg-red-500/20 page-wrapper">
        <div className="max-w-[1260px] mx-auto px-4">
          <h1>Hello, World!</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}
