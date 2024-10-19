import React, { useState, useRef, useEffect } from "react";
import { useGetProductsQuery } from "../services/ApiProduct";
import { Product } from "../types/product";
import { Link } from "react-router-dom";

function Search() {
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

  const handleProductClick = () => {
    setSearchTerm(""); // Reset search term to close results
  };

  // Close search results if clicking outside the search result box
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
        setSearchTerm("");
      }
    };

    if (searchTerm.length > 3) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchTerm]);

  return (
    <div className="relative w-full max-w-4xl">
      <div className="relative w-full max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="جستجو"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full bg-[#F6F5F5] px-7 py-2 pr-12 text-right border rounded-xl focus:outline-none focus:border-gray-200 focus:ring-gray-300 transition duration-200 ease-in-out"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <img src="/public/icon/search.svg" alt="جستجو" />
        </span>
      </div>

      {searchTerm.length > 3 && (
        <div
          ref={searchResultsRef}
          className="absolute w-full max-w-4xl mx-auto mt-4 p-2 z-10 bg-white rounded-lg shadow-lg"
        >
          {isLoading ? (
            <p className="text-center">در حال بارگذاری...</p>
          ) : error ? (
            <p className="text-center text-error-400">خطا در دریافت محصولات</p>
          ) : products?.data?.products?.length ? (
            <ul>
              {products.data.products.map((product: Product) => (
                <li key={product.id} className="flex items-center border-b m-0 border-gray-200 overflow-hidden mb-4 w-full">
                  <Link to={`/product/${product.id}`} className="flex w-full" onClick={handleProductClick}>
                    <img src={`images/${product.image}`} alt={product.name} className="w-16 h-16 object-cover" />
                    <div className="flex-1 p-4 text-right">
                      <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{product.name}</h3>
                      <p className="text-gray-600">{product.price} تومان</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-error-400">محصولی یافت نشد.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
