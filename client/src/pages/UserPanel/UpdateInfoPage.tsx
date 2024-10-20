import React, { useEffect, useState } from "react";
import { useGetMeQuery, useUpdateInfoMutation } from "../../services/UsersApi";
import toast from "react-hot-toast";
import SmallSpinner from "../../components/SmallSpinner";

interface UserProfile {
  name: string;
  email: string;
}

const UpdateInfoPage: React.FC = () => {
  const [updateinfo, { isLoading }] = useUpdateInfoMutation();
  const { data: info } = useGetMeQuery({});
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (info) {
      setUserProfile({
        name: info?.data?.user?.name,
        email: info?.data?.user?.email,
      });
    }
  }, [info]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userProfile.name.length < 3 || userProfile.name.length > 15) {
      toast.error("نام باید بین 3 تا 15 کاراکتر باشد.");
      return;
    }
    updateinfo({ name: userProfile.name }).unwrap();
    toast.success("مشخصات شما اپدیت شد")
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl md:text-2xl font-bold text-gray-400 mb-4 text-center">ویرایش مشخصات</h2>
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
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            نام و نام خانوادگی
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={userProfile.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
        >
          {isLoading ? <SmallSpinner /> : "ذخیره تغییرات"}
        </button>
      </form>
    </div>
  );
};

export default UpdateInfoPage;
