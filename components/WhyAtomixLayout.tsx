"use client";

import { useState } from "react";
import Image from "next/image";
import IconBoxHorizontal from "./IconBoxHorizontal";
import DefHeading from "./typo/DefHeading";

export default function BenefitsLayout() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = ["Capital Providers", "Lenders", "Borrowers"];

  return (
    <div className="relative w-full">
      <div className="bg-red-500/0 flex flex-col gap-y-8">
        <div className="max-w-[1060px] mx-auto">
          <DefHeading
            theme="light"
            badgeText=""
            showBadge={false}
            title="Why Atomix"
            description="The platform was built to solve specific, structural problems. These are the results"
          />
        </div>

        <div className="flex gap-4 w-full">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveIndex(index)}
              className={`relative flex-1 flex flex-col justify-center gap-4 rounded-xl transition-all duration-500 cursor-pointer p-5 overflow-hidden ${
                index === activeIndex
                  ? "bg-[#eaeff1] text-black"
                  : "bg-[#124652]"
              }`}
              type="button"
            >
              <div className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute -top-8 -right-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
              </div>
              <h3
                className={`text-xl font-semibold text-center relative z-10 ${
                  index === activeIndex ? "text-[#0f1b1e]" : "text-white"
                }`}
              >
                {tab}
              </h3>
            </button>
          ))}
        </div>

        <div className="relative mt-8 md:mt-10">
          {/* Panel 0: Capital Providers */}
          {activeIndex === 0 && (
            <div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="bg-green-500/0">
                  <div className="relative w-full pr-8 pb-8 bg-red-500/0">
                    <div>
                      <Image
                        src="/images/dashboard-cp-main.svg"
                        alt=""
                        width={600}
                        height={400}
                        className="object-contain rounded-lg w-full h-auto"
                      />
                    </div>

                    <div className="absolute bottom-0 right-0 w-50 bg-blue-500/0 min-h-20 flex flex-col gap-2">
                      <Image
                        src="/images/dashboard-cp-1.svg"
                        alt=""
                        width={200}
                        height={100}
                        className="object-contain rounded-lg w-full h-auto"
                      />

                      <Image
                        src="/images/dashboard-cp-2.svg"
                        alt=""
                        width={200}
                        height={100}
                        className="object-contain rounded-lg w-full h-auto"
                      />

                      <Image
                        src="/images/dashboard-cp-3.svg"
                        alt=""
                        width={200}
                        height={100}
                        className="object-contain rounded-lg w-full h-auto"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/0">
                  <h2 className="text-3xl font-bold mb-4 text-white">
                    Capital Providers
                  </h2>
                  <div className="text-lg text-white/80 mb-8">
                    Invest with full transparency, automated compliance, and
                    access to diversified lending opportunities.
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <IconBoxHorizontal src="/icons/white/shield-check-white.svg">
                        <div className="">
                          <span className="font-semibold text-white">
                            Blind trust replaced
                          </span>
                          {" — "}
                          with real-time transparency and verifiable audit
                          trails
                        </div>
                      </IconBoxHorizontal>
                    </div>

                    <div>
                      <IconBoxHorizontal src="/icons/white/shield-check-white.svg">
                        <div className="max-w-[400px]">
                          <span className="font-semibold text-white">
                            Fraud eliminated at source
                          </span>
                          {" — "}
                          by design, not as an afterthought
                        </div>
                      </IconBoxHorizontal>
                    </div>

                    <div>
                      <IconBoxHorizontal src="/icons/white/shield-check-white.svg">
                        <div className="max-w-[400px]">
                          <span className="font-semibold text-white">
                            Due diligence costs slashed
                          </span>
                          {" — "}
                          through automated compliance checks
                        </div>
                      </IconBoxHorizontal>
                    </div>

                    <div>
                      <IconBoxHorizontal src="/icons/white/rocket-simple.svg">
                        <div className="max-w-[400px]">
                          <span className="font-semibold text-white">
                            Liquidity unlocked
                          </span>
                          {" — "}
                          via on-chain asset tokenization
                        </div>
                      </IconBoxHorizontal>
                    </div>

                    <div>
                      <IconBoxHorizontal src="/icons/white/path-arrows.svg">
                        <div className="max-w-[400px]">
                          <span className="font-semibold text-white">
                            Granularity penalty eliminated
                          </span>
                          {" — "}
                          enabling fractional investment
                        </div>
                      </IconBoxHorizontal>
                    </div>

                    <div>
                      <IconBoxHorizontal src="/icons/white/shield-check-white.svg">
                        <div className="max-w-[400px]">
                          <span className="font-semibold text-white">
                            Bolt-on compliance controls replaced by architecture
                          </span>
                          {" — "}
                          every decision is auditable
                        </div>
                      </IconBoxHorizontal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Panel 1: Lenders */}
          {activeIndex === 1 && (
            <div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="bg-green-500/0 order-1">
                  <div className="relative w-full pr-8 pb-8 bg-red-500/0">
                    <div className="relative">
                      <div>
                        <Image
                          src="/images/dashboard-lenders-main.svg"
                          alt=""
                          width={600}
                          height={400}
                          className="object-contain rounded-lg w-full h-auto"
                        />
                      </div>

                      <Image
                        src="/images/dashboard-lenders-small.svg"
                        alt=""
                        width={360}
                        height={200}
                        className="object-cover rounded-lg absolute -bottom-4 left-1/2 -translate-x-1/2"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/0">
                  <h2 className="text-3xl font-bold mb-4 text-white">
                    Lenders
                  </h2>
                  <div className="text-lg text-white/80 mb-8">
                    Automate lending workflows, access capital faster, and scale
                    operations without increasing headcount.
                  </div>
                  <div className="flex flex-col gap-y-6">
                    <div>
                      <IconBoxHorizontal src="/icons/white/shield-check-white.svg">
                        <div className="max-w-[500px]">
                          <span className="font-semibold text-white">
                            Underwriter bottleneck broken
                          </span>
                          {" — "}
                          goal-driven workflow automation processes loans at
                          scale; human touchpoints only where chosen
                        </div>
                      </IconBoxHorizontal>
                    </div>

                    <div>
                      <IconBoxHorizontal src="/icons/white/user-minus.svg">
                        <div className="max-w-[400px]">
                          <span className="font-semibold text-white">
                            Smaller loans profitable
                          </span>
                          {" — "}
                          usage-based fees scale with loan size, no fixed
                          processing floor
                        </div>
                      </IconBoxHorizontal>
                    </div>

                    <div>
                      <IconBoxHorizontal src="/icons/white/scales.svg">
                        <div className="max-w-[500px]">
                          <span className="font-semibold text-white">
                            Capital access opened
                          </span>
                          {" — "}
                          platform compliance and audit infrastructure attracts
                          institutional and private investors directly
                        </div>
                      </IconBoxHorizontal>
                    </div>

                    <div>
                      <IconBoxHorizontal src="/icons/white/module-simple.svg">
                        <div className="max-w-[500px]">
                          <span className="font-semibold text-white">
                            Rule changes in minutes
                          </span>
                          {" — "}
                          no-code configuration means no developer dependency,
                          no delays, no operational risk
                        </div>
                      </IconBoxHorizontal>
                    </div>

                    <div>
                      <IconBoxHorizontal src="/icons/white/rocket-simple.svg">
                        <div className="max-w-[500px]">
                          <span className="font-semibold text-white">
                            Faster completion cuts funding costs directly
                          </span>
                          {" — "}
                          every day removed from the cycle reduces the cost of
                          capital per loan
                        </div>
                      </IconBoxHorizontal>
                    </div>

                    <div>
                      <IconBoxHorizontal src="/icons/white/electricity-simple.svg">
                        <div className="max-w-[500px]">
                          <span className="font-semibold text-white">
                            Earlier automated decisioning reduces abort rates
                          </span>
                          {" — "}
                          costs no longer absorbed across completed loans,
                          improving per-loan economics across the book
                        </div>
                      </IconBoxHorizontal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Panel 2: Borrowers */}
          {activeIndex === 2 && (
            <div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="bg-green-500/0">
                  <div className="relative w-full pr-8 pb-8 bg-red-500/0">
                    <div className="relative">
                      <div>
                        <Image
                          src="/images/dashboard-partner-main.svg"
                          alt=""
                          width={600}
                          height={400}
                          className="object-contain rounded-lg w-full h-auto"
                        />
                      </div>

                      <Image
                        src="/images/dashboard-partner-small.svg"
                        alt=""
                        width={200}
                        height={100}
                        className="object-contain absolute bottom-0 right-0 h-auto"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/0">
                  <h2 className="text-3xl font-bold mb-4 text-white">
                    Borrowers
                  </h2>
                  <div className="text-lg text-white/80 mb-8">
                    Borrowers move from enquiry to drawdown in a structured,
                    transparent journey.
                  </div>
                  <div className="flex flex-col gap-y-6">
                    <div>
                      <IconBoxHorizontal src="/icons/white/electricity-simple.svg">
                        <div className="max-w-[500px]">
                          <span className="font-semibold text-white">
                            One application, every lender
                          </span>
                          {" — "}
                          data entered once, used across the entire journey via
                          unified workspace
                        </div>
                      </IconBoxHorizontal>
                    </div>

                    <div>
                      <IconBoxHorizontal src="/icons/white/rocket-simple.svg">
                        <div className="max-w-[500px]">
                          <span className="font-semibold text-white">
                            Certainty from the start
                          </span>
                          {" — "}
                          instant indicative offer refined automatically as more
                          information is provided
                        </div>
                      </IconBoxHorizontal>
                    </div>

                    <div>
                      <IconBoxHorizontal src="/icons/white/path-arrows.svg">
                        <div className="max-w-[500px]">
                          <span className="font-semibold text-white">
                            Live loan status throughout
                          </span>
                          {" — "}
                          consistent outcomes, no chasing, no dependence on
                          underwriter discretion
                        </div>
                      </IconBoxHorizontal>
                    </div>

                    <div>
                      <IconBoxHorizontal src="/icons/white/module-simple.svg">
                        <div className="max-w-[500px]">
                          <span className="font-semibold text-white">
                            Faster process
                          </span>
                          {" — "}
                          underwriting instant; legal and valuation steps
                          coordinated within the platform, not left to fragment
                        </div>
                      </IconBoxHorizontal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
