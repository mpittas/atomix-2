import Image from "next/image";

export default function MissionVisionV3() {
  return (
    <div className="min-h-[calc(100vh-126px)] rounded-3xl bg-linear-to-b from-[#0B4858] via-[#1e5360] to-[#0B4858] relative overflow-hidden flex items-center justify-center">
      <div className="max-w-[1240px] h-full mx-auto text-white flex w-full py-24 bg-orange-500/0 overflow-hidden">
        {/* Mission - top left */}
        <div className="relative w-full flex justify-start px-12">
          <div className="max-w-md flex flex-col gap-y-6 bg-red-500/0">
            <h3 className="text-4xl font-medium uppercase">Mission</h3>
            <p className="text-base leading-relaxed">
              Rebuild UK property lending. Start with bridging. Extend into SME
              CRE term loans — same infrastructure, no rebuild.
            </p>
            <div className="flex justify-start pt-12">
              <Image
                src="/icons/white/eye-open-white.svg"
                alt="Mission eye icon"
                width={84}
                height={84}
                className="w-24 h-24"
              />
            </div>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="881"
            height="688"
            fill="none"
            className="absolute left-0 -top-[50%] select-none pointer-events-none"
          >
            <path
              fill="url(#a)"
              fillOpacity=".5"
              d="M844.871 130.431c47.055 27.092 47.055 94.993 0 122.085l-739.29 425.643C58.624 705.195 0 671.301 0 617.117V-234.17c0-54.184 58.624-88.078 105.581-61.042z"
            />
            <defs>
              <linearGradient
                id="a"
                x1="79.241"
                x2="224.001"
                y1="704.07"
                y2="209.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#fff" />
                <stop offset="1" stop-color="#fff" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Vision - bottom right */}
        <div className="relative w-full flex justify-end">
          <div className="max-w-md flex flex-col gap-y-6 bg-red-500/0 pt-32">
            <div className="flex justify-end pb-12">
              <Image
                src="/icons/white/target-icon-white.svg"
                alt="Vision target icon"
                width={84}
                height={84}
                className="w-24 h-24"
              />
            </div>

            <h3 className="text-4xl font-medium uppercase">Vision</h3>

            <p className="text-base leading-relaxed">
              Rebuild UK property lending. Start with bridging. Extend into SME
              CRE term loans — same infrastructure, no rebuild.
            </p>
          </div>

          <svg
            width="880"
            height="758"
            viewBox="0 0 880 758"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute ritht-0 -top-[21%] select-none pointer-events-none"
          >
            <path
              d="M773.407 9.5849C820.398 -17.6204 879.201 16.3296 879.135 70.627L878.109 923.692C878.043 977.876 819.379 1011.7 772.454 984.607L35.2184 558.964C-11.7067 531.872 -11.7476 464.155 35.1448 437.006L773.407 9.5849Z"
              fill="url(#paint0_linear_7_2)"
              fill-opacity="0.3"
            />
            <defs>
              <linearGradient
                id="paint0_linear_7_2"
                x1="879.283"
                y1="-51.7124"
                x2="747.409"
                y2="554.972"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" />
                <stop offset="1" stop-color="white" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
