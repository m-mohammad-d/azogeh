import React from "react";
import { FaCheckCircle } from "react-icons/fa";

interface PaymentConfirmationProps {
  onFinish: () => void;
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({ onFinish }) => {
  return (
    <div className="flex flex-col items-center">
      <FaCheckCircle className="text-green-500 text-6xl mb-4" /> 
      <h2 className="text-lg font-bold mb-2">تأیید پرداخت</h2>
      <p className="mb-4">پرداخت شما با موفقیت انجام شد!</p>
      <button
        onClick={onFinish}
        className="mt-4 bg-primary-500 hover:bg-primary-600 transition duration-300 ease-in-out text-white px-6 py-3 rounded-lg shadow-md"
      >
        بازگشت به صفحه اصلی
      </button>
    </div>
  );
};

export default PaymentConfirmation;
