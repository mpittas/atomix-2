import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  variant?: "primary";
  gradient?: boolean | string;
  children: React.ReactNode;
  href?: string;
}

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      size = "medium",
      variant = "primary",
      gradient = true,
      className = "",
      children,
      href,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      small: "px-4 py-2 text-sm",
      medium: "px-6 py-3 text-base",
      large: "px-8 py-4 text-lg",
    };

    const getBackgroundClass = () => {
      if (gradient === false) {
        return "bg-blue-600 hover:bg-blue-700";
      }

      if (typeof gradient === "string") {
        return gradient;
      }

      return "bg-gradient-to-r from-[#19A1C6] to-[#2BB9DF]";
    };

    const baseClasses =
      "font-semibold text-white rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 cursor-pointer";

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={`${baseClasses} ${sizeClasses[size]} ${getBackgroundClass()} ${className}`}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
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
