import { useState, useEffect } from "react";
import { useGetProductsQuery } from "../services/ApiProduct";
import BestSallersProduct from "../components/BestSallersProduct";
import { useSearchParams } from "react-router-dom";

function ProductList() {
  const [availableOnly, setAvailableOnly] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500000 });
  const [brand, setBrand] = useState("all");
  const [category, setCategory] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const isAvailableParam = searchParams.get("isAvailable");
    const minPriceParam = searchParams.get("minprice");
    const maxPriceParam = searchParams.get("maxprice");
    const brandParam = searchParams.get("brand");
    const categoryParam = searchParams.get("category");

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
  }, [searchParams]);

  const { data, error, isLoading } = useGetProductsQuery({
    availableOnly,
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
    brand,
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

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand = e.target.value;
    setBrand(selectedBrand);
    searchParams.set("brand", selectedBrand);
    setSearchParams(searchParams);
  };

  const handlecategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedcategory = e.target.value;
    setCategory(selectedcategory);
    searchParams.set("category", selectedcategory);
    setSearchParams(searchParams);
  };

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطایی رخ داده است.</div>;

  return (
    <div className="max-w-screen-2xl mx-auto mt-16">
      <div className="flex justify-between mx-4">
        {/* Filters */}
        <div className="w-1/4">
          <div className="p-4 rounded-lg border border-gray-100 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold mb-4">فیلتر ها</h3>
              <button
                onClick={() => {
                  setAvailableOnly(false);
                  setPriceRange({ min: 0, max: 500000 });
                  setBrand("all");
                  setCategory("all");
                  setSearchParams({});
                }}
              >
                حذف فیلتر
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-2">برند</label>
              <select value={brand} onChange={handleBrandChange} className="w-full border rounded-lg p-2">
                <option value="all">همه</option>
                <option value="cheetoz">مزمز</option>
                <option value="golestan">گلستان</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">نوع</label>
              <select value={category} onChange={handlecategoryChange} className="w-full border rounded-lg p-2">
                <option value="all">همه</option>
                <option value="Dairy">لبنیات</option>
                <option value="Snacks">تنقلات</option>
              </select>
            </div>
            <div className="mb-4 flex justify-between">
              <label className="mb-2">فقط محصولات موجود</label>
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={availableOnly}
                    onChange={handleSetAvailableOnly}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2">رنج قیمت</label>
              <div className="flex items-center mb-2">
                <input
                  type="number"
                  value={priceRange.min}
                  min="0"
                  max="500000"
                  onChange={e => handlePriceChange(e, "min")}
                  className="border rounded-lg p-2 w-1/2 mr-2"
                />
                <span className="mx-2">تا</span>
                <input
                  type="number"
                  value={priceRange.max}
                  min="0"
                  max="500000"
                  onChange={e => handlePriceChange(e, "max")}
                  className="border rounded-lg p-2 w-1/2"
                />
              </div>
              <div className="text-sm mt-2">حداکثر قیمت: {priceRange.max.toLocaleString()} تومان</div>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="w-3/4 mx-8">
          <div className="flex items-center gap-4 mb-6">
            <button className="text-gray-300 hover:text-primary-400">پرفروش‌ترین</button>
            <button className="text-gray-300 hover:text-primary-400">جدیدترین</button>
            <button className="text-gray-300 hover:text-primary-400">گران‌ترین</button>
            <button className="text-gray-300 hover:text-primary-400">ارزان‌ترین</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.data.products.map(product => (
              <BestSallersProduct key={product.id} name={product.name} price={product.price} img={product.image} />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded">1</button>
            <button className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded">2</button>
            <button className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded">3</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
