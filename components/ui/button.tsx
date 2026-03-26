import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  variant?: "primary";
  gradient?: boolean | string;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = "medium",
      variant = "primary",
      gradient = true,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      small: "px-4 py-2 text-sm",
      medium: "px-5 py-2.5 text-base",
      large: "px-8 py-4 text-lg",
    };

    const getBackgroundClass = () => {
      if (gradient === false) {
        return "bg-blue-600 hover:bg-blue-700";
      }

      if (typeof gradient === "string") {
        return gradient;
      }

      return "bg-gradient-to-r from-[#1C4FF5] to-[#2A85FA] hover:from-blue-700 hover:to-purple-700";
    };

    const baseClasses =
      "font-semibold text-white rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95";

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${sizeClasses[size]} ${getBackgroundClass()} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
