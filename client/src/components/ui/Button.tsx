import React from "react";
import { cn } from "../../utils/util";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize = "x-small" | "small" | "medium" | "large";
type ButtonShape = 0 | 4 | 8 | 16 | 100;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", size = "medium", shape = 4, children, ...props }) => {
  const baseStyles = "font-bold px-4 py-2 rounded focus:outline-none transition-all duration-300";

  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary-shade1 active:bg-primary-shade2 disabled:bg-neutral-gray-2 disabled:text-neutral-gray-7",
    secondary: "border-2 border-primary hover:border-primary-shade1 active:border-primary-shade2 disabled:border-neutral-gray-4 disabled:text-neutral-gray-7",
    tertiary: "bg-transparent text-primary hover:text-primary-shade1 active:text-primary-shade2 disabled:text-neutral-gray-7",
  };

  const sizeStyles = {
    "x-small": "text-xs px-6 py-1",
    small: "text-md px-8 py-1",
    medium: "text-lg px-10 py-1.5",
    large: "text-xl px-12 py-2.5",
  };

  const shapeStyles = {
    0: "rounded-none",
    4: "rounded-sm",
    8: "rounded-md",
    16: "rounded-lg",
    100: "rounded-full",
  };

  return (
    <button {...props} className={cn(baseStyles, sizeStyles[size], variantStyles[variant], shapeStyles[shape], props.className)}>
      {children}
    </button>
  );
};

export default Button;
