import Image from "next/image";

interface IconBoxProps {
  src?: string;
  width?: number;
  title?: string;
  titleClassName?: string;
}

export default function IconBox({
  src = "/icons/gradient/arrows-gradient.svg",
  width = 48,
  title = "Lenders deal with 100+ manual touchpoints per loan",
  titleClassName = "",
}: IconBoxProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-8 rounded-2xl text-center h-full border border-dashed bg-[#565e98] border-[#999fc7]">
      <Image src={src} alt={title} width={width} height={width} />
      <div className={`text-md text-white ${titleClassName}`}>{title}</div>
    </div>
  );
}
