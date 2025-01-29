import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { FaUsers, FaBox, FaShoppingCart, FaBoxOpen } from "react-icons/fa";
import { MdClose, MdNotifications, MdOutlineDashboard } from "react-icons/md";
import { useGetMeQuery, useLogoutMutation } from "../services/UsersApi";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

function AdminLayout() {
  const { data: userInfo, error, isLoading } = useGetMeQuery({});
  const [Logout] = useLogoutMutation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

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
            <button
              className="rounded-md bg-primary px-4 py-2 text-white transition-colors duration-200 hover:bg-primary"
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
      },
    );
  };

  useEffect(() => {
    if (!isLoading && (!userInfo || userInfo.data.user.role !== "admin")) {
      navigate("/login");
    }
  }, [isLoading, userInfo, navigate]);

  if (isLoading) return <Spinner />;

  if (error) {
    return <p className="text-error-300">خطایی رخ داده است.</p>;
  }

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      <aside
        className={`fixed right-0 top-0 z-50 h-full bg-primary-shade2 text-white transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } flex w-64 flex-col shadow-lg lg:translate-x-0`}
      >
        <div className="border-primary-500 relative border-b p-4 text-center">
          <h1 className="text-2xl font-bold">پنل مدیریت</h1>
          <button className="absolute left-4 top-4 lg:hidden" aria-label="Toggle Sidebar" onClick={toggleSidebar}>
            <MdClose className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="border-primary-500 flex items-center gap-3 border-b p-6">
          <img
            src="https://w7.pngwing.com/pngs/429/434/png-transparent-computer-icons-icon-design-business-administration-admin-icon-hand-monochrome-silhouette.png"
            alt="User Avatar"
            className="border-primary-300 h-12 w-12 rounded-full border shadow-md"
          />
          <span className="text-white">{userInfo?.data.user.name || "کاربر ناشناس"}</span>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 flex-1 overflow-y-auto">
          {[
            { to: "/admin/home", icon: <MdOutlineDashboard className="mr-2 text-lg" />, label: "صفحه اصلی داشبورد" },
            { to: "/admin/manage-users", icon: <FaUsers className="mr-2 text-lg" />, label: "لیست کاربران" },
            { to: "/admin/manage-products", icon: <FaBox className="mr-2 text-lg" />, label: "مدیریت محصولات" },
            { to: "/admin/add-product", icon: <FaBoxOpen className="mr-2 text-lg" />, label: "اضافه کردن محصول" },
            { to: "/admin/manage-orders", icon: <FaShoppingCart className="mr-2 text-lg" />, label: "مدیریت سفارشات" },
            { to: "/admin/notification", icon: <MdNotifications className="mr-2 text-lg" />, label: "اعلانات موجودی" },
          ].map(({ to, icon, label }) => (
            <Link key={to} to={to} className="hover:bg-primary-700 flex items-center gap-3 rounded-md p-4 transition-colors" aria-label={label}>
              {icon}
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="border-primary-500 border-t p-4">
          <button onClick={handleLogOut} className="flex w-full items-center justify-center p-2 text-white transition-colors hover:text-red-500" aria-label="Logout">
            <FiLogOut className="h-5 w-5" />
            <span className="ml-1">خروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300 lg:mr-64">
        <button className="text-primary-600 m-4 block lg:hidden" aria-label="Toggle Sidebar" onClick={toggleSidebar}>
          <FiMenu className="h-6 w-6" />
        </button>
        <main className="flex-1 bg-gray-100 p-6 text-gray-800">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
