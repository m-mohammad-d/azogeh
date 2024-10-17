import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import { useForgetPasswordMutation } from "../services/UsersApi";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [forgetPassword] = useForgetPasswordMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgetPassword({ email: email }).unwrap();
    toast.success("لینک بازنشانی پسورد به ایمیل شما ارسال شد ایمیل خود را چک کنید");
  };

  return (
    <div className="flex items-center justify-center my-20 mx-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">بازیابی رمز عبور</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <CustomInput
              label="ایمیل خود را وارد کنید"
              type="email"
              name="email"
              placeholder="ایمیل خود را برای بازنشانی پسورد وارد کنید"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              ارسال لینک بازیابی
            </button>
          </div>
        </form>
        <p>لینک بازیابی پسورد به ایمیل شما ارسال میشود </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
