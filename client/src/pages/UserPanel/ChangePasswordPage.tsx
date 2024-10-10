import { useState } from "react";

interface UserProfile {
  password: string;
  repeatPassword: string;
  email: string;
}
function ChangePasswordPage() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    password: "",
    repeatPassword: "",
    email: "user@example.com",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Updated Profile:", userProfile);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-400 mb-4 text-center">ویرایش رمز عبور</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            ایمیل
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={userProfile.email}
            onChange={handleChange}
            disabled
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            رمز عبور
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
          <label htmlFor="repeatPassword" className="block text-gray-700 font-medium mb-2">
            تکرار رمز عبور
          </label>
          <input
            type="password"
            name="repeatPassword"
            id="repeatPassword"
            value={userProfile.repeatPassword}
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
