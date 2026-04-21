import Header from "@/components/header";
import Footer from "@/components/Footer";
import MissionVisionV1 from "@/components/mission-vision/MissionVisionV1";
import MissionVisionV2 from "@/components/mission-vision/MissionVisionV2";
import MissionVisionV3 from "@/components/mission-vision/MissionVisionV3";

export default function MissionVisionSections() {
  return (
    <div className="html-wrap  relative">
      <div className="fixed inset-0 w-[1240px] left-1/2 -translate-x-1/2 border-l border-r border-dashed border-gray-950/30 z-[9999] pointer-events-none"></div>
      <Header />
      <div className="mt-24 pt-4 px-12 bg-red-500/20 page-wrapper flex flex-col gap-y-12">
        <div className="min-h-[calc(100vh-126px)] bg-white rounded-3xl p-8 flex flex-col justify-center text-center ">
          <div className="text-black text-6xl text-black/70">Scroll down</div>

          <div className="text-[16px] mt-4 text-black/60">
            Page is Work In Progress 🚧
          </div>
        </div>

        <MissionVisionV1 />

        <MissionVisionV2 />

        <MissionVisionV3 />
      </div>
      <Footer />
    </div>
  );
}
