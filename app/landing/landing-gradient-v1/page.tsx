"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "@/components/header";
import MainHero from "./components/MainHero";
import DefHeading from "@/components/typo/DefHeading";
import FlowGraphicLight from "@/components/FlowGraphicLight";
import FlowCardsHor from "@/components/FlowCardsHor";
import { Button as DefButton } from "@/components/ui";
import SolutionsRow from "./components/SolutionsRow";
import InfoRow from "@/components/InfoRow";
import IconBoxHorizontal from "@/components/IconBoxHorizontal";
import IconBox from "@/components/IconBox";
import CustomerStoryCard from "@/components/CustomerStoryCard";
import DefCta from "@/components/DefCta";
import Footer from "@/components/Footer";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import BenefitsLayout from "@/components/BenefitsLayout";
import ScrollableTabs from "@/components/ScrollableTabs";

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
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      careersBox1Ref.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
    )
      .fromTo(
        careersBox2Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.35",
      )
      .fromTo(
        careersBox3Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.35",
      );

    setupHoverEffect(careersBox1Ref);
    setupHoverEffect(careersBox2Ref);
    setupHoverEffect(careersBox3Ref);

    return () => {
      tl.kill();
    };
  }, []);

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

  useGSAP(
    () => {
      if (!flowGraphicRef.current || !learnMoreBtnRef.current) return;

      gsap.set(flowGraphicRef.current, { opacity: 0, y: 60 });
      gsap.set(learnMoreBtnRef.current, { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: flowGraphicRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(flowGraphicRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
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
    },
    { scope: flowGraphicRef },
  );

  return (
    <div className="overflow-x-hidden">
      <div className="bg-white px-12" id="def-hero-main">
        <Header />
        <MainHero />
      </div>

      <div className="px-12 mt-2 flex flex-col gap-2">
        <div className="h-full">
          <div className="px-18 py-36 rounded-t-3xl bg-linear-to-b from-[#0B4858] to-[#81A6AF] relative overflow-hidden">
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
            <div className="max-w-[1060px] mx-auto px-4">
              <DefHeading
                theme="light"
                badgeText="Executive Summary"
                badgeColor="blue"
                title="Automating the UK Bridging Loans Market"
                description="Collaborative, Trusted, End-to-End Automation"
              />

              <div className="mt-16 flex flex-col items-center">
                <div ref={flowGraphicRef}>
                  <FlowGraphicLight />
                </div>

                <div ref={learnMoreBtnRef} className="mt-14">
                  <DefButton size="large">Learn more</DefButton>
                </div>
              </div>
            </div>
          </div>

          <div className="px-18 py-36 rounded-b-3xl bg-linear-to-t from-[#0B4858] to-[#81A6AF] relative overflow-hidden">
            <div className="-mb-30">
              <div className="max-w-[1060px] mx-auto px-4 -bottom-36 relative">
                <DefHeading
                  theme="light"
                  badgeText="The Market Reality"
                  title="Market Problems in Bridging Loans"
                  description="Opaque systems limit control, visibility and trust across capital providers, lenders and borrowers."
                />
              </div>

              <div className="mt-16 flex flex-col items-center gap-16">
                <ScrollableTabs />
              </div>
            </div>
          </div>
        </div>

        <div className="h-full">
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
            <div className="max-w-[1060px] mx-auto px-4">
              <DefHeading
                theme="light"
                badgeText="The Opportunity"
                title="Existing Tech Limitations"
                description="Move beyond fragmented tools and manual coordination. Experience collaborative, secure, end-to-end automation 
built for real-world complexity."
              />

              <div className="mt-16 flex flex-col items-center">
                <FlowCardsHor />
                <div className="mt-14">
                  <DefButton size="large">Learn more</DefButton>
                </div>
              </div>
            </div>
          </div>

          <div className="px-18 py-36 rounded-b-3xl bg-linear-to-t from-[#0B4858] to-[#81A6AF]">
            <div className="max-w-[1260px] mx-auto px-4">
              <div className="max-w-[1060px] mx-auto">
                <DefHeading
                  theme="light"
                  badgeText="Solutions"
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

        <div className="h-full mb-12">
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
            <div className="max-w-[1260px] mx-auto px-4">
              <div className="max-w-[1060px] mx-auto">
                <DefHeading
                  theme="light"
                  badgeText="Platform Advantages"
                  title="Benefits"
                  description="Purpose-built lending infrastructure that reduces friction, accelerates decisions, and creates measurable advantages for capital providers, lenders, and borrowers alike."
                />
              </div>

              <div className="mt-16 flex flex-col items-center">
                <div className="w-full flex flex-col gap-32" id="info-rows">
                  <BenefitsLayout />
                </div>
              </div>
            </div>
          </div>

          <div className="px-18 py-36 rounded-b-3xl bg-linear-to-t from-[#0B4858] to-[#81A6AF]">
            <div className="max-w-[1260px] mx-auto px-4">
              <div className="max-w-[1060px] mx-auto">
                <DefHeading
                  theme="light"
                  badgeText="Careers"
                  title="Why Work With Us"
                  description="We are building a platform that automates and modernises the global lending ecosystem. Our team combines expertise in finance, AI, engineering and blockchain to create infrastructure for the future of asset-backed credit."
                />
              </div>

              <div className="mt-16 flex flex-col items-center">
                <div className="bg-red-500/0 flex flex-col items-stretch gap-6">
                  <div className="flex items-stretch gap-6">
                    <div className="flex-1 relative">
                      <IconBox
                        src="/icons/white/globe.svg"
                        title="Real-World Financial Infrastructure"
                        titleClassName="text-md font-semibold"
                        description="Build technology that powers real lending markets and impacts billions in asset-backed finance."
                      />
                    </div>

                    <div ref={careersBox2Ref} className="flex-1 relative">
                      <IconBox
                        src="/icons/white/users-group.svg"
                        title="Small Team, Big Impact"
                        titleClassName="text-md font-semibold"
                        description="Join a focused team where every contribution directly shapes the product, technology, and company."
                      />
                    </div>

                    <div ref={careersBox3Ref} className="flex-1 relative">
                      <IconBox
                        src="/icons/white/ai-chip.svg"
                        title="Cutting-Edge Technology"
                        titleClassName="text-md font-semibold"
                        description="Work across AI, automation, data systems, and blockchain-backed infrastructure."
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-14">
                  <DefButton size="large">Learn more</DefButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={useCasesRef} className="mb-64 bg-red-500/0 min-h-[50vh]">
          <div className="max-w-[1260px] mx-auto px-4">
            <div className="max-w-[1060px] mx-auto">
              <DefHeading
                theme="dark"
                badgeText="Use Cases"
                title="Delivering Real Results"
                description="Lorem ipsum"
              />
            </div>

            <div className="w-full mt-16 flex items-center gap-6 bg-red-500/0">
              <div ref={card1Ref} className="flex-1">
                <CustomerStoryCard
                  title="Customer Story 1"
                  description="Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit."
                />
              </div>

              <div ref={card2Ref} className="flex-1">
                <CustomerStoryCard
                  title="Customer Story 2"
                  description="Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit."
                />
              </div>

              <div ref={card3Ref} className="flex-1">
                <CustomerStoryCard
                  title="Customer Story 3"
                  description="Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit."
                />
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <DefButton size="large">Read more</DefButton>
            </div>
          </div>
        </div>
      </div>

      <DefCta
        title="Build the Future of
Asset-Backed Lending"
      />

      <Footer />
    </div>
  );
}
