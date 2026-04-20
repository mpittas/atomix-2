import React from "react";

interface BadgeHeadingPillProps {
  children: React.ReactNode;
  color?: "dark";
  className?: string;
}

export const BadgeHeadingPill: React.FC<BadgeHeadingPillProps> = ({
  children,
  color = "dark",
  className = "",
}) => {
  const colorStyles = {
    dark: {
      background: "bg-linear-to-r from-[#3C6671] to-[#184A57]",
      textGradient: "from-[#fff] to-[#fff]",
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
