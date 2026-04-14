"use client";

import Header from "@/components/header";
import DefCta from "@/components/DefCta";
import Footer from "@/components/Footer";

export default function CurrentStatusV1Page() {
  return (
    <div className="overflow-x-hidden">
      <Header />

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
