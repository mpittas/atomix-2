interface WhyCardProps {
  title: string;
  description: string;
}

function WhyCard({ title, description }: WhyCardProps) {
  return (
    <div className="text-white flex flex-col items-start gap-y-7 max-w-sm">
      <div className="text-5xl uppercase">{title}</div>
      <div className="text-lg">{description}</div>
      <a href="#" className="py-2 px-4 border border-white rounded-full">
        See Opportunities
      </a>
    </div>
  );
}

export default function SliderWhyWorkWithUs() {
  return (
    <div className="min-h-[calc(100vh-126px)] rounded-3xl bg-linear-to-b from-[#0B4858] via-[#1e5360] to-[#0B4858] relative overflow-hidden flex flex-col justify-center items-center py-28">
      <div className="max-w-[1440px] mx-auto w-full px-8 mt-14 bg-red-500/40">
        <div className="bg-orange-500/40 w-full flex justify-between w-full">
          <WhyCard
            title="Team"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius lorem eget leo vehicula consectetur."
          />
          <div className="relative">
            <WhyCard
              title="OPPORTUNITIES"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius lorem eget leo vehicula consectetur."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
