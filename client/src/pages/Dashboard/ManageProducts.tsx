import { useState } from "react";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { useGetProductsQuery } from "../../services/ApiProduct";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";

function ManageProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: products, error, isLoading } = useGetProductsQuery({ page: currentPage });

  if (isLoading) return <Spinner />;
  if (error) return <p>خطا در دریافت داده‌ها!</p>;

  const totalPages = products?.pagination?.pages;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-center">مدیریت محصولات</h2>
      <div className="grid grid-cols-1 gap-6">
        {products?.data.products.map(product => (
          <div
            key={product.id}
            className="border-b p-4 flex items-center justify-between rounded-lg shadow-lg transform hover:scale-105 transition-all ease-in-out duration-300"
          >
            <img src={`${product.image}`} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
            <div className="flex flex-col mr-6 flex-grow">
              <span className="font-semibold text-lg text-gray-800">{product.name}</span>
              <span className="text-gray-600 mt-1">قیمت: {product.price.toLocaleString()} تومان</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-600">تعداد موجودی: {product.countInStock}</span>
              </div>
            </div>
            <div className="mt-4 flex gap-4 items-center">
              <button className="flex items-center bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-all ease-in-out duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                <FaEdit />
              </button>
              <button className="flex items-center bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition-all ease-in-out duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                <FaRegTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages || 0} onPageChange={handlePageChange} />
    </div>
  );
}

export default ManageProducts;
