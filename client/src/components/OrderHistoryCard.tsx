import { Order } from "../types/OrderType";
import moment from "moment-jalaali";
import { separateThousands } from "../utils/FormatNumber";
import { cn } from "../utils/util";
import { CiLocationOn, CiShoppingCart } from "react-icons/ci";
import ProgressSteps from "./ProgressSteps";
import { FiPackage } from "react-icons/fi";
import { BsCheckCircle } from "react-icons/bs";
import { Product } from "../types/product";
import { Link } from "react-router-dom";

moment.loadPersian({ usePersianDigits: true });

function OrderHistoryCard({ order, products }: { order: Order; products: Product[] | undefined }) {
  const orderDate = moment(order.createdAt).format("dddd jD jMMMM jYYYY ساعت HH:mm");
  const steps = [
    { label: "در حال آماده‌سازی", icon: <FiPackage /> },
    { label: "آماده تحویل", icon: <CiShoppingCart /> },
    { label: "تحویل سفارش", icon: <BsCheckCircle /> },
  ];
  return (
    <div className="rounded-md border border-neutral-gray-3 p-4">
      <div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <img src="/icon/calendar.svg" alt="calendar" />
            <div className="flex items-center gap-4">
              <p className="text-neutral-gray-7">{orderDate}</p>
              <p className="text-neutral-gray-7">مبلغ : {separateThousands(order.totalPrice)}</p>
            </div>
          </div>
          <div>
            <span className={cn("rounded-md px-4 py-2 text-xs text-white", order.isDelivered ? "bg-status-success" : "bg-status-warning-light")}>{order.isDelivered ? "تحویل شده" : "جاری"}</span>
          </div>
        </div>
        <div className="mt-4 flex w-full items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <CiLocationOn size={25} />
            <div className="text-neutral-gray-7">
              <p>
                {order.shippingAddress.province} , {order.shippingAddress.city} , {order.shippingAddress.street}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <ProgressSteps steps={steps} currentStep={order.isDelivered ? 2 : 0} />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        {order.orderItems.map((item) => {
          const product = products?.find((product) => product._id === item.product);

          return (
            <div key={item?._id} className="w-full rounded-md border border-neutral-gray-3 p-3">
              <div>
                <img src={product?.image} alt={product?.name} />
                <div className="space-y-3 text-center text-neutral-gray-8">
                  <p className="line-clamp-2">{product?.name}</p>
                  <p>{product?.discountedPrice || product?.price} تومان</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-end">
        <Link to={`/user/manage-order/${order._id}`} className="rounded-md border-2 border-primary px-3 py-2 text-primary">
          مشاهده جزئیات سفارش
        </Link>
      </div>
    </div>
  );
}

export default OrderHistoryCard;
