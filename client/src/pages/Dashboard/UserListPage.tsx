import { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";
import UserCard from "../../components/UserCard";
import { useGetAllUserQuery, useDeleteUserMutation } from "../../services/UsersApi";

function UserListPage() {
  const [selectedSort, setSelectedSort] = useState<string>("");
  const { data, isLoading, refetch } = useGetAllUserQuery({ sort: selectedSort });
  const [deleteUser] = useDeleteUserMutation();
  if (isLoading) return <Spinner />;

  const users = data?.data.users || [];

  const handleSortClick = (sortOption: string) => {
    setSelectedSort(sortOption);
  };

  const handleBan = async (userId: string) => {
    try {
      await deleteUser(userId).unwrap();
      toast.success(`کاربر ${userId} با موفقیت بن شد `);
      refetch();
    } catch (error) {
      toast.error("خطا در مسدود کردن کاربر");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">لیست کاربران</h1>

      {/* Desktop Sorting Buttons */}
      <div className="hidden lg:flex lg:gap-4 mb-6">
        <button
          className={`text-gray-300 hover:text-primary-400 ${
            selectedSort === "-name" ? "font-bold border-b border-primary-700 text-primary-500" : ""
          }`}
          onClick={() => handleSortClick("-name")}
        >
          نام (نزولی)
        </button>
        <button
          className={`text-gray-300 hover:text-primary-400 ${
            selectedSort === "name" ? "font-bold border-b border-primary-700 text-primary-500" : ""
          }`}
          onClick={() => handleSortClick("name")}
        >
          نام (صعودی)
        </button>
        <button
          className={`text-gray-300 hover:text-primary-400 ${
            selectedSort === "-email" ? "font-bold border-b border-primary-700 text-primary-500" : ""
          }`}
          onClick={() => handleSortClick("-email")}
        >
          ایمیل (نزولی)
        </button>
        <button
          className={`text-gray-300 hover:text-primary-400 ${
            selectedSort === "email" ? "font-bold border-b border-primary-700 text-primary-500" : ""
          }`}
          onClick={() => handleSortClick("email")}
        >
          ایمیل (صعودی)
        </button>
      </div>

      {/* Mobile Sorting Dropdown */}
      <div className="lg:hidden flex items-center gap-4 mb-6">
        <select
          value={selectedSort}
          onChange={e => handleSortClick(e.target.value)}
          className="w-full rounded-lg p-3 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-500 transition duration-200"
        >
          <option value="">مرتب‌سازی</option>
          <option value="-name">نام (نزولی)</option>
          <option value="name">نام (صعودی)</option>
          <option value="-email">ایمیل (نزولی)</option>
          <option value="email">ایمیل (صعودی)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {users.map(user => (
          <UserCard key={user.id} name={user.name} email={user.email} onBan={() => handleBan(user.id)} />
        ))}
      </div>
    </div>
  );
}

export default UserListPage;
