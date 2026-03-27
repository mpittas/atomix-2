import IconBox from "./IconBox";

export default function FlowGraphicLight() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-3 rounded-full px-3 py-1.5 border border-dashed border-[#b3b9ec] text-white bg-linear-to-r from-[#565E98] to-[#646BA0]">
        Market Problems
      </div>

      <div className="flex gap-4 w-full items-stretch">
        <div className="flex-1">
          <IconBox
            src="/icons/white/eye-closed-white.svg"
            title="Capital providers must trust lenders to follow
lending rules with no real-time visibility"
          />
        </div>

        <div className="flex-1">
          <IconBox
            src="/icons/white/arrows-white.svg"
            title="Lenders deal with 100+ manual touchpoints
per loan"
          />
        </div>

        <div className="flex-1">
          <IconBox
            src="/icons/white/clock-white.svg"
            title="Borrowers face an opaque slow process"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <img
          src="/global/arrows-connecting-light.svg"
          alt="Connecting arrows"
          className="w-full max-w-[760px] select-none"
        />
      </div>

      <div className="flex gap-4 w-full items-stretch">
        <div className="flex-1">
          <IconBox
            src="/icons/white/eye-white.svg"
            title="Enforced lending rules with real-time visibility for capital providers"
          />
        </div>

        <div className="flex-1">
          <IconBox
            src="/icons/white/electricity-a-white.svg"
            title="Near-zero manual touch-points for lenders"
          />
        </div>

        <div className="flex-1">
          <IconBox
            src="/icons/white/rocket-launch-white.svg"
            title="Transparent, fast lending for borrowers"
          />
        </div>
      </div>

      <div className="mt-3 rounded-full px-3 py-1.5 border border-dashed border-[#b3b9ec] text-white bg-linear-to-r from-[#565E98] to-[#646BA0]">
        The Atomix Solution
      </div>
    </div>
  );
}
