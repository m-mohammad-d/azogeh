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

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const confirmLogOut = async () => {
    await Logout().unwrap();
    toast.success("با موفقیت خارج شدید.");
    navigate("/");
    location.reload();
  };

  const handleLogOut = () => {
    toast.custom(
      t => (
        <div
          className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto transform transition-transform duration-300 ${
            t.visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <p className="text-gray-800 text-lg">آیا مطمئن هستید که می‌خواهید خارج شوید؟</p>
          <div className="flex justify-end mt-6 space-x-4 rtl:space-x-reverse">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
              onClick={() => toast.dismiss(t.id)}
            >
              انصراف
            </button>
            <button
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
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
      }
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
        className={`fixed top-0 right-0 z-50 h-full bg-primary-600 text-white transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } w-64 lg:translate-x-0 shadow-lg`}
      >
        <div className="p-4 text-center border-b border-primary-500 relative">
          <h1 className="text-2xl font-bold">پنل مدیریت</h1>
          <button className="lg:hidden absolute top-4 left-4" aria-label="Toggle Sidebar" onClick={toggleSidebar}>
            <MdClose className="w-6 h-6 text-white" />
          </button>
        </div>
        <nav className="mt-4">
          {[
            {
              to: "/admin/home",
              icon: <MdOutlineDashboard className="mr-2 text-lg" />,
              label: "صفحه اصلی داشبورد",
            },
            {
              to: "/admin/manage-users",
              icon: <FaUsers className="mr-2 text-lg" />,
              label: "لیست کاربران",
            },
            {
              to: "/admin/manage-products",
              icon: <FaBox className="mr-2 text-lg" />,
              label: "مدیریت محصولات",
            },
            {
              to: "/admin/add-product",
              icon: <FaBoxOpen className="mr-2 text-lg" />,
              label: "اضافه کردن محصول",
            },
            {
              to: "/admin/manage-orders",
              icon: <FaShoppingCart className="mr-2 text-lg" />,
              label: "مدیریت سفارشات",
            },
            {
              to: "/admin/notification",
              icon: <MdNotifications className="mr-2 text-lg" />,
              label: "اعلانات موجودی",
            },
          ].map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center p-4 gap-3 hover:bg-primary-700 transition-colors rounded-md"
              aria-label={label}
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 transition-all duration-300 lg:mr-64">
        <header className="bg-primary-600 p-4 flex items-center justify-between shadow-md text-white">
          <div className="flex items-center space-x-4">
            <button className="lg:hidden block text-white" aria-label="Toggle Sidebar" onClick={toggleSidebar}>
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-4 bg-primary-500 rounded-full p-2 shadow-lg">
              <img
                src="https://w7.pngwing.com/pngs/429/434/png-transparent-computer-icons-icon-design-business-administration-admin-icon-hand-monochrome-silhouette.png"
                alt="User Avatar"
                className="w-10 h-10 rounded-full border border-primary-300 shadow-md"
              />
              <span className="text-white">{userInfo?.data.user.name || "کاربر ناشناس"}</span>
            </div>
            <button
              onClick={handleLogOut}
              className="flex items-center p-2 text-white hover:text-red-500 transition-colors"
              aria-label="Logout"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="ml-1">خروج</span>
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 bg-gray-100 text-gray-800">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
