import React, { useState, useRef, useEffect } from "react";
import { useGetProductsQuery } from "../services/ApiProduct";
import { Product } from "../types/product";
import { Link } from "react-router-dom";

function Search() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchResultsRef = useRef<HTMLDivElement>(null);

  const { data: products, isLoading, error } = useGetProductsQuery(searchTerm.length > 3 ? { search: searchTerm, sort: "default" } : undefined);

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
      <div className="relative mx-auto w-full max-w-4xl">
        <input
          type="text"
          placeholder="جستجو کنید ..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full rounded-lg bg-neutral-gray-1 px-7 py-2 pr-14 text-right text-neutral-gray-6 transition duration-200 ease-in-out focus:border focus:border-neutral-gray-3 focus:outline-none"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400">
          <img src="/icon/Search.svg" alt="جستجو" className="size-7" />
        </span>
      </div>

      {searchTerm.length > 3 && (
        <div ref={searchResultsRef} className="absolute z-10 mx-auto mt-4 w-full max-w-4xl rounded-lg bg-white p-2 shadow-lg">
          {isLoading ? (
            <p className="text-center">در حال بارگذاری...</p>
          ) : error ? (
            <p className="text-status-error text-center">خطا در دریافت محصولات</p>
          ) : products?.data?.products?.length ? (
            <ul>
              {products.data.products.map((product: Product) => (
                <li key={product.id} className="m-0 mb-4 flex w-full items-center overflow-hidden border-b border-gray-200 hover:border-primary">
                  <Link to={`/product/${product.id}`} className="flex w-full" onClick={handleProductClick}>
                    <img src={`${product.image}`} alt={product.name} className="h-16 w-16 object-cover" />
                    <div className="flex-1 p-4 text-right">
                      <h3 className="line-clamp-1 text-lg font-bold text-gray-800">{product.name}</h3>
                      <p className="text-gray-600">{product.price} تومان</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-status-error text-center">محصولی یافت نشد.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
