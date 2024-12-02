import { useState } from "react";
import OrderCartItem from "../../components/OrderCartItem";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";
import { useGetMyOrdersQuery } from "../../services/OrderApi";
import { useGetProductsQuery } from "../../services/ApiProduct";

function OrderHistory() {
  const { data: orderData, isLoading: isLoadingOrders } = useGetMyOrdersQuery();
  const { data: productData, isLoading: isLoadingProducts } = useGetProductsQuery();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoadingOrders || isLoadingProducts) return <Spinner />;

  const orders = orderData?.data?.orders || [];
  const products = productData?.data?.products || [];

  const itemsPerPage = 5;

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">تاریخچه سفارشات</h1>

      <h3 className="text-lg sm:text-xl font-bold mt-4">محصولات خریداری شده:</h3>
      <div className="mt-2 flex flex-col space-y-4">
        {currentOrders.map(order => (
          <OrderCartItem key={order._id} order={order} products={products} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default OrderHistory;
