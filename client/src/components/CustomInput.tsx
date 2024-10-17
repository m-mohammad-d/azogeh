import React from "react";

interface CustomInputProps {
  type: string;
  name?: string;
  placeholder: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  placeholder,
  className = "",
  value,
  name,
  onChange,
  label,
}) => {
  return (
    <div className={`relative mb-4 ${className}`}>
      <div className="bg-white p-4 rounded-lg">
        <div className="relative bg-inherit">
          <input
            type={type}
            name={name}
            className="peer bg-transparent h-10 w-full rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          <label className="absolute cursor-text right-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">
            {label}
          </label>
        </div>
      </div>
    </div>
  );
};

export default CustomInput;
