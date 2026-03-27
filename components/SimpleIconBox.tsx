import Image from "next/image";

interface SimpleIconBoxProps {
  src: string;
  title: string;
  subtitle: string;
}

export default function SimpleIconBox({
  src,
  title,
  subtitle,
}: SimpleIconBoxProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Image src={src} alt={title} width={48} height={48} />
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold text-white">{title}</div>
        <div className="text-sm text-white/80">{subtitle}</div>
      </div>
    </div>
  );
}
