import React, { useState, useRef, useEffect } from "react";
import { useGetProductsQuery } from "../services/ApiProduct";
import { Product } from "../types/product";
import { IoMdClose } from "react-icons/io";
import { separateThousands } from "../utils/FormatNumber";

interface MobileSearchProps {
  isSearchFullScreen: boolean;
  toggleSearchFullScreen: () => void;
}

const MobileSearch: React.FC<MobileSearchProps> = ({ isSearchFullScreen, toggleSearchFullScreen }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchResultsRef = useRef<HTMLDivElement>(null);

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery(searchTerm.length > 3 ? { search: searchTerm, sort: "default" } : undefined);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isSearchFullScreen) return null;

  return (
    <div className="fixed h-screen top-0 left-0 right-0 bottom-0 z-50 bg-white flex flex-col p-4">
      <button onClick={toggleSearchFullScreen} className="self-end mb-4 text-gray-500 focus:outline-none">
        <IoMdClose size={24} />
      </button>
      <input
        type="text"
        placeholder="جستجو"
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full bg-[#F6F5F5] px-4 py-2 rounded-xl focus:outline-none focus:border-gray-200 focus:ring-gray-300 transition duration-200 ease-in-out mb-4"
      />
      <div ref={searchResultsRef} className="flex-1 p-2">
        {searchTerm.length > 3 && (
          <div className="bg-white">
            {isLoading ? (
              <p className="text-center">در حال بارگذاری...</p>
            ) : error ? (
              <p className="text-center text-error-400">خطا در دریافت محصولات</p>
            ) : products?.data?.products?.length ? (
              <ul>
                {products.data.products.map((product: Product) => (
                  <li
                    key={product.id}
                    className="flex items-center border-b m-0 border-gray-200 overflow-hidden mb-4 w-full"
                  >
                    <a href={`/product/${product.id}`} className="flex w-full" onClick={() => setSearchTerm("")}>
                      <img src={`${product.image}`} alt={product.name} className="w-16 h-16 object-cover" />
                      <div className="flex-1 p-4 text-right">
                        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{product.name}</h3>
                        <p className="text-gray-600">{separateThousands(product.price)} تومان</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-error-400">محصولی یافت نشد.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSearch;
