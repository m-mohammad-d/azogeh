import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

interface LocationSelectorProps {
  options: { id: number; name: string }[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  disabled?: boolean;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder,
  disabled,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  console.log(disabled);

  const filteredOptions = options.filter(option => option.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setSearchQuery("");
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.id.toString() === value);
  const displayValue = selectedOption ? selectedOption.name : "";

  return (
    <div className="relative">
      <div
        className={`border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none`}
        onClick={() => !disabled && setIsOpen(true)}
      >
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          type="text"
          value={displayValue}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          className={`w-full p-2 border-none focus:ring-0`}
        />
      </div>

      {isOpen && !disabled && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-12 shadow-lg relative mx-4">
            <button className="absolute top-2 right-2 text-gray-500" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>

            <h3 className="text-xl font-bold mb-4">انتخاب {label}</h3>

            <div className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="جستجو..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <FaSearch className="absolute top-3 left-3 text-gray-500" />
            </div>

            <div className="max-h-72 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map(option => (
                  <div
                    key={option.id}
                    className="cursor-pointer px-4 py-2 hover:bg-primary-100"
                    onClick={() => handleSelect(option.id.toString())}
                  >
                    {option.name}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">هیچ گزینه‌ای یافت نشد</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
