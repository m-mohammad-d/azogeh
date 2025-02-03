import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { PiShoppingCartThin } from "react-icons/pi";
import Search from "./Search";
import { useGetMeQuery } from "../services/UsersApi";
import ProfileDropdown from "./ProfileDropdown";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import MobileSidebar from "./MobileSidebar";
import { FaUser } from "react-icons/fa";
import { cn } from "../utils/util";
import Button from "./Button";
import AnimatedHeaderText from "./AnimatedHeaderText";

const navigationLinks = [
  { path: "/about", label: "درباره ما" },
  { path: "/services", label: "سرویس ها" },
  { path: "/contact", label: "تماس با ما" },
];

function Header() {
  const location = useLocation();
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
      <AnimatedHeaderText />
      <div className="mx-auto mt-10 flex max-w-screen-xl items-center justify-between p-4">
        <div className="flex items-center gap-8">
          <Link to="/">
            <img src="/LOGO.webp" alt="Logo" className="h-10" />
          </Link>
        </div>

        {/* Burger Menu Icon */}
        <div className="lg:hidden">
          <Button onClick={toggleSidebar} className="px-2 text-neutral-gray-7 focus:outline-none" size="x-small" variant="tertiary">
            <CiMenuBurger className="text-2xl" />
          </Button>
        </div>

        {/* Full-size navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn("text-neutral-gray-8 transition duration-200 hover:text-primary", location.pathname === link.path && "border-b-2 border-primary text-primary")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Show Search bar only in desktop view */}
        <div className="mx-4 hidden w-full max-w-sm lg:block xl:max-w-lg">
          <Search />
        </div>

        {/* Show Login Button only in desktop view */}
        <div className="hidden gap-4 lg:flex lg:items-center">
          <Link to="/cart" className="relative flex h-10 w-10 items-center justify-center" aria-label="View Cart">
            {cartItemCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{cartItemCount}</span>}
            <PiShoppingCartThin size={30} className="text-neutral-gray-8" strokeWidth={12} />
          </Link>

          {userInfo ? (
            <ProfileDropdown userinfo={userInfo} />
          ) : (
            <Link to="/login" className="flex items-center gap-2 rounded-md bg-primary px-8 py-3 text-white transition duration-500 ease-in-out hover:bg-primary-shade1">
              <FaUser className="h-6 w-6" />
              <span>ورود / ثبت نام</span>
            </Link>
          )}
        </div>
      </div>

      {/* Sidebar for mobile menu */}
      <MobileSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setIsSidebarOpen={setIsSidebarOpen} />
    </header>
  );
}

export default Header;
