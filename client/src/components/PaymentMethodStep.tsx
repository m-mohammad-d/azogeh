import { useState } from "react";
import { useDispatch } from "react-redux";
import { savePaymentMethod } from "../store/CartSlice";
import { FaMoneyBillWave, FaCreditCard, FaHandshake } from "react-icons/fa";

interface PaymentMethod {
  id: number;
  name: string;
  description: string;
  icon: JSX.Element;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 1,
    name: "کارت به کارت",
    description: "پرداخت مستقیم از کارت بانکی",
    icon: <FaMoneyBillWave className="text-3xl" />,
  },
  {
    id: 2,
    name: "پرداخت آنلاین",
    description: "پرداخت با استفاده از درگاه‌های آنلاین",
    icon: <FaCreditCard className="text-3xl" />,
  },
  {
    id: 3,
    name: "پرداخت در محل",
    description: "پرداخت نقدی در هنگام تحویل",
    icon: <FaHandshake className="text-3xl" />,
  },
];

interface PaymentMethodStepProps {
  onNext: () => void;
}

const PaymentMethodStep: React.FC<PaymentMethodStepProps> = ({ onNext }) => {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState<number | null>(null);

  const handlePaymentMethodChange = (id: number) => {
    setPaymentMethod(id);
  };

  const handleSubmit = () => {
    if (paymentMethod) {
      const selectedMethod = paymentMethods.find(method => method.id === paymentMethod);
      if (selectedMethod) {
        dispatch(savePaymentMethod(selectedMethod.name));
      }
      onNext();
    } else {
      alert("لطفاً روش پرداخت را انتخاب کنید");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">مرحله ۲: انتخاب روش پرداخت</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        {paymentMethods.map(method => (
          <div
            key={method.id}
            onClick={() => handlePaymentMethodChange(method.id)}
            className={`border rounded-lg p-6 cursor-pointer transition transform hover:scale-105 flex items-center shadow-md hover:shadow-lg ${
              paymentMethod === method.id ? "bg-primary-200 border-primary-400" : "bg-white border-gray-200"
            }`}
          >
            <div className="text-primary-600 ml-4">{method.icon}</div>
            <div>
              <h3 className="text-xl font-semibold">{method.name}</h3>
              <p className="text-gray-600 text-sm">{method.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-primary-500 hover:bg-primary-600 transition duration-300 ease-in-out text-white px-6 py-3 rounded-lg shadow-md"
      >
        ادامه
      </button>
    </div>
  );
};

export default PaymentMethodStep;
