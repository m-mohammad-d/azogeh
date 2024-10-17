import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "../services/UsersApi";

function ResetPasswordPage() {
  const location = useLocation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword] = useResetPasswordMutation();
  const [resetToken, setResetToken] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("resetToken");
    setResetToken(token);
  }, [location]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("پسورد ها مطابقت ندارد");
      return;
    }

    if (!resetToken) {
      toast.error("توکن بازنشانی معتبر نیست.");
      return;
    }

    try {
      await resetPassword({
        resetToken,
        password: newPassword,
        passwordConfirmation: confirmPassword,
      }).unwrap();
      toast.success("رمز عبور شما با موفقیت تغییر کرد.");
    } catch (error) {
      toast.error("خطا در تغییر رمز عبور. لطفاً دوباره امتحان کنید.");
    }
  };

  return (
    <div className="flex items-center justify-center my-20 mx-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">تغییر رمز عبور</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <CustomInput
              label="رمز عبور جدید"
              type="password"
              name="newPassword"
              placeholder="رمز عبور جدید خود را وارد کنید"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="mb-4">
            <CustomInput
              label="تایید رمز عبور"
              type="password"
              name="confirmPassword"
              placeholder="رمز عبور خود را دوباره وارد کنید"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              تغییر رمز عبور
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
