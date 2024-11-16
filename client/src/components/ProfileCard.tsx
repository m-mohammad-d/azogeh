import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHistory } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { MdFavoriteBorder, MdOutlineLogout, MdLockOutline } from "react-icons/md";
import { clearCredentials } from "../store/AuthSlice";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { GetMeResponse } from "../types/UserType";
import { useLogoutMutation, useUpdateInfoMutation } from "../services/UsersApi";
import { BsPlus } from "react-icons/bs";
import { useImageUploader } from "../hooks/useImageUploader";

interface ProfileCardProps {
  userInfo?: GetMeResponse;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userInfo }) => {
  const dispatch = useDispatch();
  const [updateInfo, { isLoading: isUpdating }] = useUpdateInfoMutation();
  const [Logout] = useLogoutMutation();
  const uploadImageFile = useImageUploader();

  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(userInfo?.data?.user?.photo || null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const confirmLogOut = async () => {
    await Logout().unwrap();
    toast.success("با موفقیت خارج شدید.");
  };

  const handleLogOut = () => {
    toast.custom(
      t => (
        <div
          className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto transform transition-transform duration-300 ${
            t.visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <p className="text-gray-800 text-lg">آیا مطمئن هستید که می‌خواهید خارج شوید؟</p>
          <div className="flex justify-end mt-6 space-x-4 rtl:space-x-reverse">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
              onClick={() => toast.dismiss(t.id)}
            >
              انصراف
            </button>
            <button
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
              onClick={() => {
                confirmLogOut();
                toast.dismiss(t.id);
              }}
            >
              بله، خارج شو
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImageFile(file);
      setProfileImagePreview(URL.createObjectURL(file));
    } else {
      toast.error("فایل انتخابی باید یک تصویر باشد.");
    }
  };

  const handleSaveChanges = async () => {
    if (!profileImageFile) return;

    let imageUrl = profileImagePreview;
    if (profileImageFile) {
      const uploadResponse = await uploadImageFile(profileImageFile);
      if (!uploadResponse) return;
      imageUrl = uploadResponse;
    }

    try {
      await updateInfo({
        name: userInfo?.data?.user?.name,
        photo: imageUrl,
      }).unwrap();
      toast.success("مشخصات شما اپدیت شد");
      setProfileImageFile(null);
    } catch (error) {
      toast.error("مشکلی در بروزرسانی مشخصات پیش آمده است.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md max-w-xs mx-auto md:max-w-full">
      <div className="flex flex-col items-center py-8">
        <div className="relative">
          {profileImagePreview ? (
            <img src={profileImagePreview} alt="Profile Preview" className="w-24 h-24 object-cover rounded-full" />
          ) : (
            <img
              src="https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon.png"
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full"
            />
          )}
          <button
            type="button"
            onClick={() => document.getElementById("profileImage")?.click()}
            className="absolute bottom-0 right-0 bg-blue-500 text-white w-6 h-6 flex items-center justify-center rounded-full hover:bg-blue-400"
          >
            <BsPlus />
          </button>
          <input type="file" id="profileImage" accept="image/*" onChange={handleImageChange} className="hidden" />
        </div>

        {profileImageFile && (
          <button
            type="button"
            onClick={handleSaveChanges}
            disabled={isUpdating}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-400"
          >
            {isUpdating ? "در حال ذخیره..." : "ذخیره عکس"}
          </button>
        )}

        <h2 className="text-lg font-semibold mt-4">{userInfo?.data?.user?.name}</h2>
        <p className="text-gray-500">{userInfo?.data?.user?.email}</p>
      </div>

      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex justify-between text-sm mb-4">
          <span>تعداد خرید</span>
          <span>45</span>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span>تعداد سفارش‌ها</span>
          <span>70</span>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <ul className="py-4 px-6 space-y-6 text-sm">
          <li className="flex gap-2 items-center">
            <Link to="/user/order-history" className="flex gap-2 items-center">
              <AiOutlineHistory size={20} />
              <span>تاریخچه سفارشات</span>
            </Link>
          </li>
          <li className="flex gap-2 items-center">
            <Link to="/user/edit-profile" className="flex gap-2 items-center">
              <FaUserEdit size={20} />
              <span>ویرایش مشخصات</span>
            </Link>
          </li>
          <li className="flex gap-2 items-center">
            <Link to="/user/favorites" className="flex gap-2 items-center">
              <MdFavoriteBorder size={20} />
              <span>محصولات مورد علاقه</span>
            </Link>
          </li>
          <li className="flex gap-2 items-center">
            <Link to="/user/change-password" className="flex gap-2 items-center">
              <MdLockOutline size={20} />
              <span>تغییر رمز عبور</span>
            </Link>
          </li>
          <li className="flex gap-2 items-center cursor-pointer" onClick={handleLogOut}>
            <MdOutlineLogout size={20} />
            <span>خروج</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
