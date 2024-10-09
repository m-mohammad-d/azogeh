import OrderCartItem from "../../components/OrderCartItem";

function OrderHistory() {
  const orders = [{ _id: "1", name: "پیتزا", quantity: 1, price: 50000, image: "pizza.jpg" }];
  return (
    <div className="max-w-screen-xl mx-auto p-6 border border-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-right">تاریخچه سفارشات</h1>

      <h3 className="text-lg font-bold mt-4 text-right">محصولات خریداری شده:</h3>
      <div className="mt-2">
        {orders.map(product => (
          <OrderCartItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
