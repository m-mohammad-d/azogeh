import React, { useState, useRef, useEffect } from "react";
import { useGetProductsQuery } from "../services/ApiProduct";
import { Product } from "../types/product";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaServicestack, FaPhoneAlt, FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
import Search from "./Search";
import { useGetMeQuery } from "../services/UsersApi";
import ProfileDropdown from "./ProfileDropdown";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchFullScreen, setIsSearchFullScreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const { data: userInfo } = useGetMeQuery({});
  const cartItems = useSelector((state: RootState) => state.cart.orderItems);
  const cartItemCount = cartItems.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.qty;
  }, 0);

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery(searchTerm.length > 3 ? { search: searchTerm, sort: "default" } : undefined);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSearchFullScreen = () => {
    setIsSearchFullScreen(!isSearchFullScreen);
    if (isSearchFullScreen) setSearchTerm(""); // Reset search term when closing
    setIsSidebarOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Close sidebar and search results if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <div className="max-w-lg w-full mx-4 hidden lg:block">
          <Search />
        </div>

        {/* Show Login Button only in desktop view */}
        <div className="hidden lg:flex lg:items-center gap-4">
          <Link to="/cart" className="relative flex items-center justify-center w-10 h-10" aria-label="View Cart">
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-500 w-5 h-5 flex items-center justify-center text-xs text-white font-bold rounded-full shadow-lg">
                {cartItemCount}
              </span>
            )}
            <LuShoppingCart size={24} className="text-gray-300" />
          </Link>

          {userInfo ? (
            <ProfileDropdown userinfo={userInfo} />
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-primary-500 px-8 py-3 rounded-lg shadow-lg text-white hover:bg-primary-600 transition duration-200"
            >
              <FaUser className="h-6 w-6" />
              <span>ورود / ثبت نام</span>
            </Link>
          )}
        </div>
      </div>

      {/* Sidebar for mobile menu */}
      <div
        className={`fixed top-0 z-50 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
        ref={sidebarRef}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">منو</h2>
          <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none">
            <IoMdClose />
          </button>
        </div>

        {/* Sidebar Search Bar */}
        <div className="p-4">
          <input
            type="text"
            placeholder="جستجو"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={toggleSearchFullScreen}
            className="w-full bg-[#F6F5F5] px-4 py-2 rounded-xl focus:outline-none focus:border-gray-200 focus:ring-gray-300 transition duration-200 ease-in-out"
          />
        </div>

        <nav className="flex flex-col p-4">
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
          {userInfo ? (
            <Link
              to={userInfo.data.user.role === "admin" ? "/admin/home" : "/user/edit-profile"}
              className="flex items-center gap-2 bg-primary-500 px-8 py-3 rounded-lg shadow-lg text-white hover:bg-primary-600 transition duration-200"
            >
              <FaUser className="h-6 w-6" />
              <span>داشبورد</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-primary-500 px-8 py-3 rounded-lg shadow-lg text-white hover:bg-primary-600 transition duration-200"
            >
              <FaUser className="h-6 w-6" />
              <span>ورود / ثبت نام</span>
            </Link>
          )}
        </nav>
      </div>

      {/* Full-screen Search Overlay */}
      {isSearchFullScreen && (
        <div className="fixed h-screen top-0 left-0 right-0 bottom-0 z-50  bg-white flex flex-col p-4">
          <button onClick={toggleSearchFullScreen} className="self-end mb-4 text-gray-500 focus:outline-none">
            <IoMdClose size={24} />
          </button>
          <input
            type="text"
            placeholder="جستجو"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-[#F6F5F5] px-4 py-2 rounded-xl focus:outline-none focus:border-gray-200 focus:ring-gray-300 transition duration-200 ease-in-out mb-4"
          />
          <div ref={searchResultsRef} className="flex-1 p-2">
            {searchTerm.length > 3 && (
              <div className="bg-white">
                {isLoading ? (
                  <p className="text-center">در حال بارگذاری...</p>
                ) : error ? (
                  <p className="text-center text-error-400">خطا در دریافت محصولات</p>
                ) : products?.data?.products?.length ? (
                  <ul>
                    {products.data.products.map((product: Product) => (
                      <li
                        key={product.id}
                        className="flex items-center border-b m-0 border-gray-200 overflow-hidden mb-4 w-full"
                      >
                        <Link to={`/product/${product.id}`} className="flex w-full" onClick={() => setSearchTerm("")}>
                          <img src={`images/${product.image}`} alt={product.name} className="w-16 h-16 object-cover" />
                          <div className="flex-1 p-4 text-right">
                            <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{product.name}</h3>
                            <p className="text-gray-600">{product.price} تومان</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-error-400">محصولی یافت نشد.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
