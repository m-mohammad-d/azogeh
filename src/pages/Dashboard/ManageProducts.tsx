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
  if (error) return <p>خطا در دریافت داده‌ها!</p>;

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
      <div className="grid grid-cols-1 gap-6">
        {products?.data.products.map((product) => (
          <div key={product.id} className="flex transform items-center justify-between rounded-lg border-b p-4 shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
            <img src={`${product.image}`} alt={product.name} className="h-24 w-24 rounded-lg object-cover" />
            <div className="mr-6 flex flex-grow flex-col">
              <span className="text-lg font-semibold text-gray-800">{product.name}</span>
              <span className="mt-1 text-gray-600">قیمت: {product.price.toLocaleString()} تومان</span>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-gray-600">تعداد موجودی: {product.countInStock}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <Link to={`/admin/update-product/${product.id}`}>
                <button className="flex transform items-center rounded-md bg-blue-600 px-6 py-2 text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 hover:shadow-lg">
                  <FaEdit />
                </button>
              </Link>
              <button
                className="flex transform items-center rounded-md bg-red-600 px-6 py-2 text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-red-700 hover:shadow-lg"
                onClick={() => handleDeleteProduct(product.id)}
              >
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
