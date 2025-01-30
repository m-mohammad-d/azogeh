import { useState } from "react";
import { useDispatch } from "react-redux";
import { savePaymentMethod } from "../store/CartSlice";
import { FaMoneyBillWave, FaCreditCard, FaHandshake } from "react-icons/fa";
import Button from "./Button";

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
      const selectedMethod = paymentMethods.find((method) => method.id === paymentMethod);
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
      <h2 className="mb-4 text-lg font-bold">مرحله ۲: انتخاب روش پرداخت</h2>
      <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => handlePaymentMethodChange(method.id)}
            className={`flex transform cursor-pointer items-center rounded-lg border p-6 shadow-md transition hover:scale-105 hover:shadow-lg ${
              paymentMethod === method.id ? "border-primary bg-primary-tint2" : "border-gray-200 bg-white"
            }`}
          >
            <div className="text-primary-600 ml-4">{method.icon}</div>
            <div>
              <h3 className="text-xl font-semibold">{method.name}</h3>
              <p className="text-sm text-gray-600">{method.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Button onClick={handleSubmit}>
        ادامه
      </Button>
    </div>
  );
};

export default PaymentMethodStep;
