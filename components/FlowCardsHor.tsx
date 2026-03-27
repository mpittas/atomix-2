import IconBox from "./IconBox";
import Image from "next/image";

export default function FlowCardsHor() {
  return (
    <div className="w-full flex items-center justify-center gap-1 px-8">
      <div className="w-56">
        <IconBox
          src="/icons/white/shield-check-white.svg"
          width={48}
          title="Solution"
        />
      </div>

      <Image
        src="/icons/dashed-arrow-light.svg"
        alt="arrow"
        width={20}
        height={20}
        className="flex-shrink-0"
      />

      <div className="w-64">
        <IconBox
          src="/icons/white/module-electricity-white.svg"
          width={48}
          title="Collaborative, trusted, end-to-end automation"
        />
      </div>

      <Image
        src="/icons/dashed-arrow-light.svg"
        alt="arrow"
        width={20}
        height={20}
        className="flex-shrink-0"
      />

      <div className="w-64">
        <IconBox
          src="/icons/white/stop-icon-white.svg"
          width={48}
          title="Existing technology does not deliver this"
        />
      </div>

      <Image
        src="/icons/dashed-arrow-light.svg"
        alt="arrow"
        width={20}
        height={20}
        className="flex-shrink-0"
      />

      <div className="w-56">
        <IconBox
          src="/icons/white/atomix-icon.svg"
          width={48}
          title="Atomix does!"
          titleClassName="font-semibold"
        />
      </div>
    </div>
  );
}
