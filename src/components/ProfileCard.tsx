import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHistory } from "react-icons/ai";
import { TbUserEdit } from "react-icons/tb";
import { MdFavoriteBorder, MdOutlineLogout, MdLockOutline } from "react-icons/md";
import { toast } from "react-hot-toast";
import { GetMeResponse } from "../types/UserType";
import { useLogoutMutation, useUpdateInfoMutation } from "../services/UsersApi";
import { BsPlus } from "react-icons/bs";
import { useImageUploader } from "../hooks/useImageUploader";
import SmallSpinner from "./SmallSpinner";
import Button from "./Button";

interface ProfileCardProps {
  userInfo?: GetMeResponse;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userInfo }) => {
  const [updateInfo, { isLoading: isUpdating }] = useUpdateInfoMutation();
  const [Logout] = useLogoutMutation();
  const uploadImageFile = useImageUploader();
  const navigate = useNavigate();

  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(userInfo?.data?.user?.photo || null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const confirmLogOut = async () => {
    await Logout().unwrap();
    toast.success("با موفقیت خارج شدید.");
    navigate("/");
    location.reload();
  };

  const handleLogOut = () => {
    toast.custom(
      (t) => (
        <div className={`mx-auto w-full max-w-md transform rounded-lg bg-white p-6 shadow-lg transition-transform duration-300 ${t.visible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
          <p className="text-lg text-gray-800">آیا مطمئن هستید که می‌خواهید خارج شوید؟</p>
          <div className="mt-6 flex justify-end space-x-4 rtl:space-x-reverse">
            <button className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-300" onClick={() => toast.dismiss(t.id)}>
              انصراف
            </button>
            <Button
              onClick={() => {
                confirmLogOut();
                toast.dismiss(t.id);
              }}
            >
              بله، خارج شو
            </Button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      },
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
    <div className="mx-auto max-w-xs rounded-xl bg-white shadow-md md:max-w-full">
      <div className="flex flex-col items-center py-8">
        <div className="relative">
          {profileImagePreview ? (
            <img src={profileImagePreview} alt="Profile Preview" className="h-24 w-24 rounded-full object-cover" />
          ) : (
            <img src="/userLogo.jpg" alt="Profile" className="h-24 w-24 rounded-full object-cover" />
          )}
          <button
            type="button"
            onClick={() => document.getElementById("profileImage")?.click()}
            className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-400"
          >
            <BsPlus />
          </button>
          <input type="file" id="profileImage" accept="image/*" onChange={handleImageChange} className="hidden" />
        </div>

        {profileImageFile && (
          <button type="button" onClick={handleSaveChanges} disabled={isUpdating} className="mt-2 rounded-full bg-green-500 px-4 py-2 text-white hover:bg-green-400">
            {isUpdating ? <SmallSpinner /> : "ذخیره عکس"}
          </button>
        )}

        <h2 className="mt-4 text-lg font-semibold">{userInfo?.data?.user?.name}</h2>
        <p className="text-gray-500">{userInfo?.data?.user?.email}</p>
      </div>

      <div className="border-t border-gray-200 px-6 py-4">
        <div className="mb-4 flex justify-between text-sm">
          <span>تعداد خرید</span>
          <span>45</span>
        </div>
        <div className="mb-4 flex justify-between text-sm">
          <span>تعداد سفارش‌ها</span>
          <span>70</span>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <ul className="space-y-6 px-6 py-4 text-sm">
          <li className="flex items-center gap-2">
            <Link to="/user/order-history" className="flex items-center gap-2">
              <AiOutlineHistory size={20} />
              <span>تاریخچه سفارشات</span>
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <Link to="/user/edit-profile" className="flex items-center gap-2">
              <TbUserEdit size={20} />
              <span>ویرایش مشخصات</span>
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <Link to="/user/favorites" className="flex items-center gap-2">
              <MdFavoriteBorder size={20} />
              <span>محصولات مورد علاقه</span>
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <Link to="/user/change-password" className="flex items-center gap-2">
              <MdLockOutline size={20} />
              <span>تغییر رمز عبور</span>
            </Link>
          </li>
          <li className="flex cursor-pointer items-center gap-2" onClick={handleLogOut}>
            <MdOutlineLogout size={20} />
            <span>خروج</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
