import React from "react";

interface BadgeHeadingPillProps {
  children: React.ReactNode;
  color?: "blue" | "red";
  className?: string;
}

export const BadgeHeadingPill: React.FC<BadgeHeadingPillProps> = ({
  children,
  color = "blue",
  className = "",
}) => {
  const colorStyles = {
    blue: {
      background: "bg-[#eaeff1]",
      textGradient: "from-[#1ba4c9] to-[#1991af]",
    },
    red: {
      background: "bg-[#FEEAE9]",
      textGradient: "from-[#EF2D2A] to-[#F08739]",
    },
  };

  const styles = colorStyles[color];

  return (
    <span
      className={`inline-block px-4 py-2 rounded-full ${styles.background} ${className}`}
    >
      <span
        className={`bg-gradient-to-r ${styles.textGradient} bg-clip-text text-transparent font-medium`}
      >
        {children}
      </span>
    </span>
  );
};
