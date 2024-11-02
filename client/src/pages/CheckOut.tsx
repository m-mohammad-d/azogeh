import { useState } from "react";
import AddressSelection from "../components/AddressSelection";
import PaymentMethodStep from "../components/PaymentMethodStep";

const CheckOut: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const handleNextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handleCompleteOrder = () => {
    alert("سفارش شما با موفقیت ثبت شد!");
  };

  return (
    <div className="flex items-center justify-center my-20 mx-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl border-gray-200 border">
        {currentStep === 1 && <AddressSelection onNext={handleNextStep} />}
        {currentStep === 2 && <PaymentMethodStep onNext={handleNextStep} />}

        <div className="mt-4">
          <p>مرحله {currentStep} از ۳</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
