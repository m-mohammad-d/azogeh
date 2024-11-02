import { useState } from "react";
import AddressSelection from "../components/AddressSelection";
import PaymentMethodStep from "../components/PaymentMethodStep";
import ConfirmationStep from "../components/ConfirmationStep";
import PaymentConfirmation from "../components/PaymentConfirmation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCart } from "../store/CartSlice";

const CheckOut: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handleCompleteOrder = () => {
    toast.success("سفارش شما با موفقیت ثبت شد!");
    setCurrentStep(4);
    dispatch(resetCart());
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
