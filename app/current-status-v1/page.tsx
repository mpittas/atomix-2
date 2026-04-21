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
        <CurrentStatusV1 />
      </div>
      <Footer />
    </div>
  );
}
