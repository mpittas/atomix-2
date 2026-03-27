import Image from "next/image";

interface IconBoxProps {
  src?: string;
  width?: number;
  title?: string;
  titleClassName?: string;
  variant?: "orange" | "blue";
}

export default function IconBox({
  src = "/icons/gradient/arrows-gradient.svg",
  width = 48,
  title = "Lenders deal with 100+ manual touchpoints per loan",
  titleClassName = "",
  variant = "orange",
}: IconBoxProps) {
  const variantStyles = {
    orange: {
      background: "linear-gradient(to bottom, #FDF1F1, #FFFFFF)",
      borderColor: "#D5726F",
    },
    blue: {
      background: "linear-gradient(to bottom, #F5F7FF, #FFFFFF)",
      borderColor: "#6B8FDE",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className="flex flex-col items-center gap-4 p-8 rounded-2xl text-center h-full border border-dashed"
      style={{
        background: styles.background,
        borderColor: styles.borderColor,
      }}
    >
      <Image src={src} alt={title} width={width} height={width} />
      <div className={`text-md text-[#474D5D] ${titleClassName}`}>{title}</div>
    </div>
  );
}
