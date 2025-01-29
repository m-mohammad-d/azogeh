import React, { ForwardedRef, forwardRef, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { cn } from "../utils/util";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  size?: 32 | 40 | 48 | 56;
  fullWidth?: boolean;
  label?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ errorMessage, label, fullWidth = false, size = 40, type = "text", className, ...props }, ref: ForwardedRef<HTMLInputElement>) => {
  const [showPassword, setShowPassword] = useState(false);

  const baseStyles = "relative w-full mt-2 bg-transparent border border-neutral-gray-3 rounded-md focus:border-primary transition duration-300 outline-none focus:outline-none";

  const stateStyles = {
    disabled: "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed",
    error: "border-status-error border-2 text-red-500",
  };

  const sizeStyles = {
    32: "text-sm py-2 px-3",
    40: "text-base py-2 px-4",
    48: "text-lg py-3 px-5",
    56: "text-xl py-3 px-6",
  };

  return (
    <div className={cn("mt-4 w-full min-w-[200px]", fullWidth ? "max-w-full" : "w-full")}>
      <div className="relative">
        {label && <label className="text-neutral-gray-8">{label}</label>}
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={cn(baseStyles, errorMessage && stateStyles.error, props.disabled && stateStyles.disabled, sizeStyles[size], className)}
          {...props}
          ref={ref}
        />

        {type === "password" && (
          <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute left-2 top-[3.3rem] -translate-y-1/2 transform text-gray-500">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>

      {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
});

export default Input;
