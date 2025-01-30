import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaServicestack, FaPhoneAlt, FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { useGetMeQuery } from "../services/UsersApi";
import MobileSearch from "./MobileSearchBar";

interface MobileSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setIsSidebarOpen: (value: boolean) => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, toggleSidebar, searchTerm, setSearchTerm, setIsSidebarOpen }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isSearchFullScreen, setIsSearchFullScreen] = useState(false);

  const { data: userInfo } = useGetMeQuery({});
  const toggleSearchFullScreen = () => {
    setIsSearchFullScreen(!isSearchFullScreen);
    if (isSearchFullScreen) setSearchTerm("");
    setIsSidebarOpen(false);
  };
  return (
    <>
      <div className={`fixed left-0 top-0 z-50 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`} ref={sidebarRef}>
        <div className="mt-6 p-2">
          <button onClick={toggleSidebar} className="text-neutral-gray-7 focus:outline-none">
            <IoMdClose size={25} />
          </button>
        </div>

        {/* Sidebar Search Bar */}
        <div className="p-2">
          <input
            type="text"
            placeholder="جستجو"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={toggleSearchFullScreen}
            className="w-full rounded-md bg-[#F6F5F5] px-4 py-2 transition duration-200 ease-in-out focus:border-gray-200 focus:outline-none focus:ring-gray-300"
          />
        </div>

        <nav className="flex flex-col p-4">
          <Link to="/about" onClick={toggleSidebar} className="hover:text-primary-500 mb-4 flex items-center gap-2 text-gray-700 transition duration-200">
            <FaInfoCircle className="h-5 w-5 text-primary" />
            <span>درباره ما</span>
          </Link>
          <Link to="/services" onClick={toggleSidebar} className="hover:text-primary-500 mb-4 flex items-center gap-2 text-gray-700 transition duration-200">
            <FaServicestack className="h-5 w-5 text-primary" />
            <span>سرویس ها</span>
          </Link>
          <Link to="/contact" onClick={toggleSidebar} className="hover:text-primary-500 mb-4 flex items-center gap-2 text-gray-700 transition duration-200">
            <FaPhoneAlt className="h-5 w-5 text-primary" />
            <span>تماس با ما</span>
          </Link>
          <Link to="/cart" onClick={toggleSidebar} className="hover:text-primary-500 mb-4 flex items-center gap-2 text-gray-700 transition duration-200">
            <LuShoppingCart className="h-5 w-5 text-primary" />
            <p>سبد خرید</p>
          </Link>
          {/* Login Button in Sidebar */}
          {userInfo ? (
            <Link
              to={userInfo.data.user.role === "admin" ? "/admin/home" : "/user/edit-profile"}
              className="flex items-center gap-2 rounded-md bg-primary px-8 py-3 text-white shadow-md transition duration-200 hover:bg-primary-shade1"
            >
              <FaUser className="h-6 w-6" />
              <span>داشبورد</span>
            </Link>
          ) : (
            <Link to="/login" className="flex items-center gap-2 rounded-md bg-primary px-8 py-3 text-white shadow-md transition duration-200 hover:bg-primary-shade1">
              <FaUser className="h-6 w-6" />
              <span>ورود / ثبت نام</span>
            </Link>
          )}
        </nav>
      </div>
      <MobileSearch isSearchFullScreen={isSearchFullScreen} toggleSearchFullScreen={toggleSearchFullScreen} />
    </>
  );
};

export default MobileSidebar;
