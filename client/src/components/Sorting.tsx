

interface SortingProps {
  selectedSort: string;
  onSortChange: (sortOption: string) => void;
}

function Sorting({ selectedSort, onSortChange }: SortingProps) {
  const handleSortClick = (sortOption: string) => {
    onSortChange(sortOption);
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <button
        className={`text-gray-300 hover:text-primary-400 ${selectedSort === "-countInStock" ? "font-bold border-b border-primary-700 text-primary-500" : ""}`}
        onClick={() => handleSortClick("-countInStock")}
      >
        بیتشرین موجودی
      </button>
      <button
        className={`text-gray-300 hover:text-primary-400 ${selectedSort === "countInStock" ? "font-bold border-b border-primary-700 text-primary-500" : ""}`}
        onClick={() => handleSortClick("countInStock")}
      >
        کمترین موجودی
      </button>
      <button
        className={`text-gray-300 hover:text-primary-400 ${selectedSort === "-discount" ? "font-bold border-b border-primary-700 text-primary-500" : ""}`}
        onClick={() => handleSortClick("-discount")}
      >
        بیشترین تخفیف
      </button>
      <button
        className={`text-gray-300 hover:text-primary-400 ${selectedSort === "discount" ? "font-bold border-b border-primary-700 text-primary-500" : ""}`}
        onClick={() => handleSortClick("discount")}
      >
        کمترین تخفیف
      </button>
      <button
        className={`text-gray-300 hover:text-primary-400 ${selectedSort === "-price" ? "font-bold border-b border-primary-700 text-primary-500" : ""}`}
        onClick={() => handleSortClick("-price")}
      >
        گران‌ترین
      </button>
      <button
        className={`text-gray-300 hover:text-primary-400 ${selectedSort === "price" ? "font-bold border-b border-primary-700 text-primary-500" : ""}`}
        onClick={() => handleSortClick("price")}
      >
        ارزان‌ترین
      </button>
    </div>
  );
}

export default Sorting;
