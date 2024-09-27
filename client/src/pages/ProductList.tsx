import { useState, useEffect } from "react";
import { useGetProductsQuery } from "../services/ApiProduct";
import Filter from "../components/Filter";
import ProductGrid from "../components/ProductGrids";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Sorting from "../components/Sorting";

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
  const [selectedSort, setSelectedSort] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false); // اضافه شدن حالت فیلتر

  useEffect(() => {
    const isAvailableParam = searchParams.get("isAvailable");
    const minPriceParam = searchParams.get("minprice");
    const maxPriceParam = searchParams.get("maxprice");
    const brandParam = searchParams.get("brand");
    const categoryParam = searchParams.get("category");
    const pageParam = searchParams.get("page");
    const sortParam = searchParams.get("sort");

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
    if (sortParam !== null) {
      setSelectedSort(sortParam);
    }
  }, [searchParams]);

  const { data, error, isLoading } = useGetProductsQuery({
    availableOnly,
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
    brand,
    page: currentPage,
    category,
    sort: selectedSort,
  });

  const handleSetAvailableOnly = () => {
    const newAvailableOnly = !availableOnly;
    setAvailableOnly(newAvailableOnly);
    searchParams.set("isAvailable", newAvailableOnly + "");
    setSearchParams(searchParams);
  };

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
    setSelectedSort("");
    setSearchParams({});
  };

  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
    searchParams.set("sort", sortOption);
    setSearchParams(searchParams);
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>خطایی رخ داده است. لطفا دوباره تلاش کنید.</div>;

  return (
    <div className="max-w-screen-2xl mx-auto mt-16">
      <div className="flex flex-col lg:flex-row">
        <div className="block lg:hidden">
          <Sorting
            selectedSort={selectedSort}
            onSortChange={handleSortChange}
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
          />
        </div>
        <div className={`max-w-full lg:w-1/4 ${isFilterOpen ? "block" : "hidden lg:block"}`} id="filter-section">
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
        </div>

        <div className="w-full lg:w-3/4 lg:mx-8">
          <div className="hidden lg:block">
            <Sorting
              selectedSort={selectedSort}
              onSortChange={handleSortChange}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
            />
          </div>
          <ProductGrid products={data?.data.products} />
        </div>
      </div>

      <Pagination currentPage={currentPage} totalPages={data?.pagination?.pages || 0} onPageChange={handlePageChange} />
    </div>
  );
}

export default ProductList;
