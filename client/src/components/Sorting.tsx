import { FaFilter } from "react-icons/fa";

interface SortingProps {
  selectedSort: string;
  onSortChange: (sortOption: string) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
}

function Sorting({ selectedSort, onSortChange, isFilterOpen, setIsFilterOpen }: SortingProps) {
  const handleSortClick = (sortOption: string) => {
    onSortChange(sortOption);
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="hidden lg:flex lg:gap-4">
        <button
          className={`text-neutral-gray-7 hover:text-primary-400 ${
            selectedSort === "-countInStock" ? "font-bold border-b border-primary text-primary" : ""
          }`}
          onClick={() => handleSortClick("-countInStock")}
        >
          بیشترین موجودی
        </button>
        <button
          className={`text-neutral-gray-7 hover:text-primary-400 ${
            selectedSort === "countInStock" ? "font-bold border-b border-primary text-primary" : ""
          }`}
          onClick={() => handleSortClick("countInStock")}
        >
          کمترین موجودی
        </button>
        <button
          className={`text-neutral-gray-7 hover:text-primary-400 ${
            selectedSort === "-discount" ? "font-bold border-b border-primary text-primary" : ""
          }`}
          onClick={() => handleSortClick("-discount")}
        >
          بیشترین تخفیف
        </button>
        <button
          className={`text-neutral-gray-7 hover:text-primary-400 ${
            selectedSort === "discount" ? "font-bold border-b border-primary text-primary" : ""
          }`}
          onClick={() => handleSortClick("discount")}
        >
          کمترین تخفیف
        </button>
        <button
          className={`text-neutral-gray-7 hover:text-primary-400 ${
            selectedSort === "-price" ? "font-bold border-b border-primary text-primary" : ""
          }`}
          onClick={() => handleSortClick("-price")}
        >
          گران‌ترین
        </button>
        <button
          className={`text-neutral-gray-7 hover:text-primary-400 ${
            selectedSort === "price" ? "font-bold border-b border-primary text-primary" : ""
          }`}
          onClick={() => handleSortClick("price")}
        >
          ارزان‌ترین
        </button>
      </div>

      <div className="lg:hidden flex items-center gap-4 mx-6">
        <div
          className="mr-4 flex items-center"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          aria-expanded={isFilterOpen}
          aria-controls="filter-section"
        >
          <FaFilter />
          <p>فیلترها</p>
        </div>
        <select
          value={selectedSort}
          onChange={e => handleSortClick(e.target.value)}
          className="w-full rounded-lg p-3 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-500 transition duration-200"
        >
          <option value="">مرتب‌سازی</option>
          <option value="-countInStock">بیشترین موجودی</option>
          <option value="countInStock">کمترین موجودی</option>
          <option value="-discount">بیشترین تخفیف</option>
          <option value="discount">کمترین تخفیف</option>
          <option value="-price">گران‌ترین</option>
          <option value="price">ارزان‌ترین</option>
        </select>
      </div>
    </div>
  );
}

export default Sorting;
