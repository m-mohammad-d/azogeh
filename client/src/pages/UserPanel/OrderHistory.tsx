import { useState } from "react";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";
import { useGetMyOrdersQuery } from "../../services/OrderApi";

function OrderHistory() {
  const { data: orderData, isLoading: isLoadingOrders } = useGetMyOrdersQuery();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoadingOrders) return <Spinner />;

  const orders = orderData?.data?.orders || [];

  const itemsPerPage = 5;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">تاریخچه سفارشات</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border-t-4 border-indigo-500">
        <table className="min-w-full table-auto text-sm text-gray-700">
          <thead className="bg-gradient-to-r text-gray-500">
            <tr>
              <th className="py-4 px-6 text-left">شناسه سفارش</th>
              <th className="py-4 px-6 text-left">کاربر</th>
              <th className="py-4 px-6 text-left">تاریخ ایجاد</th>
              <th className="py-4 px-6 text-left">وضعیت پرداخت</th>
              <th className="py-4 px-6 text-left">وضعیت تحویل</th>
              <th className="py-4 px-6 text-right">مجموع قیمت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentOrders.map(order => (
              <tr key={order._id} className="hover:bg-gray-50 transition duration-300">
                <td className="py-4 px-6">{order._id}</td>
                <td className="py-4 px-6">{order.user}</td>
                <td className="py-4 px-6">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="py-4 px-6">
                  <span className={`font-semibold ${order.isPaid ? "text-green-600" : "text-red-600"}`}>
                    {order.isPaid ? "پرداخت شده" : "پرداخت نشده"}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`font-semibold ${order.isDelivered ? "text-blue-600" : "text-yellow-600"}`}>
                    {order.isDelivered ? "تحویل داده شده" : "تحویل نشده"}
                  </span>
                </td>
                <td className="py-4 px-6 text-right font-semibold text-lg text-gray-900">{order.totalPrice} تومان</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}

export default OrderHistory;
