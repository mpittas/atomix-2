import IconBox from "@/components/IconBox";
import { BadgeHeadingPill } from "@/components/ui/BadgeHeadingPill";
import { Button as DefButton } from "@/components/ui";

export default function MissionVisionV2() {
  return (
    <div className="min-h-[calc(100vh-126px)] rounded-3xl bg-linear-to-b from-[#0B4858] via-[#1e5360] to-[#0B4858] relative overflow-hidden flex flex-col justify-center items-center">
      <div className="relative w-full max-w-[860px] px-4">
        <div className="flex flex-col items-center gap-6 w-full">
          <div>
            <IconBox
              icon={<BadgeHeadingPill color="dark">Mission</BadgeHeadingPill>}
              description=""
              title="Rebuild UK property lending. Start with bridging. Extend into SME CRE term loans — same infrastructure, no rebuild."
              titleClassName="!text-2xl"
            />
          </div>
          <div>
            <IconBox
              icon={<BadgeHeadingPill color="dark">Vision</BadgeHeadingPill>}
              description=""
              title="Interconnected marketplaces — borrowers, lenders, capital providers and investors, each connected within a single ecosystem. Distribution partners deploy their own discrete, white-labelled environments within the same infrastructure. Property lending reimagined — starting in the UK, built for global scale."
              titleClassName="!text-2xl"
            />
          </div>
          <div className="mt-2">
            <DefButton>Learn more</DefButton>
          </div>
        </div>
      </div>
    </div>
  );
}
