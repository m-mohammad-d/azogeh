import { FaEnvelope } from "react-icons/fa";

const PasswordResetLinkSent = () => {
  return (
    <div className="flex items-center justify-center my-20 mx-4">
      <div className="p-10 w-full max-w-md bg-white text-center">
        <FaEnvelope className="text-Success-400 text-6xl mb-4 mx-auto" />

        <h1 className="text-3xl font-bold text-primary-600 mb-6">لینک ریست پسورد ارسال شد</h1>
        <p className="text-gray-500 mb-8">لینک ریست پسورد به ایمیل شما ارسال شد. لطفاً ایمیل خود را بررسی کنید.</p>

        <a
          href="/login"
          className="inline-block bg-primary-400 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-success-400 transition-colors"
        >
          بازگشت به صفحه ورود
        </a>
      </div>
    </div>
  );
};

export default PasswordResetLinkSent;
