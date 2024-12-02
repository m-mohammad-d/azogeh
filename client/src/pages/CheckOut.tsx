import { useState } from "react";
import AddressSelection from "../components/AddressSelection";
import PaymentMethodStep from "../components/PaymentMethodStep";
import ConfirmationStep from "../components/ConfirmationStep";
import PaymentConfirmation from "../components/PaymentConfirmation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../store/CartSlice";
import { useCreateOrderMutation } from "../services/OrderApi";
import { RootState } from "../store";
import { Product } from "../types/product";

const CheckOut: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart);

  const [createOrder] = useCreateOrderMutation();
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handleCompleteOrder = async () => {
    const transformedData = {
      orderItems: cartItems.orderItems.map((item: Product) => ({
        product: item._id,
        qty: item.qty,
      })),
      itemsPrice: cartItems.itemsPrice,
      shippingPrice: cartItems.shippingPrice,
      taxPrice: cartItems.taxPrice,
      totalPrice: cartItems.totalPrice,
      shippingAddress: {
        province: cartItems.shippingAddress?.province,
        city: cartItems.shippingAddress?.city,
        street: cartItems.shippingAddress?.street,
      },
      paymentMethod: cartItems.paymentMethod,
    };
    try {
      const res = await createOrder(transformedData).unwrap();
      console.log(res);

      toast.success("سفارش شما با موفقیت ثبت شد!");
      setCurrentStep(4);
      dispatch(resetCart());
      resetCart();
    } catch (error) {
      console.log(error);
      toast.error("مشکلی در ثبت سفارش به وجود آمد. لطفاً دوباره تلاش کنید.");
    }
  };

  const handleFinish = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center my-20 mx-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl border-gray-200 border">
        {currentStep === 1 && <AddressSelection onNext={handleNextStep} />}
        {currentStep === 2 && <PaymentMethodStep onNext={handleNextStep} />}
        {currentStep === 3 && <ConfirmationStep onConfirm={handleCompleteOrder} />}
        {currentStep === 4 && <PaymentConfirmation onFinish={handleFinish} />}

        <div className="mt-4">
          <p>مرحله {currentStep} از 4</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
