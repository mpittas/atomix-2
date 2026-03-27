import IconBox from "./IconBox";

export default function FlowGraphicLight() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-3 rounded-full px-3 py-1.5 bg-[#FDF1F1] border border-dashed border-[#D5726F] text-[#474D5D]">
        Market Problems
      </div>

      <div className="flex gap-4 w-full items-stretch">
        <div className="flex-1">
          <IconBox
            src="/icons/gradient/eye-gradient.svg"
            title="Capital providers must trust lenders to follow
lending rules with no real-time visibility"
          />
        </div>

        <div className="flex-1">
          <IconBox
            src="/icons/gradient/arrows-gradient.svg"
            title="Lenders deal with 100+ manual touchpoints
per loan"
          />
        </div>

        <div className="flex-1">
          <IconBox
            src="/icons/gradient/clock-gradient.svg"
            title="Borrowers face an opaque slow process"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <img
          src="/global/arrows-connecting.svg"
          alt="Connecting arrows"
          className="w-full max-w-[760px] select-none"
        />
      </div>

      <div className="flex gap-4 w-full items-stretch">
        <div className="flex-1">
          <IconBox
            src="/icons/gradient/eye-open-gradient.svg"
            title="Enforced lending rules with real-time visibility for capital providers"
            variant="blue"
            titleClassName="font-semibold text-[#212329]"
          />
        </div>

        <div className="flex-1">
          <IconBox
            src="/icons/gradient/electricity-a-gradient.svg"
            title="Near-zero manual touch-points for lenders"
            variant="blue"
            titleClassName="font-semibold text-[#212329]"
          />
        </div>

        <div className="flex-1">
          <IconBox
            src="/icons/gradient/rocket-launch-gradient.svg"
            title="Transparent, fast lending for borrowers"
            variant="blue"
            titleClassName="font-semibold text-[#212329]"
          />
        </div>
      </div>

      <div className="mt-3 rounded-full px-3 py-1.5 bg-[#FFF] border border-dashed border-[#7495DA] text-[#474D5D]">
        The Atomix Solution
      </div>
    </div>
  );
}
