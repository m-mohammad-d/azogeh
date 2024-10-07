import React, { useState } from "react";

interface UserProfile {
  username: string;
  fullName: string;
  email: string;
}

const UpdateInfoPage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: "",
    fullName: "",
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
    <div className="max-w-screen-xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-400 mb-4 text-center">ویرایش مشخصات</h2>
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
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
            یوزرنیم
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={userProfile.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
            نام و نام خانوادگی
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={userProfile.fullName}
            onChange={handleChange}
            placeholder="نام و نام خانوادگی"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
        >
          ذخیره تغییرات
        </button>
      </form>
    </div>
  );
};

export default UpdateInfoPage;
