import Header from "@/components/header";
import Footer from "@/components/Footer";
import SliderWhyWorkWithUs from "@/components/SliderWhyWorkWithUs";

export default function SliderDragPage() {
  return (
    <div>
      <Header />

      <div className="mt-24 pt-4 px-12 bg-neutral-200 page-wrapper flex flex-col gap-y-6 pb-6 min-h-[50vh]">
        <div className="min-h-[calc(100vh-126px)] bg-white rounded-3xl p-8 flex flex-col justify-center text-center">
          <div className="text-black text-6xl text-black/70">
            Current status
          </div>

          <div className="text-[16px] mt-4 text-black/60">Scroll down</div>
        </div>

        <SliderWhyWorkWithUs />
      </div>
      <Footer />
    </div>
  );
}
