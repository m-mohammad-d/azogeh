import { useState } from "react";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";
import { useGetMyOrdersQuery } from "../../services/OrderApi";
import OrderHistoryCard from "../../components/OrderHistoryCard";
import { useGetProductsQuery } from "../../services/ApiProduct";
import MetaTags from "../../components/MetaTag";

function OrderHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<"all" | "paid" | "unpaid" | "delivered" | "undelivered">("all");
  const { data: products, isLoading } = useGetProductsQuery({});

  const { data: orderData, isLoading: isLoadingOrders } = useGetMyOrdersQuery({
    sort: "createdAt",
    isPaid: filter === "paid" ? true : filter === "unpaid" ? false : undefined,
    isDelivered: filter === "delivered" ? true : filter === "undelivered" ? false : undefined,
  });
  if (isLoadingOrders || isLoading) return <Spinner />;

  const orders = orderData?.data?.orders || [];
  const itemsPerPage = 5;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const currentOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <MetaTags title="تاریخچه سفارشات | پنل کاربری" description="مشاهده سفارش‌های قبلی." />

      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">تاریخچه سفارشات</h1>

        {/* Filter Tabs */}
        <div className="mb-6 overflow-x-auto border-b bg-white">
          <div className="flex">
            {[
              { key: "all", label: "همه سفارشات" },
              { key: "delivered", label: "تحویل شده" },
              { key: "undelivered", label: "در انتظار تحویل" },
              { key: "paid", label: "پرداخت شده" },
              { key: "unpaid", label: "پرداخت نشده" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key as typeof filter)}
                className={`px-4 py-3 text-sm font-medium transition-colors ${filter === key ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:bg-gray-50"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {currentOrders.map((order) => (
            <OrderHistoryCard key={order._id} order={order} products={products?.data.products} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
