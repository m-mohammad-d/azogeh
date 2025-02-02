import { useState } from "react";
import AddressSelection from "../components/AddressSelection";
import PaymentMethodStep from "../components/PaymentMethodStep";
import ConfirmationStep from "../components/ConfirmationStep";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../store/CartSlice";
import { useCreateOrderMutation } from "../services/OrderApi";
import { RootState } from "../store";
import { Product } from "../types/product";
import MetaTags from "../components/MetaTag";

const CheckOut: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart);

  const [createOrder] = useCreateOrderMutation();
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
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
      navigate(`/user/manage-order/${res.data.order._id}`);
      dispatch(resetCart());
      resetCart();
    } catch (error) {
      console.log(error);
      toast.error("مشکلی در ثبت سفارش به وجود آمد. لطفاً دوباره تلاش کنید.");
    }
  };

  return (
    <div className="mx-4 my-20 flex items-center justify-center">
      <MetaTags title="تکمیل خرید | اذوقه" description="مراحل پایانی خرید خود را در این صفحه تکمیل کنید. ارسال سریع و مطمئن برای شما." keywords="تکمیل خرید, پرداخت آنلاین, خرید مواد غذایی" />
      <div className="w-full max-w-2xl rounded-md border border-gray-200 bg-white p-8 shadow-md">
        {currentStep === 1 && <AddressSelection onNext={handleNextStep} />}
        {currentStep === 2 && <PaymentMethodStep onNext={handleNextStep} />}
        {currentStep === 3 && <ConfirmationStep onConfirm={handleCompleteOrder} />}
        <div className="mt-4">
          <p>مرحله {currentStep} از3 </p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
