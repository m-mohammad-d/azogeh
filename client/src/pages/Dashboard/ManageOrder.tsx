
import Spinner from "../../components/Spinner";
import { useGetAllOrderQuery } from "../../services/OrderApi";
import { useGetProductsQuery } from "../../services/ApiProduct";
import OrderCartItem from "../../components/OrderCartItem";

function ManageOrder() {
  const { data, isLoading: isLoadingOrders } = useGetAllOrderQuery();
  const { data: productData, isLoading: isLoadingProducts } = useGetProductsQuery();

  if (isLoadingOrders || isLoadingProducts) return <Spinner />;

  const orders = data?.data?.orders || [];
  const products = productData?.data?.products || [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">مدیریت سفارشات</h2>
      <div className="flex flex-wrap space-x-4">
        {orders.map(order => (
          <div key={order._id} className="w-full p-2">
            <OrderCartItem order={order} products={products} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageOrder;
