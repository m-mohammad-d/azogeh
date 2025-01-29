import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { separateThousands } from "../utils/FormatNumber";
import Button from "./Button";

interface ConfirmationStepProps {
  onConfirm: () => void;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ onConfirm }) => {
  const cartItems = useSelector((state: RootState) => state.cart.orderItems);
  const shippingAddress = useSelector((state: RootState) => state.cart.shippingAddress);
  const paymentMethod = useSelector((state: RootState) => state.cart.paymentMethod);

  // Calculate total price, shipping price, and tax price
  const itemsTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = useSelector((state: RootState) => state.cart.shippingPrice);
  const taxPrice = useSelector((state: RootState) => state.cart.taxPrice);
  const total = itemsTotal + shippingPrice + taxPrice;

  return (
    <div>
      <h2 className="mb-2 text-lg font-bold">مرحله ۳: تأیید اطلاعات</h2>
      <div>
        <h3 className="font-bold">آدرس:</h3>
        <p>{`${shippingAddress?.province} - ${shippingAddress?.city} - ${shippingAddress?.street}`}</p>

        <h3 className="font-bold">روش پرداخت:</h3>
        <p>{paymentMethod}</p>

        <h3 className="font-bold">جزئیات سفارش:</h3>
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between border-b py-2">
            <span>{item.qty} عدد</span>
          </div>
        ))}

        <h3 className="mt-4 font-bold">جمع کل:</h3>
        <div className="flex justify-between">
          <span>قیمت کالاها:</span>
          <span>{separateThousands(itemsTotal.toFixed(0))} تومان</span>
        </div>
        <div className="flex justify-between">
          <span>هزینه حمل و نقل:</span>
          <span>{separateThousands(shippingPrice.toFixed(0))} تومان</span>
        </div>
        <div className="flex justify-between">
          <span>مالیات:</span>
          <span>{separateThousands(taxPrice.toFixed(0))} تومان</span>
        </div>
        <h2 className="mt-4 text-xl font-bold">جمع کل: {separateThousands(total.toFixed(0))} تومان</h2>
        <Button onClick={onConfirm} className="mt-4">تأیید سفارش</Button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
