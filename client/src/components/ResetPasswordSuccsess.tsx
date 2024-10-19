import { FaCheckCircle } from "react-icons/fa"; 

const PasswordResetSuccess = () => {
  return (
    <div className="flex items-center justify-center my-20 mx-4">
      <div className="p-10 w-full max-w-md bg-white text-center">
        <FaCheckCircle className="text-Success-400 text-6xl mb-4 mx-auto" />

        <h1 className="text-3xl font-bold text-primary-600 mb-6">رمز با موفقیت عوض شد</h1>
        <p className="text-gray-500 mb-8">رمز عبور شما با موفقیت تغییر کرد. اکنون می‌توانید با رمز جدید وارد شوید.</p>

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

export default PasswordResetSuccess;
