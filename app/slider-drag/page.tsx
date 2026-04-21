import Header from "@/components/header";
import Footer from "@/components/Footer";
import SliderWhyWorkWithUs from "@/components/SliderWhyWorkWithUs";

export default function SliderDragPage() {
  return (
    <div>
      <Header />

      <div className="mt-24 pt-4 px-12 bg-neutral-200 page-wrapper flex flex-col gap-y-6 pb-6 min-h-[50vh]">
        <SliderWhyWorkWithUs />
      </div>
      <Footer />
    </div>
  );
}
