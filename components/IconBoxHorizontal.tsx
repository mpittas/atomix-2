import React from "react";
import Image from "next/image";

interface IconBoxHorizontalProps {
  src: string;
  title?: string;
  children?: React.ReactNode;
}

export default function IconBoxHorizontal({
  src = "/icons/white/shield-check-white.svg",
  title = "<u>Default</u> Title",
  children,
}: IconBoxHorizontalProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="relative w-8 h-8 top-1a">
          <Image
            src={src}
            alt={title || "Icon"}
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex-1">
        {children ? (
          <div className="text-lg font-normal text-white/85">{children}</div>
        ) : title ? (
          <div
            className="text-lg font-normal text-white"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        ) : null}
      </div>
    </div>
  );
}
