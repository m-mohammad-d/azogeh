import { Link, useParams } from "react-router-dom";
import { useDeliverOrderMutation, useGetOneOrderQuery } from "../services/OrderApi";
import Spinner from "../components/Spinner";
import { FaArrowLeft } from "react-icons/fa";
import moment from "moment-jalaali";
import { separateThousands } from "../utils/FormatNumber";
import { useGetMeQuery } from "../services/UsersApi";
import toast from "react-hot-toast";

function OrderPage() {
  const { id } = useParams();
  const { data: orderData, isLoading: isLoadingOrders } = useGetOneOrderQuery({ id });
  const { data: userInfo } = useGetMeQuery({});
  const [deliverOrder] = useDeliverOrderMutation();
  if (isLoadingOrders) return <Spinner />;

  const order = orderData?.data.order;
  const persianDate = moment(order?.createdAt).format("jYYYY/jMM/jDD");
  if (!id || !order) return <p>همچین سفارشی وجود ندارد</p>;

  async function handleDeliver(_id: string) {
    try {
      await deliverOrder({ orderId: _id }).unwrap();
      toast.success("پرداخت با موفقیت انجام شد.");
    } catch (error) {
      toast.error("مشکلی در پرداخت محصول به وجود آمد.");
    }
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h2 className="text-lg font-semibold">جزئیات سفارش</h2>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <p>بازگشت</p>
          <FaArrowLeft />
        </div>
      </div>

      {/* Order Info */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
        <div className="flex flex-col">
          <h3 className="text-gray-500">کد پیگیری سفارش:</h3>
          <p>{order?._id}</p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-gray-500">تاریخ ثبت سفارش:</h3>
          <p>{persianDate}</p>
        </div>
      </div>

      {/* User Info */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
        <div className="flex flex-col">
          <h3 className="text-gray-500">تحویل گیرنده:</h3>
          <p>{order?.user.name}</p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-gray-500">ایمیل:</h3>
          <p>{order?.user.email}</p>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="mt-4 flex flex-col gap-2 border-b border-gray-100 pb-4">
        <h3 className="text-gray-500">آدرس:</h3>
        <p>
          {order?.shippingAddress.province}, {order?.shippingAddress.city}, {order?.shippingAddress.street}
        </p>
      </div>

      {/* Price Info */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-b border-gray-100 pb-4">
        <div className="flex flex-col">
          <h3 className="text-gray-500">هزینه محصول:</h3>
          <p>{separateThousands(order?.itemsPrice || 0)}</p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-gray-500">مالیات:</h3>
          <p>{separateThousands(order?.taxPrice || 0)}</p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-gray-500">هزینه ارسال:</h3>
          <p>{separateThousands(order?.shippingPrice || 0)}</p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-gray-500">قیمت کل:</h3>
          <p>{separateThousands(order?.totalPrice || 0)}</p>
        </div>
        <div className="flex flex-col sm:col-span-2 lg:col-span-4 sm:items-center mt-4">
          <h3 className="text-gray-500">روش پرداخت:</h3>
          <p>{order?.paymentMethod}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
        {userInfo.data.user.role === "user" && (
          <>
            {!order.isPaid ? (
              <Link
                to={`/payment/${order._id}`}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
              >
                پرداخت
              </Link>
            ) : (
              <span className="text-green-600 font-medium">این محصول پرداخت شده است</span>
            )}
          </>
        )}

        {!order.isDelivered ? (
          userInfo.data.user.role === "admin" && (
            <button
              onClick={() => handleDeliver(order?._id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              تحویل سفارش
            </button>
          )
        ) : (
          <span className="text-blue-600 font-medium">این محصول تحویل داده شده است</span>
        )}
      </div>

      {/* Order Items */}
      <div className="p-4">
        <div className="space-y-4 border border-gray-100 mt-4 p-4">
          {order?.orderItems.map(item => (
            <div key={item._id} className="flex flex-col sm:flex-row items-center border rounded-lg shadow p-4 gap-4">
              <img src={item.product.image} alt={item.product.name} className="w-24 h-24 rounded-md object-cover" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                <p className="text-sm text-gray-500 mt-2">قیمت: {item.product.price.toLocaleString()} تومان</p>
                <p className="text-sm text-gray-500">تعداد: {item.qty}</p>
              </div>
              <Link
                to={`/product/${item.product._id}`}
                className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md"
              >
                ثبت دیدگاه
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
