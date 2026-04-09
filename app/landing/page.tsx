"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "@/components/header";
import MainHero from "@/components/MainHero";
import DefHeading from "@/components/typo/DefHeading";
import FlowGraphicLight from "@/components/FlowGraphicLight";
import FlowCardsHor from "@/components/FlowCardsHor";
import { Button as DefButton } from "@/components/ui";
import SolutionsRow from "@/components/SolutionsRow";
import InfoRow from "@/components/InfoRow";
import IconBoxHorizontal from "@/components/IconBoxHorizontal";
import IconBox from "@/components/IconBox";
import { FaGlobe, FaUsers, FaMicrochip } from "react-icons/fa6";
import DefCta from "@/components/DefCta";
import Footer from "@/components/Footer";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import BenefitsLayout from "@/components/BenefitsLayout";
import ScrollableTabsv2 from "@/components/ScrollableTabsv2";
import TechLimitations from "@/components/TechLimitations";
import WhyAtomix from "@/components/WhyAtomix";
import TheMarket from "@/components/TheMarket";
import WhyWorkWithUs from "@/components/WhyWorkWithUs";
import ScrollableHeadingV2 from "@/components/ScrollableHeadingV2";
import CurrentStatus from "@/components/CurrentStatus";
import ScrollableTabsWhyAtomix from "@/components/ScrollableTabsWhyAtomix";
import ScrollableTabsBenefits from "@/components/ScrollableTabsBenefits";
import ScrollableTabsCurrentStatus from "@/components/ScrollableTabsCurrentStatus";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function LandingGradientV1Page() {
  const careersContainerRef = useRef<HTMLDivElement>(null);
  const careersBox1Ref = useRef<HTMLDivElement>(null);
  const careersBox2Ref = useRef<HTMLDivElement>(null);
  const careersBox3Ref = useRef<HTMLDivElement>(null);
  const useCasesRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const flowGraphicRef = useRef<HTMLDivElement>(null);
  const learnMoreBtnRef = useRef<HTMLDivElement>(null);
  const [flowAnimationReady, setFlowAnimationReady] = useState(false);

  const setupHoverEffect = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;

    const element = ref.current;

    element.addEventListener("mouseenter", () => {
      gsap.to(element, {
        scale: 1.2,
        zIndex: 10,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(element, {
        scale: 1,
        zIndex: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  };

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: careersContainerRef.current,
        start: "top 10%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      careersBox1Ref.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.8, ease: "back.out(1.7)" },
    )
      .fromTo(
        careersBox2Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.8, ease: "power3.out" },
        "-=0.35",
      )
      .fromTo(
        careersBox3Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.8, ease: "back.out(1.7)" },
        "-=0.35",
      );

    return () => {
      tl.kill();
    };
  }, []);

  useGSAP(
    () => {
      setupHoverEffect(careersBox1Ref);
      setupHoverEffect(careersBox2Ref);
      setupHoverEffect(careersBox3Ref);
    },
    { scope: careersContainerRef },
  );

  useEffect(() => {
    if (
      !useCasesRef.current ||
      !card1Ref.current ||
      !card2Ref.current ||
      !card3Ref.current
    )
      return;

    const cards = [card1Ref.current, card2Ref.current, card3Ref.current];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: useCasesRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      cards,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.15,
      },
    );

    return () => {
      tl.kill();
    };
  }, []);

  useGSAP(() => {
    if (!flowGraphicRef.current || !learnMoreBtnRef.current) return;
    gsap.set(flowGraphicRef.current, { opacity: 0, y: 60 });
    gsap.set(learnMoreBtnRef.current, { opacity: 0, y: 40 });
  });

  const handleDefHeadingComplete = useCallback(() => {
    if (!flowGraphicRef.current || !learnMoreBtnRef.current) return;

    setFlowAnimationReady(true);

    const tl = gsap.timeline();

    tl.to(flowGraphicRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    }).to(
      learnMoreBtnRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "+=4.5",
    );
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Header />
      <div className="bg-white px-12 mb-6 pt-24" id="def-hero-main">
        <MainHero />
      </div>

      <div className="px-12 mt-2 flex flex-col gap-2">
        <div className="h-full mb-6">
          <div
            // ref={sectionRef}
            className="relative px-18 py-36 rounded-t-3xl bg-linear-to-b from-[#0B4858] to-[#81A6AF] relative z-[50] overflow-hidden"
          >
            <div className="absolute -top-0 left-0 w-full h-[500px]">
              <SoftAurora
                speed={1.3}
                scale={1.2}
                brightness={0.65}
                color1="#78cfe3"
                color2="#87b9d4"
                noiseFrequency={1}
                noiseAmplitude={3.5}
                bandHeight={0.85}
                bandSpread={1}
                octaveDecay={0.12}
                layerOffset={0.5}
                colorSpeed={1}
                enableMouseInteraction={false}
                mouseInfluence={0.2}
              />
            </div>

            <ScrollableHeadingV2 />
          </div>

          <div className="relative px-18 py-8 rounded-b-3xl bg-linear-to-t from-[#0B4858] to-[#81A6AF] relative overflow-hidden">
            <ScrollableTabsv2 />
          </div>
        </div>

        <div className="h-full mb-6">
          <div className="px-18 py-36 rounded-t-3xl bg-linear-to-b from-[#0B4858] to-[#81A6AF] relative overflow-hidden">
            <div className="absolute -top-10 left-0 w-full h-[500px]">
              <SoftAurora
                speed={1.3}
                scale={1.2}
                brightness={0.65}
                color1="#78cfe3"
                color2="#87b9d4"
                noiseFrequency={1}
                noiseAmplitude={3.5}
                bandHeight={0.85}
                bandSpread={1}
                octaveDecay={0.12}
                layerOffset={0.5}
                colorSpeed={1}
                enableMouseInteraction={false}
                mouseInfluence={0.2}
              />
            </div>

            <div
              className="max-w-[1160px] px-8 mx-auto bg-red-500/0"
              id="tech-limitations"
            >
              <TechLimitations />
            </div>
          </div>

          <div className="px-18 py-36 rounded-b-3xl bg-linear-to-t from-[#0B4858] to-[#81A6AF]">
            <div className="max-w-[1260px] mx-auto px-4">
              <div className="max-w-[1060px] mx-auto">
                <DefHeading
                  theme="light"
                  badgeText=""
                  showBadge={false}
                  title="The Tech Stack Solution"
                  description="AI-powered rule enforcement, full end-to-end automation, and blockchain-backed auditability
— delivering visibility, collaboration, and trust across the lending ecosystem."
                />
              </div>

              <div className="mt-16 flex flex-col items-center">
                <SolutionsRow />

                <div className="mt-14">
                  <DefButton size="large">Learn more</DefButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full mb-6">
          <div className="px-18 py-36 rounded-3xl bg-linear-to-b from-[#0B4858] via-[#81A6AF] to-[#0B4858] relative overflow-hidden">
            <div className="absolute -top-10 left-0 w-full h-[500px]">
              <SoftAurora
                speed={1.3}
                scale={1.2}
                brightness={0.65}
                color1="#78cfe3"
                color2="#87b9d4"
                noiseFrequency={1}
                noiseAmplitude={3.5}
                bandHeight={0.85}
                bandSpread={1}
                octaveDecay={0.12}
                layerOffset={0.5}
                colorSpeed={1}
                enableMouseInteraction={false}
                mouseInfluence={0.2}
              />
            </div>
            <div className="max-w-[1200px] px-8 mx-auto bg-red-500/0">
              <div className="mt-0 flex flex-col items-center">
                <div className="w-full flex flex-col gap-32" id="info-rows">
                  {/* <BenefitsLayout /> */}
                  <ScrollableTabsBenefits />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="px-18 py-36 rounded-b-3xl bg-linear-to-t from-[#0B4858] to-[#81A6AF]">
            
          </div> */}
        </div>

        <div className="h-full mb-6">
          <div className="px-18 py-36 rounded-t-3xl bg-linear-to-b from-[#0B4858] to-[#81A6AF] relative overflow-hidden">
            <div className="absolute -top-10 left-0 w-full h-[500px]">
              <SoftAurora
                speed={1.3}
                scale={1.2}
                brightness={0.65}
                color1="#78cfe3"
                color2="#87b9d4"
                noiseFrequency={1}
                noiseAmplitude={3.5}
                bandHeight={0.85}
                bandSpread={1}
                octaveDecay={0.12}
                layerOffset={0.5}
                colorSpeed={1}
                enableMouseInteraction={false}
                mouseInfluence={0.2}
              />
            </div>

            <div
              className="max-w-[1200px] px-8 mx-auto bg-red-500/0"
              id="why-atomix"
            >
              {/* <WhyAtomix /> */}
              <ScrollableTabsWhyAtomix />
            </div>
          </div>

          <div className="px-18 py-36 rounded-b-3xl bg-linear-to-t from-[#0B4858] to-[#81A6AF]">
            <div
              className="max-w-[1200px] px-8 mx-auto bg-red-500/0"
              id="the-market"
            >
              <TheMarket />
            </div>
          </div>
        </div>

        <div className="h-full mb-12">
          <div className="px-18 py-36 rounded-3xl bg-linear-to-b from-[#0B4858] via-[#81A6AF] to-[#0B4858] relative overflow-hidden">
            <div className="absolute -top-10 left-0 w-full h-[500px]">
              <SoftAurora
                speed={1.3}
                scale={1.2}
                brightness={0.65}
                color1="#78cfe3"
                color2="#87b9d4"
                noiseFrequency={1}
                noiseAmplitude={3.5}
                bandHeight={0.85}
                bandSpread={1}
                octaveDecay={0.12}
                layerOffset={0.5}
                colorSpeed={1}
                enableMouseInteraction={false}
                mouseInfluence={0.2}
              />
            </div>

            <div className="mx-auto px-4">
              {/* <CurrentStatus /> */}
              <ScrollableTabsCurrentStatus />
            </div>
          </div>
        </div>

        <div
          ref={useCasesRef}
          className="mb-64 bg-red-500/0 min-h-[50vh]"
          id="use-cases"
        >
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="max-w-[1060px] mx-auto">
              <DefHeading
                theme="dark"
                badgeText="Careers"
                title="Why Work With Us"
                description="Join us in building the future of lending technology."
              />
            </div>

            <div className="w-full mt-16 flex items-center gap-6 bg-red-500/0">
              <div ref={card1Ref} className="flex-1">
                <IconBox
                  icon={<FaGlobe className="h-10 w-10" />}
                  title="Real-World Financial Infrastructure"
                  description="Build technology that powers real lending markets and impacts billions in asset-backed finance."
                />
              </div>

              <div ref={card2Ref} className="flex-1">
                <IconBox
                  icon={<FaUsers className="h-10 w-10" />}
                  title="Small Team, Big Impact"
                  description="Join a focused team where every contribution directly shapes the product, technology, and company."
                />
              </div>

              <div ref={card3Ref} className="flex-1">
                <IconBox
                  icon={<FaMicrochip className="h-10 w-10" />}
                  title="Cutting-Edge Technology"
                  description="Work across AI, automation, data systems, and blockchain-backed infrastructure."
                />
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <DefButton size="large">Learn more</DefButton>
            </div>
          </div>
        </div>
      </div>

      <div id="def-cta">
        <DefCta
          title="Build the Future of
Asset-Backed Lending"
        />
      </div>

      <Footer />
    </div>
  );
}
