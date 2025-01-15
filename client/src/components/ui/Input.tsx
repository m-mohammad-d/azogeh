import React, { useState } from "react";
import { cn } from "../../utils/util";
import { FaEyeSlash, FaEye } from "react-icons/fa";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  size?: 32 | 40 | 48 | 56;
}

const Input: React.FC<InputProps> = ({ errorMessage, size = 40, type = "text", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const baseStyles = "w-full bg-transparent border border-neutral-gray-3 rounded-md focus:border-primary transition duration-300 outline-none focus:outline-none";

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
    <div className="w-full min-w-[200px] max-w-sm">
      <div className="relative">
        <input
          {...props}
          type={type === "password" && showPassword ? "text" : type}
          className={cn(baseStyles, errorMessage && stateStyles.error, props.disabled && stateStyles.disabled, sizeStyles[size], props.className)}
        />

        {type === "password" && (
          <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-500">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>

      {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default Input;
