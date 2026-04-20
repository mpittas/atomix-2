import { Button as DefButton } from "@/components/ui";

function MissionVisionBlock({
  title,
  description,
  buttonText,
  buttonLink,
}: {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white flex flex-col items-start gap-y-8 w-xl">
      <h2 className="text-[80px] font-normal font-bold uppercase leading-[1.05em]">
        Our <br />
        {title}
      </h2>
      <div className="w-full h-[1px] bg-white/16"></div>
      <div className="text-xl">{description}</div>
      <DefButton size="small" href={buttonLink}>
        {buttonText}
      </DefButton>
    </div>
  );
}

export default function MissionVisionV1() {
  return (
    <div className="min-h-[calc(100vh-126px)] rounded-3xl bg-linear-to-b from-[#0B4858] via-[#1e5360] to-[#0B4858] relative overflow-hidden flex flex-col justify-center items-center">
      <div className="relative">
        <MissionVisionBlock
          title="Mission"
          description="Rebuild UK property lending. Start with bridging. Extend into SME CRE term loans — same infrastructure, no rebuild."
          buttonText="Learn More"
          buttonLink="#"
        />

        <MissionVisionBlock
          title="Vision"
          description="Rebuild UK property lending. Start with bridging. Extend into SME CRE term loans — same infrastructure, no rebuild."
          buttonText="Learn More"
          buttonLink="#"
        />
      </div>
    </div>
  );
}
