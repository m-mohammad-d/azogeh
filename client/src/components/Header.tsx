import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
import Search from "./Search";
import { useGetMeQuery } from "../services/UsersApi";
import ProfileDropdown from "./ProfileDropdown";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import MobileSidebar from "./MobileSidebar";
import { FaUser } from "react-icons/fa";

const navigationLinks = [
  { path: "/about", label: "درباره ما" },
  { path: "/services", label: "سرویس ها" },
  { path: "/contact", label: "تماس با ما" },
];

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const { data: userInfo } = useGetMeQuery({});
  const cartItems = useSelector((state: RootState) => state.cart.orderItems);
  const cartItemCount = cartItems.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.qty;
  }, 0);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
          <Link to="/">
            <img src="/LOGO.webp" alt="Logo" className="h-10" />
          </Link>
        </div>

        {/* Burger Menu Icon */}
        <div className="lg:hidden">
          <button onClick={toggleSidebar} className="focus:outline-none">
            <CiMenuBurger className="text-2xl" />
          </button>
        </div>

        {/* Full-size navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navigationLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-700 hover:text-primary-500 transition duration-200"
            >
              {link.label}
            </Link>
          ))}
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
            <LuShoppingCart size={24} className="text-neutral-300" />
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
      <MobileSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </header>
  );
}

export default Header;
