"use client";

import { useRef } from "react";
import Header from "@/components/header";
import DefCta from "@/components/DefCta";
import Footer from "@/components/Footer";
import Image from "next/image";
import IconBoxHorizontal from "@/components/IconBoxHorizontal";
import DefHeading from "@/components/typo/DefHeading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FaBuilding,
  FaFileSignature,
  FaCalculator,
  FaHandshake,
  FaSliders,
  FaCircleCheck,
  FaGavel,
  FaLink,
  FaScaleBalanced,
  FaCubes,
  FaClockRotateLeft,
  FaBolt,
  FaUserCheck,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

export default function CurrentStatusV1Page() {
  const sectionRef = useRef<HTMLElement>(null);

  const animatePanel = (panel: HTMLElement) => {
    const speed = 3;
    const imageItems = panel.querySelectorAll(".cs-image-item");
    const textItems = panel.querySelectorAll("[data-cs-item]");
    const listItems = panel.querySelectorAll("[data-cs-items] > div");

    gsap.killTweensOf([imageItems, textItems, listItems]);

    gsap.set(imageItems, { autoAlpha: 0, y: 24, scale: 0.96 });
    gsap.set(textItems, { autoAlpha: 0, y: 18 });
    gsap.set(listItems, { autoAlpha: 0, y: 16 });

    const tl = gsap.timeline({ defaults: { overwrite: "auto" } });

    tl.to(imageItems, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.45 * speed,
      stagger: 0.08 * speed,
      ease: "power2.out",
    })
      .to(
        textItems,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4 * speed,
          stagger: 0.06 * speed,
          ease: "power2.out",
        },
        `-=${0.2 * speed}`,
      )
      .to(
        listItems,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4 * speed,
          stagger: 0.08 * speed,
          ease: "power2.out",
        },
        `-=${0.12 * speed}`,
      );
  };

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const panels = gsap.utils.toArray<HTMLElement>(
        "[data-cs-panel]",
        sectionRef.current,
      );

      const triggers = panels.map((panel) =>
        ScrollTrigger.create({
          trigger: panel,
          start: "top 75%",
          once: true,
          onEnter: () => animatePanel(panel),
        }),
      );

      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    },
    { scope: sectionRef },
  );

  return (
    <div className="overflow-x-hidden">
      <Header />

      <div className="px-12 pt-21 pb-12 mt-2 flex flex-col gap-2">
        <section
          ref={sectionRef}
          className="px-18 py-36 rounded-3xl bg-linear-to-b from-[#0B4858] via-[#81A6AF] to-[#0B4858] relative overflow-hidden py-20"
        >
          <div className="mx-auto max-w-[1200px] flex flex-col gap-y-24 px-6">
            <DefHeading
              theme="light"
              badgeText="Careers"
              showBadge={false}
              title="Current Status"
              description="Atomix is live and building — two product launches confirmed for 2026: cash home-buyer MVP (Q2) and auction finance MVP (Q3)."
            />

            <div
              data-cs-panel
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            >
              <div>
                <div className="relative w-full pr-8 pb-8">
                  <div>
                    <Image
                      src="/images/dashboard-cp-main.svg"
                      alt=""
                      width={600}
                      height={400}
                      className="cs-image-item object-contain rounded-lg w-full h-auto"
                    />
                  </div>

                  <div className="absolute bottom-0 right-0 min-h-20 flex flex-col gap-2">
                    <Image
                      src="/images/dashboard-cp-1.svg"
                      alt=""
                      width={200}
                      height={100}
                      className="cs-image-item object-contain rounded-lg w-full h-auto"
                    />

                    <Image
                      src="/images/dashboard-cp-2.svg"
                      alt=""
                      width={200}
                      height={100}
                      className="cs-image-item object-contain rounded-lg w-full h-auto"
                    />

                    <Image
                      src="/images/dashboard-cp-3.svg"
                      alt=""
                      width={200}
                      height={100}
                      className="cs-image-item object-contain rounded-lg w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2
                  data-cs-item
                  className="text-3xl font-bold mb-4 text-white pb-8"
                >
                  Cash Home Buyer MVP — Q2 2026
                </h2>
                <div data-cs-items className="grid grid-cols-1 gap-6">
                  <div>
                    <IconBoxHorizontal
                      icon={<FaBuilding className="w-6 h-6" />}
                    >
                      <div>
                        <span className="font-semibold text-white">
                          Built for wholesale home-buying companies executing
                          multiple transactions per month
                        </span>
                        {" — "}
                        company-level onboarding including KYC, credit checks
                        and director profile capture
                      </div>
                    </IconBoxHorizontal>
                  </div>

                  <div>
                    <IconBoxHorizontal
                      icon={<FaFileSignature className="w-6 h-6" />}
                    >
                      <div className="max-w-[400px]">
                        <span className="font-semibold text-white">
                          Survey-led origination
                        </span>
                        {" — "}
                        borrower submits survey ID; platform fetches the report,
                        checks lender eligibility criteria in real time and
                        removes non-applicable criteria automatically
                      </div>
                    </IconBoxHorizontal>
                  </div>

                  <div>
                    <IconBoxHorizontal
                      icon={<FaCalculator className="w-6 h-6" />}
                    >
                      <div className="max-w-[400px]">
                        <span className="font-semibold text-white">
                          Pre-approved offer calculated instantly against survey
                          data
                        </span>
                        {" — "}
                        below threshold approved without intervention; above
                        threshold automatically referred to lender
                      </div>
                    </IconBoxHorizontal>
                  </div>

                  <div>
                    <IconBoxHorizontal
                      icon={<FaHandshake className="w-6 h-6" />}
                    >
                      <div className="max-w-[400px]">
                        <span className="font-semibold text-white">
                          Dual representation
                        </span>
                        {" — "}
                        lawyer acts for both borrower and lender; standing
                        instructions held on file, no manual briefing required
                      </div>
                    </IconBoxHorizontal>
                  </div>

                  <div>
                    <IconBoxHorizontal icon={<FaSliders className="w-6 h-6" />}>
                      <div className="max-w-[400px]">
                        <span className="font-semibold text-white">
                          Lender confirms debenture preference and verifies loan
                          parameters at drawdown
                        </span>
                        {" — "}
                        editable within the platform
                      </div>
                    </IconBoxHorizontal>
                  </div>

                  <div>
                    <IconBoxHorizontal
                      icon={<FaCircleCheck className="w-6 h-6" />}
                    >
                      <div className="max-w-[400px]">
                        <span className="font-semibold text-white">
                          Lawyer acknowledges receipt of funds, enters
                          completion date and confirms final due diligence;
                          blockchain entries processed and transaction closed
                        </span>
                      </div>
                    </IconBoxHorizontal>
                  </div>
                </div>
              </div>
            </div>

            <div
              data-cs-panel
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            >
              <div>
                <h2
                  data-cs-item
                  className="text-3xl font-bold mb-4 text-white pb-8"
                >
                  Auction Finance MVP — Q3 2026
                </h2>

                <div data-cs-items className="flex flex-col gap-y-6">
                  <div>
                    <IconBoxHorizontal icon={<FaGavel className="w-6 h-6" />}>
                      <div className="max-w-[500px]">
                        <span className="font-semibold text-white">
                          Built for timed and live auction formats
                        </span>
                        {" — "}
                        closes the gap on the 28-day completion deadline manual
                        bridging cannot meet
                      </div>
                    </IconBoxHorizontal>
                  </div>

                  <div>
                    <IconBoxHorizontal icon={<FaLink className="w-6 h-6" />}>
                      <div className="max-w-[400px]">
                        <span className="font-semibold text-white">
                          Finance widget embedded in auction house listings
                        </span>
                        {" — "}
                        licensed per auction house; directs bidders to a
                        white-labelled Atomix platform, no account required
                      </div>
                    </IconBoxHorizontal>
                  </div>

                  <div>
                    <IconBoxHorizontal
                      icon={<FaScaleBalanced className="w-6 h-6" />}
                    >
                      <div className="max-w-[500px]">
                        <span className="font-semibold text-white">
                          Guaranteed pre-auction offer generated instantly
                        </span>
                        {" — "}
                        AVM valuation plus lender credit policy; subject only to
                        legal due diligence
                      </div>
                    </IconBoxHorizontal>
                  </div>

                  <div>
                    <IconBoxHorizontal icon={<FaCubes className="w-6 h-6" />}>
                      <div className="max-w-[500px]">
                        <span className="font-semibold text-white">
                          Loan terms customisable pre-auction
                        </span>
                        {" — "}
                        amount, term and interest treatment adjustable in real
                        time, offer updating instantly
                      </div>
                    </IconBoxHorizontal>
                  </div>

                  <div>
                    <IconBoxHorizontal
                      icon={<FaClockRotateLeft className="w-6 h-6" />}
                    >
                      <div className="max-w-[500px]">
                        <span className="font-semibold text-white">
                          Progress saved automatically
                        </span>
                        {" — "}
                        bidders pause and resume via secure link at any time
                      </div>
                    </IconBoxHorizontal>
                  </div>

                  <div>
                    <IconBoxHorizontal icon={<FaBolt className="w-6 h-6" />}>
                      <div className="max-w-[500px]">
                        <span className="font-semibold text-white">
                          Post-auction: winning buyer notified automatically
                          with a pre-approved offer, even without prior platform
                          engagement
                        </span>
                        {" — "}
                        sale price pulled from auction house data to
                        pre-populate the application
                      </div>
                    </IconBoxHorizontal>
                  </div>

                  <div>
                    <IconBoxHorizontal
                      icon={<FaUserCheck className="w-6 h-6" />}
                    >
                      <div className="max-w-[500px]">
                        <span className="font-semibold text-white">
                          Onboarding triggered post-auction
                        </span>
                        {" — "}
                        KYC, AML and eligibility checks configured by lender;
                        supports individuals and companies
                      </div>
                    </IconBoxHorizontal>
                  </div>

                  <div>
                    <IconBoxHorizontal
                      icon={<FaArrowUpRightFromSquare className="w-6 h-6" />}
                    >
                      <div className="max-w-[500px]">
                        <span className="font-semibold text-white">
                          Natural extension pathway
                        </span>
                        {" — "}
                        bridge-to-let as follow-on product; nearly half of all
                        bridging loans convert to buy-to-let
                      </div>
                    </IconBoxHorizontal>
                  </div>
                </div>
              </div>

              <div>
                <div className="relative w-full pr-8 pb-8">
                  <div>
                    <Image
                      src="/images/dashboard-lenders-main.svg"
                      alt=""
                      width={600}
                      height={400}
                      className="cs-image-item object-contain rounded-lg w-full h-auto"
                    />
                  </div>

                  <Image
                    src="/images/dashboard-lenders-small.svg"
                    alt=""
                    width={360}
                    height={200}
                    className="cs-image-item object-cover rounded-lg absolute -bottom-4 left-1/2 -translate-x-1/2"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Capital Providers Section */}

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
