import { useState, useRef, useEffect } from "react";
import { FiHeart, FiClock, FiLogOut, FiGrid } from "react-icons/fi";
import { Link } from "react-router-dom";
import { GetMeResponse } from "../types/UserType";
import { useLogoutMutation } from "../services/UsersApi";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { LuUser } from "react-icons/lu";
import { MdLockOutline } from "react-icons/md";

const ProfileDropdown = ({ userinfo }: { userinfo: GetMeResponse }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    await logout().unwrap();
    await toast.success("با موفقیت از اکانت خود خارج شدید");
    location.reload();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
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
      <button ref={buttonRef} className="rounded-lg bg-primary px-5 py-3 text-white transition-all duration-300 hover:bg-primary-shade1 focus:outline-none" onClick={toggleDropdown}>
        {userinfo.data.user.photo ? <img src={userinfo.data.user.photo} alt="user profile" className="h-full w-full rounded-full object-cover" /> : <LuUser size={30} className="text-white" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            className="absolute left-0 top-full z-10 pt-4 drop-shadow-xl transition-all"
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
            <div className="w-[278px] rounded-lg bg-white px-6 py-5">
              <div className="mb-2 flex items-center border-b-2 border-b-neutral-gray-4 pb-5">
                <div className="shrink-0">
                  <img src={userinfo.data.user.photo || `/userLogo.jpg`} alt={userinfo.data.user.name} className="inline-block h-14 w-14 rounded-full object-cover" />
                </div>
                <div className="mr-2.5 flex flex-col gap-y-1 overflow-hidden">
                  <span className="inline-block truncate text-lg text-neutral-gray-8">{userinfo.data.user.name}</span>
                </div>
              </div>
              <Link
                to={userinfo.data.user.role === "admin" ? "/admin/home" : "/user/edit-profile"}
                className="flex h-[46px] items-center justify-between rounded-md px-2.5 text-neutral-gray-8 transition-colors hover:bg-neutral-100/60"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center gap-x-3">
                  <FiGrid  size={23} />
                  پنل کاربری
                </span>
              </Link>
              <Link
                to="/user/change-password"
                className="flex h-[46px] items-center justify-between rounded-md px-2.5 text-neutral-gray-8 transition-colors hover:bg-neutral-100/60"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center gap-x-3">
                  <MdLockOutline  size={23} />
                  تغییر رمز عبور
                </span>
              </Link>
              <Link
                to="/user/favorites"
                className="flex h-[46px] items-center justify-between rounded-md px-2.5 text-neutral-gray-8 transition-colors hover:bg-neutral-100/60"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center gap-x-3">
                  <FiHeart  size={23} />
                  محصولات مورد علاقه
                </span>
              </Link>

              <Link
                to="/user/order-history"
                className="flex h-[46px] items-center justify-between rounded-md px-2.5 text-neutral-gray-8 transition-colors hover:bg-neutral-100/60"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center gap-x-3">
                  <FiClock  size={23} />
                  تاریخچه سفارشات
                </span>
              </Link>
              <div className="mt-2 border-t-2 border-t-neutral-gray-4 pt-2">
                <button onClick={handleLogout} className="flex w-full items-center justify-between rounded-xl px-2md py-2.5 text-neutral-gray-8 transition-colors hover:bg-neutral-100/60">
                  <span className="flex items-center gap-x-3">
                    <FiLogOut  size={23} />
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
