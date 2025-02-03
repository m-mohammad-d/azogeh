import { useState, useEffect } from "react";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { useGetProductsQuery, useDeleteProductMutation } from "../../services/ApiProduct";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import MetaTags from "../../components/MetaTag";

function ManageProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data: products, error, isLoading, refetch } = useGetProductsQuery({ page: currentPage });
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    setSearchParams({ page: String(currentPage) });
  }, [currentPage, setSearchParams]);

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">خطا در دریافت داده‌ها!</p>;

  const totalPages = products?.pagination?.pages;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct({ productid: productId }).unwrap();
      toast.success("محصول با موفقیت حذف شد!");
      refetch();
    } catch (err) {
      toast.error("خطا در حذف محصول!");
    }
  };

  return (
    <div className="mx-auto max-w-6xl bg-gray-100 p-4">
      <MetaTags title="مدیریت محصولات | داشبورد" description="مدیریت محصولات موجود در سیستم." />

      <h2 className="mb-6 text-center text-2xl font-semibold">مدیریت محصولات</h2>

      <div className="space-y-6">
        {products?.data.products.map((product) => (
          <div key={product.id} className="flex flex-col items-center gap-4 rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg sm:flex-row">
            <img src={product.image} alt={product.name} className="h-24 w-24 rounded-lg object-cover sm:h-28 sm:w-28" />

            <div className="flex flex-grow flex-col text-center sm:text-right">
              <span className="text-lg font-semibold text-gray-800">{product.name}</span>
              <span className="mt-1 text-gray-600">قیمت: {product.price.toLocaleString()} تومان</span>
              <span className="mt-1 text-gray-600">موجودی: {product.countInStock}</span>
            </div>

            <div className="mt-4 flex items-center gap-2 sm:mt-0 sm:gap-4">
              <Link to={`/admin/update-product/${product.id}`}>
                <button className="rounded-md bg-blue-600 p-2 text-white transition-all hover:bg-blue-700 sm:p-3">
                  <FaEdit className="text-lg sm:text-xl" />
                </button>
              </Link>
              <button className="rounded-md bg-red-600 p-2 text-white transition-all hover:bg-red-700 sm:p-3" onClick={() => handleDeleteProduct(product.id)}>
                <FaRegTrashAlt className="text-lg sm:text-xl" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages || 0} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}

export default ManageProducts;
