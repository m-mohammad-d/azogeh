import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { FaHome, FaInfoCircle, FaServicestack, FaPhoneAlt, FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header>
      <div className="bg-primary-500 w-full h-12"></div>
      <div className="max-w-screen-xl flex justify-between items-center p-4 mx-auto mt-10">
        <div className="flex items-center gap-8">
          <div>
            <img src="/LOGO.png" alt="Logo" className="h-10" />
          </div>
        </div>

        {/* Burger Menu Icon */}
        <div className="lg:hidden">
          <button onClick={toggleSidebar} className="focus:outline-none">
            <CiMenuBurger className="text-2xl" />
          </button>
        </div>

        {/* Full-size navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-primary-500 transition duration-200">
            خونه
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-primary-500 transition duration-200">
            درباره ما
          </Link>
          <Link to="/services" className="text-gray-700 hover:text-primary-500 transition duration-200">
            سرویس ها
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-primary-500 transition duration-200">
            تماس با ما
          </Link>
        </nav>

        {/* Show Search bar only in desktop view */}
        <div className="hidden lg:block">
          <Search />
        </div>

        {/* Show Login Button only in desktop view */}
        <div className="hidden lg:flex lg:items-center gap-4">
          <Link to="/cart">
            <LuShoppingCart size={30} className="text-gray-300" />
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-2 bg-primary-500 px-8 py-3 rounded-lg shadow-lg text-white hover:bg-primary-600 transition duration-200"
          >
            <FaUser className="h-6 w-6" />
            <span>ورود / ثبت نام</span>
          </Link>
        </div>
      </div>

      {/* Sidebar for mobile menu */}
      <div
        className={`fixed top-0 z-50 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">منو</h2>
          <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none">
            <IoMdClose />
          </button>
        </div>

        {/* Sidebar Search Bar */}
        <div className="p-4">
          <Search /> {/* Search bar inside the sidebar */}
        </div>

        <nav className="flex flex-col p-4">
          <Link
            to="/"
            onClick={toggleSidebar}
            className="mb-4 flex items-center gap-2 text-gray-700 hover:text-primary-500 transition duration-200"
          >
            <FaHome className="h-5 w-5" />
            <span>خونه</span>
          </Link>
          <Link
            to="/about"
            onClick={toggleSidebar}
            className="mb-4 flex items-center gap-2 text-gray-700 hover:text-primary-500 transition duration-200"
          >
            <FaInfoCircle className="h-5 w-5" />
            <span>درباره ما</span>
          </Link>
          <Link
            to="/services"
            onClick={toggleSidebar}
            className="mb-4 flex items-center gap-2 text-gray-700 hover:text-primary-500 transition duration-200"
          >
            <FaServicestack className="h-5 w-5" />
            <span>سرویس ها</span>
          </Link>
          <Link
            to="/contact"
            onClick={toggleSidebar}
            className="mb-4 flex items-center gap-2 text-gray-700 hover:text-primary-500 transition duration-200"
          >
            <FaPhoneAlt className="h-5 w-5" />
            <span>تماس با ما</span>
          </Link>
          <Link
            to="/cart"
            onClick={toggleSidebar}
            className="mb-4 flex items-center gap-2 text-gray-700 hover:text-primary-500 transition duration-200"
          >
            <LuShoppingCart size={30} className="text-gray-300" />
            <p>سبد خرید</p>
          </Link>
          {/* Login Button in Sidebar */}
          <Link
            to="/login"
            onClick={toggleSidebar}
            className="flex items-center gap-2 bg-primary-500 px-4 py-3 rounded-lg shadow-lg text-white hover:bg-primary-600 transition duration-200"
          >
            <FaUser className="h-6 w-6" />
            <span>ورود / ثبت نام</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
