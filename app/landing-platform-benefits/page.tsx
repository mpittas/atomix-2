"use client";

import SoftAurora from "@/components/backgrounds/SoftAurora";
import ScrollableTabsBenefits from "@/components/ScrollableTabsBenefits";

export default function PlatformBenefitsPage() {
  return (
    <div className="px-12 mt-2 flex flex-col gap-2">
      <div className="h-screen">
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
                  <ScrollableTabsBenefits />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
