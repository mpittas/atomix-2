"use client";

import Header from "@/components/header";
import Footer from "@/components/Footer";
import CurrentStatusV1 from "@/components/current-status/CurrentStatusV1";
import DefHeading from "@/components/typo/DefHeading";

export default function CurrentStatusV1Page() {
  return (
    <div className="overflow-x-hidden">
      <Header />

      <div className="mt-24 pt-4 px-12 bg-neutral-200 page-wrapper flex flex-col gap-y-12 min-h-[50vh]">
        <div className="min-h-[calc(100vh-126px)] bg-white rounded-3xl p-8 flex flex-col justify-center text-center ">
          <div className="text-black text-6xl text-black/70">
            Current status
          </div>

          <div className="text-[16px] mt-4 text-black/60">Scroll down</div>
        </div>

        <CurrentStatusV1 />
      </div>
      <Footer />
    </div>
  );
}
