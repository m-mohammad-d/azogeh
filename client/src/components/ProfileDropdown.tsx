import { useState, useRef, useEffect } from "react";
import { FaLock, FaRegUser } from "react-icons/fa";
import { FiHeart, FiClock, FiLogOut, FiGrid } from "react-icons/fi";
import { Link } from "react-router-dom";
import { GetMeResponse } from "../types/UserType";
import { useLogoutMutation } from "../services/UsersApi";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

const ProfileDropdown = ({ userinfo }: { userinfo: GetMeResponse }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleLogout = async () => {
    await logout().unwrap();
    await toast.success("با موفقیت از اکانت خود خارج شدید");
    location.reload();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCloseDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="bg-gray-100 rounded-full p-4 transition-all duration-300 hover:bg-gray-200 focus:outline-none"
        onClick={toggleDropdown}
      >
        <FaRegUser className="text-gray-300" size={20} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            className="absolute left-0 top-full pt-4 z-10 transition-all drop-shadow-xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={() => {
              if (!isOpen) {
                handleCloseDropdown();
              }
            }}
          >
            <div className="w-[278px] bg-white py-5 px-6 rounded-2xl">
              <div className="flex items-center border-b border-b-gray-200 pb-5 mb-2">
                <div className="shrink-0">
                  <img
                    src={userinfo.data.user.photo || `/userLogo.jpg`}
                    alt={userinfo.data.user.name}
                    className="object-cover w-14 h-14 rounded-full inline-block"
                  />
                </div>
                <div className="mr-2.5 flex flex-col gap-y-1 overflow-hidden">
                  <span className="text-lg text-gray-400 inline-block truncate">{userinfo.data.user.name}</span>
                </div>
              </div>
              <Link
                to={userinfo.data.user.role === "admin" ? "/admin/home" : "/user/edit-profile"}
                className="flex items-center justify-between text-gray-400 px-2.5 h-[46px] rounded-xl hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center gap-x-3">
                  <FiGrid className="w-5 h-5" />
                  پنل کاربری
                </span>
              </Link>
              <Link
                to="/user/change-password"
                className="flex items-center justify-between text-zinc-700  px-2.5 h-[46px] rounded-xl hover:bg-gray-100  transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center gap-x-3">
                  <FaLock className="w-5 h-5" />
                  تغییر رمز عبور
                </span>
              </Link>
              <Link
                to="/user/favorites"
                className="flex items-center justify-between text-gray-400 px-2.5 h-[46px] rounded-xl hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center gap-x-3">
                  <FiHeart className="w-5 h-5" />
                  محصولات مورد علاقه
                </span>
              </Link>

              <Link
                to="/user/order-history"
                className="flex items-center justify-between text-gray-400 px-2.5 h-[46px] rounded-xl hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center gap-x-3">
                  <FiClock className="w-5 h-5" />
                  تاریخچه سفارشات
                </span>
              </Link>
              <div className="mt-2 pt-2 border-t border-t-gray-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-between w-full text-gray-400 px-2.5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <span className="flex items-center gap-x-3">
                    <FiLogOut className="w-5 h-5" />
                    خروج
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
