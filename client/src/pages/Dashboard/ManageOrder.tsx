import { FaCreditCard, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Spinner from "../../components/Spinner";
import { useGetAllOrderQuery } from "../../services/OrderApi";
import { useGetProductsQuery } from "../../services/ApiProduct";

function ManageOrder() {
  const { data, isLoading: isLoadingOrders } = useGetAllOrderQuery();
  const { data: productData, isLoading: isLoadingProducts } = useGetProductsQuery();

  if (isLoadingOrders || isLoadingProducts) return <Spinner />;

  const orders = data?.data?.orders || [];
  const products = productData?.data?.products || [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">مدیریت سفارشات</h2>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order._id} className="w-full bg-gray-100 p-6 rounded-lg shadow-md flex flex-col">
            <div className="font-semibold text-lg">شناسه سفارش: {order._id}</div>

            <div className="flex items-center mt-2">
              <FaCreditCard className="mr-2 text-primary-500" />
              <span>روش پرداخت: {order.paymentMethod}</span>
            </div>

            <div className="mt-2">
              <span>مبلغ کل: </span>
              <span className="font-semibold text-primary-500">{order.totalPrice.toLocaleString()} تومان</span>
            </div>

            <div className="mt-2">
              آدرس ارسال:{" "}
              <span className="font-semibold">{`${order.shippingAddress.province} - ${order.shippingAddress.city} - ${order.shippingAddress.street}`}</span>
            </div>

            <div className="text-sm text-gray-500 mt-2">تاریخ سفارش: {new Date(order.createdAt).toLocaleString()}</div>

            <div className="flex items-center mt-2">
              {order.isPaid ? (
                <FaCheckCircle className="text-green-500 mr-2" />
              ) : (
                <FaTimesCircle className="text-red-500 mr-2" />
              )}
              <span>{order.isPaid ? "پرداخت شده" : "پرداخت نشده"}</span>
            </div>

            <div className="flex items-center mt-2">
              {order.isDelivered ? (
                <FaCheckCircle className="text-green-500 mr-2" />
              ) : (
                <FaTimesCircle className="text-red-500 mr-2" />
              )}
              <span>{order.isDelivered ? "تحویل شده" : "تحویل نشده"}</span>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">محصولات سفارش:</h3>
              <div className="flex flex-wrap">
                {order.orderItems.map(orderItem => {
                  const product = products.find(p => p._id === orderItem.product);
                  return (
                    product && (
                      <div key={orderItem._id} className="flex items-center mr-4 mb-2">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageOrder;
