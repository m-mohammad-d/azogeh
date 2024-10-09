import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { AiOutlineHistory } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { MdFavoriteBorder, MdOutlineLogout, MdLockOutline } from "react-icons/md";

const ProfileCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md max-w-xs">
      <div className="flex flex-col items-center py-8">
        <img className="w-24 h-24 rounded-full object-cover" src="https://via.placeholder.com/150" alt="Profile" />
        <h2 className="text-lg font-semibold mt-4">نگار زمانی</h2>
        <p className="text-gray-500">xxxxxxx@Yahoo.com</p>
      </div>

      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex justify-between text-sm mb-4">
          <span>تعداد خرید</span>
          <span>45</span>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span>تعداد سفارش ها</span>
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
          <li className="flex gap-2 items-center">
            <Link to="/user/logout" className="flex gap-2 items-center">
              <MdOutlineLogout size={20} />
              <span>خروج</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
