import { useState } from "react";
import OrderCartItem from "../../components/OrderCartItem";
import Pagination from "../../components/Pagination";

function OrderHistory() {
  // fake order
  const orders = [
    {
      _id: "66d822f3148374a54c6a7913",
      name: "پودر دسر اکلیلی فرمند با طعم انار - 100 گرم",
      image: "deser-falvor-farmand.webp",
      quantity: 1,
      price: 45000,
    },
    {
      _id: "66d822f3148374a54c6a7913",
      name: "پودر دسر اکلیلی فرمند با طعم انار - 100 گرم",
      image: "deser-falvor-farmand.webp",
      quantity: 1,
      price: 45000,
    },
    {
      _id: "66d822f3148374a54c6a7913",
      name: "پودر دسر اکلیلی فرمند با طعم انار - 100 گرم",
      image: "deser-falvor-farmand.webp",
      quantity: 1,
      price: 45000,
    },
    {
      _id: "66d822f3148374a54c6a7913",
      name: "پودر دسر اکلیلی فرمند با طعم انار - 100 گرم",
      image: "deser-falvor-farmand.webp",
      quantity: 1,
      price: 45000,
    },
    {
      _id: "66d822f3148374a54c6a7913",
      name: "پودر دسر اکلیلی فرمند با طعم انار - 100 گرم",
      image: "deser-falvor-farmand.webp",
      quantity: 1,
      price: 45000,
    },
    {
      _id: "66d822f3148374a54c6a7913",
      name: "پودر دسر اکلیلی فرمند با طعم انار - 100 گرم",
      image: "deser-falvor-farmand.webp",
      quantity: 1,
      price: 45000,
    },
  ];

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

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
        {currentOrders.map(product => (
          <OrderCartItem key={product._id} product={product} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default OrderHistory;
