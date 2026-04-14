"use client";

import { useRef } from "react";
import Header from "@/components/header";
import DefCta from "@/components/DefCta";
import Footer from "@/components/Footer";
import Image from "next/image";
import IconBoxHorizontal from "@/components/IconBoxHorizontal";
import IconBox from "@/components/IconBox";
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
  FaLaptopCode,
  FaUsers,
  FaUserGroup,
  FaListCheck,
  FaMagnifyingGlass,
  FaPenToSquare,
  FaShieldHalved,
  FaShareFromSquare,
  FaTriangleExclamation,
  FaMoneyBillTransfer,
  FaFileInvoiceDollar,
  FaDatabase,
  FaGaugeHigh,
  FaRotate,
  FaBinoculars,
  FaSackDollar,
  FaEye,
  FaChartPie,
  FaFileShield,
  FaFileLines,
} from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

export default function CurrentStatusV1Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  const animatePanel = (panel: HTMLElement) => {
    const speed = 4;
    const imageItems = panel.querySelectorAll(".cs-image-item");
    const textItems = panel.querySelectorAll("[data-cs-item]");
    const listItems = panel.querySelectorAll("[data-cs-items] > div");
    const iconBoxes = panel.querySelectorAll(".cs-iconbox-item");

    gsap.killTweensOf([imageItems, textItems, listItems, iconBoxes]);

    gsap.set(imageItems, { autoAlpha: 0, y: 24, scale: 0.96 });
    gsap.set(textItems, { autoAlpha: 0, y: 18 });
    gsap.set(listItems, { autoAlpha: 0, y: 16 });
    gsap.set(iconBoxes, { autoAlpha: 0, y: 40 });

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
      )
      .to(
        iconBoxes,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5 * speed,
          stagger: 0.08 * speed,
          ease: "power3.out",
        },
        `-=${0.3 * speed}`,
      );
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const panels = gsap.utils.toArray<HTMLElement>(
        "[data-cs-panel]",
        containerRef.current,
      );

      const triggers = panels.map((panel) =>
        ScrollTrigger.create({
          trigger: panel,
          start: "top 85%",
          once: true,
          onEnter: () => animatePanel(panel),
        }),
      );

      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef },
  );

  return (
    <div className="overflow-x-hidden" ref={containerRef}>
      <Header />

      <div className="px-12 pt-21 pb-12 mt-2 flex flex-col gap-2">
        <section className="px-18 py-36 rounded-3xl bg-linear-to-b from-[#0B4858] via-[#81A6AF] to-[#0B4858] relative overflow-hidden py-20">
          <div className="mx-auto max-w-[1200px] flex flex-col gap-y-24 px-6">
            <div data-cs-panel>
              <DefHeading
                data-cs-item
                theme="light"
                badgeText="Careers"
                showBadge={false}
                title="Current Status"
                description="Atomix is live and building — two product launches confirmed for 2026: cash home-buyer MVP (Q2) and auction finance MVP (Q3)."
              />
            </div>

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

      {/* Section 1 */}
      <div className="px-12 pt-21 pb-12 mt-2 flex flex-col gap-2">
        <section className="px-18 py-36 rounded-3xl bg-linear-to-b from-[#0B4858] via-[#81A6AF] to-[#0B4858] relative overflow-hidden py-20">
          <div className="mx-auto max-w-[1200px] flex flex-col gap-y-36 px-6">
            <div data-cs-panel className="flex flex-col gap-y-12">
              <div data-cs-item>
                <DefHeading
                  theme="light"
                  badgeText="Section 1"
                  showBadge={false}
                  title="Loan origination"
                  description=""
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaBuilding size={38} />}
                  title="Borrower journey entirely self-served"
                  description="Data entered once, structured workflow from application to drawdown"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaCircleCheck size={38} />}
                  title="Real-time eligibility checking"
                  description="Underwriting rules assessed instantly, pre-approved offer calculated without manual intervention"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaCalculator size={38} />}
                  title="Indicative offer as a min/max range"
                  description="Updates dynamically as information is submitted"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaLink size={38} />}
                  title="Automated third-party data fetch"
                  description="Application pre-populated with verified property and applicant data; discrepancies flagged and routed automatically"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaScaleBalanced size={38} />}
                  title="Conflict resolution by lender rules"
                  description="Where borrower data conflicts with third-party sources, next steps determined and executed by the platform"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaSliders size={38} />}
                  title="No-code rules library"
                  description="Lenders define or select eligibility criteria; changes live immediately, no developer involvement"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaArrowUpRightFromSquare size={38} />}
                  title="Referral flow"
                  description="Platform triggers lender review where required; decisions reflected instantly across all documents and parties"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaFileSignature size={38} />}
                  title="Credit paper available on demand prior to drawdown"
                  description=""
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaCubes size={38} />}
                  title="Fully configurable by stakeholders"
                  description="Branding, lending rules, eligibility criteria and workflows defined without developer involvement"
                />
              </div>
            </div>

            <div data-cs-panel className="flex flex-col gap-y-12">
              <div data-cs-item>
                <DefHeading
                  theme="light"
                  badgeText="Section 1"
                  showBadge={false}
                  title="Lawyer workflow"
                  description=""
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaLaptopCode size={38} />}
                  title="Fully managed on-platform"
                  description="Instructions, checklists, document signing and pre-drawdown conditions coordinated automatically, no manual chasing"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaUsers size={38} />}
                  title="Panel selection"
                  description="Borrower selects from lender-approved panel; external solicitor subject to lender acceptance"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaUserGroup size={38} />}
                  title="Dual or single representation"
                  description="Configured per lender policy; instruction letters issued automatically at journey start"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaListCheck size={38} />}
                  title="Task sequencing"
                  description="Legal opinion, confirmations, undertakings and signing completed in any order; all tracked on-platform"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaMagnifyingGlass size={38} />}
                  title="Information verification"
                  description="Solicitor verifies or supplements borrower data; multiple verification methods assignable per data point including automated checks"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaGavel size={38} />}
                  title="Conflict resolution"
                  description="Discrepancies flagged; lender rules determine next step; all changes logged and visible to lender"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaPenToSquare size={38} />}
                  title="Borrower modifications"
                  description="Amended answers post-verification routed to borrower or solicitor for re-verification per lender rules"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaFileSignature size={38} />}
                  title="Document execution"
                  description="All documents signed via DocuSign; witnesses assigned within the platform; signatures time-stamped, recorded and auditable, no printing required"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaShieldHalved size={38} />}
                  title="Insurance and title requirements governed by the platform"
                  description="Unnecessary searches minimised, due diligence time reduced"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaShareFromSquare size={38} />}
                  title="Lender referral"
                  description="Lender approves, adjusts or rejects flagged cases; documents regenerated automatically, solicitor notified to reissue"
                />
              </div>
            </div>

            <div data-cs-panel className="flex flex-col gap-y-12">
              <div data-cs-item>
                <DefHeading
                  theme="light"
                  badgeText="Section 1"
                  showBadge={false}
                  title="Loan management"
                  description=""
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaTriangleExclamation size={38} />}
                  title="Breach and default detection automated"
                  description="Missed payments flagged instantly, all stakeholders notified in real time"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaMoneyBillTransfer size={38} />}
                  title="Payment distributions defined once by lender and executed automatically"
                  description="Capital providers see exactly what they are owed, when calculated and when paid"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaFileInvoiceDollar size={38} />}
                  title="Borrower self-serve redemption quotes"
                  description="Full breakdown of principal, interest and charges, configurable to lender terms"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaDatabase size={38} />}
                  title="Full blockchain record"
                  description="Every payment, charge, distribution and action immutably recorded and independently verifiable from drawdown to closure"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaGaugeHigh size={38} />}
                  title="Borrower dashboard"
                  description="Balance, next payment, end date and upcoming charges visible in real time"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaRotate size={38} />}
                  title="Loan extensions, renewals and partial repayments"
                  description="Handled automatically or referred to lender per lender rules"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaBinoculars size={38} />}
                  title="Lender loan book oversight"
                  description="Borrower activity, payment histories, milestones and documentation in a single dashboard"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaGavel size={38} />}
                  title="Default and enforcement"
                  description="Lender reports breaches, places loans into default and refers to insolvency practitioner, insurer or solicitor within the platform"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaSackDollar size={38} />}
                  title="Capital provider management"
                  description="Investor allocations managed on-platform; distributions calculated and executed automatically"
                />
              </div>
            </div>

            <div data-cs-panel className="flex flex-col gap-y-12">
              <div data-cs-item>
                <DefHeading
                  theme="light"
                  badgeText="Section 1"
                  showBadge={false}
                  title="Capital provider dashboards"
                  description=""
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaEye size={38} />}
                  title="Real-time visibility across all funded loans"
                  description="Every activity on blockchain, accessible to private and institutional investors"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaChartPie size={38} />}
                  title="Dedicated dashboard"
                  description="Investments, performance metrics, interest earned and maturity dates in a single view"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaFileShield size={38} />}
                  title="Automated policy enforcement"
                  description="Capital provider criteria enforced continuously by the platform, no manual monitoring required"
                />
                <IconBox
                  className="cs-iconbox-item"
                  icon={<FaFileLines size={38} />}
                  title="Customised reporting"
                  description="Portfolio-level analysis with per-loan blockchain token reference for independent verification"
                />
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
