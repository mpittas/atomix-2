import React from "react";
import Image from "next/image";

interface InfoRowProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  reverse?: boolean;
  children?: React.ReactNode;
}

export default function InfoRow({
  imageSrc = "/images/dashboard-capital-providers.svg",
  imageAlt = "Shield check icon",
  title = "Capital Providers",
  subtitle,
  reverse = false,
  children,
}: InfoRowProps) {
  return (
    <div
      className={`w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${reverse ? "md:flex-row-reverse" : ""}`}
    >
      <div className={`${reverse ? "md:order-2" : "md:order-1"} bg-red-500/0`}>
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain rounded-lg"
          />
        </div>
      </div>

      <div
        className={`${reverse ? "md:order-1" : "md:order-2"} bg-green-500/0`}
      >
        <h2 className="text-3xl font-bold mb-4 text-white">{title}</h2>
        {subtitle && <p className="text-lg text-white/85 mb-9">{subtitle}</p>}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
}
