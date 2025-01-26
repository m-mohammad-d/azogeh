import React, { useState, useRef, useEffect } from "react";
import { useGetProductsQuery } from "../services/ApiProduct";
import { Product } from "../types/product";
import { IoMdClose } from "react-icons/io";
import { separateThousands } from "../utils/FormatNumber";
import { IoCloseCircleOutline } from "react-icons/io5";

interface MobileSearchProps {
  isSearchFullScreen: boolean;
  toggleSearchFullScreen: () => void;
}

const MobileSearch: React.FC<MobileSearchProps> = ({ isSearchFullScreen, toggleSearchFullScreen }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchResultsRef = useRef<HTMLDivElement>(null);

  const { data: products, isLoading, error } = useGetProductsQuery(searchTerm.length > 3 ? { search: searchTerm, sort: "default" } : undefined);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  function resetInput(): void {
    setSearchTerm("");
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
        resetInput();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isSearchFullScreen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-screen flex-col bg-white p-4">
      <button onClick={toggleSearchFullScreen} className="mb-4 self-end text-gray-500 focus:outline-none">
        <IoMdClose size={24} />
      </button>
      <div className="relative mx-auto w-full max-w-xl 2xl:max-w-4xl">
        <input
          type="text"
          placeholder="جستجو کنید ..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full rounded-md bg-neutral-gray-2 px-7 py-3 pr-14 text-right text-neutral-gray-8 transition duration-200 ease-in-out placeholder:text-neutral-gray-7 focus:outline-none"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400">
          {searchTerm.length === 0 ? (
            <img src="/icon/Search.svg" alt="جستجو" className="size-7" />
          ) : (
            <button onClick={resetInput}>
              <IoCloseCircleOutline size={25} className="text-neutral-gray-8" />
            </button>
          )}
        </span>
      </div>
      <div ref={searchResultsRef} className="flex-1 p-2">
        {searchTerm.length > 3 && (
          <div className="bg-white">
            {isLoading ? (
              <p className="text-center">در حال بارگذاری...</p>
            ) : error ? (
              <p className="text-error-400 text-center">خطا در دریافت محصولات</p>
            ) : products?.data?.products?.length ? (
              <ul>
                {products.data.products.map((product: Product) => (
                  <li key={product.id} className="m-0 mb-4 flex w-full items-center overflow-hidden border-b border-gray-200">
                    <a href={`/product/${product.id}`} className="flex w-full" onClick={() => setSearchTerm("")}>
                      <img src={`${product.image}`} alt={product.name} className="h-16 w-16 object-cover" />
                      <div className="flex-1 p-4 text-right">
                        <h3 className="line-clamp-1 text-lg font-bold text-gray-800">{product.name}</h3>
                        <p className="text-gray-600">{separateThousands(product.price)} تومان</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-error-400 text-center">محصولی یافت نشد.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSearch;
