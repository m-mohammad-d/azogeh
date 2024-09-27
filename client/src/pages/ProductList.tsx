import { useState, useEffect } from "react";
import { useGetProductsQuery } from "../services/ApiProduct";
import Filter from "../components/Filter";
import ProductGrid from "../components/ProductGrids";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";

interface PriceRange {
  min: number;
  max: number;
}

function ProductList() {
  const [availableOnly, setAvailableOnly] = useState<boolean>(true);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 500000 });
  const [brand, setBrand] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const isAvailableParam = searchParams.get("isAvailable");
    const minPriceParam = searchParams.get("minprice");
    const maxPriceParam = searchParams.get("maxprice");
    const brandParam = searchParams.get("brand");
    const categoryParam = searchParams.get("category");
    const pageParam = searchParams.get("page");

    if (isAvailableParam !== null) {
      setAvailableOnly(isAvailableParam === "true");
    }
    if (minPriceParam !== null) {
      setPriceRange(prevRange => ({
        ...prevRange,
        min: Number(minPriceParam),
      }));
    }
    if (maxPriceParam !== null) {
      setPriceRange(prevRange => ({
        ...prevRange,
        max: Number(maxPriceParam),
      }));
    }
    if (brandParam !== null) {
      setBrand(brandParam);
    }
    if (categoryParam !== null) {
      setCategory(categoryParam);
    }
    if (pageParam !== null) {
      setCurrentPage(Number(pageParam));
    }
  }, [searchParams]);

  const { data, error, isLoading } = useGetProductsQuery({
    availableOnly,
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
    brand,
    page: currentPage,
    category,
  });

  function handleSetAvailableOnly() {
    const newAvailableOnly = !availableOnly;
    setAvailableOnly(newAvailableOnly);
    searchParams.set("isAvailable", newAvailableOnly + "");
    setSearchParams(searchParams);
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, category: "min" | "max") => {
    const value = Number(e.target.value);
    setPriceRange(prevRange => ({
      ...prevRange,
      [category]: value,
    }));

    searchParams.set(category === "min" ? "minprice" : "maxprice", value.toString());
    setSearchParams(searchParams);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand = e.target.value;
    setBrand(selectedBrand);
    searchParams.set("brand", selectedBrand);
    setSearchParams(searchParams);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    searchParams.set("category", selectedCategory);
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setAvailableOnly(true);
    setPriceRange({ min: 0, max: 500000 });
    setBrand("all");
    setCategory("all");
    setSearchParams({});
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>خطایی رخ داده است.</div>;

  return (
    <div className="max-w-screen-2xl mx-auto mt-16">
      <div className="flex">
        <Filter
          availableOnly={availableOnly}
          priceRange={priceRange}
          brand={brand}
          category={category}
          handleSetAvailableOnly={handleSetAvailableOnly}
          handlePriceChange={handlePriceChange}
          handleBrandChange={handleBrandChange}
          handleCategoryChange={handleCategoryChange}
          resetFilters={resetFilters}
        />
        <ProductGrid products={data?.data.products} />
      </div>
      <Pagination currentPage={currentPage} totalPages={data?.pagination?.pages || 0} onPageChange={handlePageChange} />
    </div>
  );
}

export default ProductList;
