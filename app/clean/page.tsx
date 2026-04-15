"use client";

import Header from "@/components/header";
import DefCta from "@/components/DefCta";
import Footer from "@/components/Footer";
import AtomixHero from "@/ui/AtomixHero";
import AtomixMarketProblems from "@/components/ui/AtomixMarketProblems";
import AtomixTechLimitations from "@/ui/AtomixTechLimitations";

export default function CleanPage() {
  return (
    <>
      <Header />
      <div className="pt-23">
        <div className="p-8 bg-red-200 min-h-[500px]">
          <h1 className="text-4xl font-bold">Clean</h1>
        </div>

        <div
          className="p-4 h-[calc(100vh-92px)] bg-orange-200"
          id="atomix-hero"
        >
          <AtomixHero />
        </div>

        <div className="px-4 pb-4 flex flex-col gap-y-4">
          <div className="px-18 py-36 rounded-3xl bg-linear-to-b from-[#0B4858] via-[#81A6AF] to-[#0B4858] relative overflow-hidden">
            <div className="max-w-[1160px] mx-auto">
              <AtomixMarketProblems />
            </div>
          </div>

          <div className="px-18 py-36 rounded-3xl bg-linear-to-b from-[#0B4858] via-[#81A6AF] to-[#0B4858] relative overflow-hidden">
            <div className="max-w-[1160px] mx-auto">
              <AtomixTechLimitations />
            </div>
          </div>
        </div>

        <DefCta title="Get Started" />
      </div>
      <Footer />
    </>
  );
}
