import { useState } from "react";
import { useUpdatePasswordMutation } from "../../services/UsersApi";
import toast from "react-hot-toast";
import { ErrorResponse } from "react-router-dom";

interface UserProfile {
  passwordCurrent: string;
  password: string;
  passwordConfirmation: string;
}

function ChangePasswordPage() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    passwordCurrent: "",
    password: "",
    passwordConfirmation: "",
  });
  const [updatePassword] = useUpdatePasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updatePassword(userProfile).unwrap();
      toast.success("پسورد با موفقیت عوض شد");
    } catch (error: unknown) {
      toast.error((error as ErrorResponse).data.message, {
        duration: 6000,
      });
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-400 mb-4 text-center">ویرایش رمز عبور</h2>
        <div className="mb-4">
          <label htmlFor="passwordCurrent" className="block text-gray-700 font-medium mb-2">
            رمز عبور فعلی
          </label>
          <input
            type="password"
            name="passwordCurrent"
            id="passwordCurrent"
            value={userProfile.passwordCurrent}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            رمز عبور جدید
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={userProfile.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="passwordConfirmation" className="block text-gray-700 font-medium mb-2">
            تکرار رمز عبور
          </label>
          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            value={userProfile.passwordConfirmation}
            onChange={handleChange}
            placeholder="تکرار رمز عبور"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
        >
          تغییر رمز عبور
        </button>
      </form>
    </div>
  );
}

export default ChangePasswordPage;
