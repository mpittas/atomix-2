"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/header";
import MainHero from "./components/MainHero";
import DefHeading from "@/components/typo/DefHeading";
import FlowGraphicLight from "@/components/FlowGraphicLight";
import FlowCardsHor from "@/components/FlowCardsHor";
import { Button as DefButton } from "@/components/ui";
import { DefTabs } from "@/components/ui";
import SolutionsRow from "./components/SolutionsRow";
import InfoRow from "@/components/InfoRow";
import IconBoxHorizontal from "@/components/IconBoxHorizontal";
import IconBox from "@/components/IconBox";

gsap.registerPlugin(ScrollTrigger);

import {
  CapitalProvidersContent,
  LendersContent,
  BorrowersContent,
} from "./components/SimpleIconBoxRows";

export default function LandingGradientV1Page() {
  const careersContainerRef = useRef<HTMLDivElement>(null);
  const careersBox1Ref = useRef<HTMLDivElement>(null);
  const careersBox2Ref = useRef<HTMLDivElement>(null);
  const careersBox3Ref = useRef<HTMLDivElement>(null);

  const infoRowsContainerRef = useRef<HTMLDivElement>(null);
  const infoRow1Ref = useRef<HTMLDivElement>(null);
  const infoRow2Ref = useRef<HTMLDivElement>(null);
  const infoRow3Ref = useRef<HTMLDivElement>(null);

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

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (
      !infoRowsContainerRef.current ||
      !infoRow1Ref.current ||
      !infoRow2Ref.current ||
      !infoRow3Ref.current
    )
      return;

    const rows = [
      infoRow1Ref.current,
      infoRow2Ref.current,
      infoRow3Ref.current,
    ];

    gsap.set(rows, {
      position: "absolute",
      top: "50%",
      left: 0,
      width: "100%",
      y: "-50%",
    });
    const getColumns = (rowEl: HTMLElement) => {
      const left = rowEl.querySelector('[class*="order-1"]') as HTMLElement;
      const right = rowEl.querySelector('[class*="order-2"]') as HTMLElement;
      return { left, right };
    };

    const row1Cols = getColumns(infoRow1Ref.current);
    const row2Cols = getColumns(infoRow2Ref.current);
    const row3Cols = getColumns(infoRow3Ref.current);

    gsap.set(infoRow1Ref.current, { opacity: 1, zIndex: 3 });
    gsap.set(infoRow2Ref.current, { opacity: 1, zIndex: 2 });
    gsap.set(infoRow3Ref.current, { opacity: 1, zIndex: 1 });

    gsap.set([row1Cols.left, row2Cols.left, row3Cols.left], {
      x: -80,
      opacity: 0,
    });
    gsap.set([row1Cols.right, row2Cols.right, row3Cols.right], {
      x: 80,
      opacity: 0,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: infoRowsContainerRef.current,
        start: "bottom bottom",
        end: "+=300%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
      },
    });

    tl.to(
      row1Cols.left,
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
      0,
    )
      .to(
        row1Cols.right,
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
        0,
      )
      .to(
        row1Cols.left,
        { x: -80, opacity: 0, duration: 1, ease: "power2.in" },
        1,
      )
      .to(
        row1Cols.right,
        { x: 80, opacity: 0, duration: 1, ease: "power2.in" },
        1,
      )
      .set(infoRow1Ref.current, { zIndex: 0 })
      .to(
        row2Cols.left,
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
        1.5,
      )
      .to(
        row2Cols.right,
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
        1.5,
      )
      .set(infoRow2Ref.current, { zIndex: 3 }, 1.5)
      .to(
        row2Cols.left,
        { x: -80, opacity: 0, duration: 1, ease: "power2.in" },
        3,
      )
      .to(
        row2Cols.right,
        { x: 80, opacity: 0, duration: 1, ease: "power2.in" },
        3,
      )
      .set(infoRow2Ref.current, { zIndex: 0 })
      .to(
        row3Cols.left,
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
        3.5,
      )
      .to(
        row3Cols.right,
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
        3.5,
      )
      .set(infoRow3Ref.current, { zIndex: 3 }, 3.5);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <div className="bg-white px-12" id="def-hero-main">
        <Header />
        <MainHero />
      </div>

      <div className="px-12 mt-16 min-h-[300vh] flex flex-col gap-2">
        <div className="h-full">
          <div className="px-18 py-36 rounded-t-3xl bg-linear-to-b from-[#020637] to-[#BFC3ED]">
            <div className="max-w-[1060px] mx-auto px-4">
              <DefHeading
                theme="light"
                badgeText="Executive Summary"
                badgeColor="blue"
                title="Automating the UK Bridging Loans Market"
                description="Collaborative, Trusted, End-to-End Automation"
              />

              <div className="mt-16 flex flex-col items-center">
                <FlowGraphicLight />

                <div className="mt-14">
                  <DefButton size="large">Learn more</DefButton>
                </div>
              </div>
            </div>
          </div>

          <div className="px-18 py-36 rounded-b-3xl bg-linear-to-t from-[#020637] to-[#BFC3ED]">
            <div className="max-w-[1060px] mx-auto px-4">
              <DefHeading
                theme="light"
                badgeText="The Market Reality"
                title="Market Problems in Bridging Loans"
                description="Opaque systems limit control, visibility and trust across capital providers, lenders and borrowers."
              />

              <div className="mt-16 flex flex-col items-center">
                <DefTabs
                  tabs={[
                    {
                      id: "capital-providers",
                      label: "Capital Providers",
                      content: <CapitalProvidersContent />,
                    },
                    {
                      id: "lenders",
                      label: "Lenders",
                      content: <LendersContent />,
                    },
                    {
                      id: "borrowers",
                      label: "Borrowers",
                      content: <BorrowersContent />,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="h-full">
          <div className="px-18 py-36 rounded-t-3xl bg-linear-to-b from-[#020637] to-[#BFC3ED]">
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

          <div className="px-18 py-36 rounded-b-3xl bg-linear-to-t from-[#020637] to-[#BFC3ED]">
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
          <div className="px-18 py-36 rounded-t-3xl bg-linear-to-b from-[#020637] to-[#BFC3ED]">
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
                <div
                  ref={infoRowsContainerRef}
                  className="relative w-full h-screen flex items-center justify-center"
                  id="info-rows"
                >
                  <div ref={infoRow1Ref}>
                    <InfoRow
                      title="Capital Providers"
                      subtitle="Invest with full transparency, automated compliance, and access to diversified lending opportunities."
                      disableAnimation
                    >
                      <div className="flex flex-col gap-y-6">
                        <IconBoxHorizontal src="/icons/white/shield-check-white.svg">
                          <div className="max-w-[400px]">
                            <span className="font-semibold text-white">
                              Continuous compliance assuranceless
                            </span>{" "}
                            variance, easier audits
                          </div>
                        </IconBoxHorizontal>

                        <IconBoxHorizontal src="/icons/white/target-arrow.svg">
                          <div className="max-w-[340px]">
                            <span className="font-semibold">
                              Deploy capital exactly as intended <br></br>
                            </span>{" "}
                            with lower risk and lower upfront costs
                          </div>
                        </IconBoxHorizontal>

                        <IconBoxHorizontal src="/icons/white/module-simple.svg">
                          <div className="max-w-[340px]">
                            <span className="font-semibold">
                              One platform, many lenders<br></br>
                            </span>{" "}
                            removes barriers for all investor types
                          </div>
                        </IconBoxHorizontal>
                      </div>
                    </InfoRow>
                  </div>

                  <div ref={infoRow2Ref}>
                    <InfoRow
                      title="Lenders"
                      subtitle="Automate lending workflows, access capital faster, and scale operations without increasing headcount."
                      reverse={true}
                      imageSrc="/images/dashboard-lenders.svg"
                      disableAnimation
                    >
                      <div className="flex flex-col gap-y-6">
                        <IconBoxHorizontal src="/icons/white/shield-check-white.svg">
                          <div className="max-w-[500px]">
                            <span className="font-semibold text-white">
                              Access funding at any scale <br></br>
                            </span>{" "}
                            platform handles compliance, auditing and access,
                            attracting both institutional and private investors
                          </div>
                        </IconBoxHorizontal>

                        <IconBoxHorizontal src="/icons/white/user-minus.svg">
                          <div className="max-w-[400px]">
                            <span className="font-semibold text-white">
                              Scale business without scaling workforce <br></br>
                            </span>{" "}
                            grow volume without hiring
                          </div>
                        </IconBoxHorizontal>

                        <IconBoxHorizontal src="/icons/white/scales.svg">
                          <div className="max-w-[400px]">
                            <span className="font-semibold text-white">
                              Costs scale with loan size <br></br>
                            </span>{" "}
                            making smaller in-demand loans profitable
                          </div>
                        </IconBoxHorizontal>
                      </div>
                    </InfoRow>
                  </div>

                  <div ref={infoRow3Ref}>
                    <InfoRow
                      title="Borrowers"
                      subtitle="Borrowers move from enquiry to drawdown in a structured, transparent journey."
                      imageSrc="/images/dashboard-auction-finance.svg"
                      disableAnimation
                    >
                      <div className="flex flex-col gap-y-6">
                        <IconBoxHorizontal src="/icons/white/electricity-simple.svg">
                          <div className="max-w-[400px]">
                            <span className="font-semibold text-white">
                              Receive instant offer <br></br>
                            </span>{" "}
                            that improves as you add more details
                          </div>
                        </IconBoxHorizontal>

                        <IconBoxHorizontal src="/icons/white/rocket-simple.svg">
                          <div className="max-w-[340px]">
                            <span className="font-semibold text-white">
                              Complete in &lt; 2 days<br></br>
                            </span>{" "}
                            meet deadlines, seize opportunities
                          </div>
                        </IconBoxHorizontal>

                        <IconBoxHorizontal src="/icons/white/path-arrows.svg">
                          <div className="max-w-[440px]">
                            <span className="font-semibold text-white">
                              Always know your status and next steps<br></br>
                            </span>{" "}
                            no chasing, no guessing, consistent outcomes
                          </div>
                        </IconBoxHorizontal>
                      </div>
                    </InfoRow>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-18 py-36 rounded-b-3xl bg-linear-to-t from-[#020637] to-[#BFC3ED]">
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
                <div
                  ref={careersContainerRef}
                  className="bg-red-500/0 flex items-stretch gap-6"
                >
                  <div ref={careersBox1Ref} className="flex-1">
                    <IconBox
                      src="/icons/white/globe.svg"
                      title="Real-World Financial Infrastructure"
                      titleClassName="text-md font-semibold"
                      description="Build technology that powers real lending markets and impacts billions in asset-backed finance."
                      staticShine={1}
                      disableHover
                    />
                  </div>

                  <div ref={careersBox2Ref} className="flex-1">
                    <IconBox
                      src="/icons/white/users-group.svg"
                      title="Small Team, Big Impact"
                      titleClassName="text-md font-semibold"
                      description="Join a focused team where every contribution directly shapes the product, technology, and company."
                      staticShine={2}
                      disableHover
                    />
                  </div>

                  <div ref={careersBox3Ref} className="flex-1">
                    <IconBox
                      src="/icons/white/ai-chip.svg"
                      title="Cutting-Edge Technology"
                      titleClassName="text-md font-semibold"
                      description="Work across AI, automation, data systems, and blockchain-backed infrastructure."
                      staticShine={3}
                      disableHover
                    />
                  </div>
                </div>
                <div className="mt-14">
                  <DefButton size="large">Learn more</DefButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
