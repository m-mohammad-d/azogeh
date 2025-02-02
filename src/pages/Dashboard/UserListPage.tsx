import { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";
import UserCard from "../../components/UserCard";
import { useGetAllUserQuery, useDeleteUserMutation } from "../../services/UsersApi";
import MetaTags from "../../components/MetaTag";

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
      <MetaTags title="لیست کاربران | داشبورد" description="مشاهده و مدیریت کاربران." />

      <h1 className="mb-4 text-center text-2xl font-bold">لیست کاربران</h1>

      {/* Desktop Sorting Buttons */}
      <div className="mb-6 hidden lg:flex lg:gap-4">
        <button
          className={`text-neutral-gray-8 hover:text-primary-tint5 ${selectedSort === "-name" ? "border-b border-primary-shade2 font-bold text-primary" : ""}`}
          onClick={() => handleSortClick("-name")}
        >
          نام (نزولی)
        </button>
        <button
          className={`text-neutral-gray-8 hover:text-primary-tint5 ${selectedSort === "name" ? "border-b border-primary-shade2 font-bold text-primary" : ""}`}
          onClick={() => handleSortClick("name")}
        >
          نام (صعودی)
        </button>
        <button
          className={`text-neutral-gray-8 hover:text-primary-tint5 ${selectedSort === "-email" ? "border-b border-primary-shade2 font-bold text-primary" : ""}`}
          onClick={() => handleSortClick("-email")}
        >
          ایمیل (نزولی)
        </button>
        <button
          className={`text-neutral-gray-8 hover:text-primary-tint5 ${selectedSort === "email" ? "border-b border-primary-shade2 font-bold text-primary" : ""}`}
          onClick={() => handleSortClick("email")}
        >
          ایمیل (صعودی)
        </button>
      </div>

      {/* Mobile Sorting Dropdown */}
      <div className="mb-6 flex items-center gap-4 lg:hidden">
        <select
          value={selectedSort}
          onChange={(e) => handleSortClick(e.target.value)}
          className="focus:ring-primary-400 focus:border-primary-500 w-full rounded-lg border border-gray-300 p-3 text-gray-700 transition duration-200 focus:outline-none focus:ring-2"
        >
          <option value="">مرتب‌سازی</option>
          <option value="-name">نام (نزولی)</option>
          <option value="name">نام (صعودی)</option>
          <option value="-email">ایمیل (نزولی)</option>
          <option value="email">ایمیل (صعودی)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} name={user.name} email={user.email} photo={user.photo} onBan={() => handleBan(user.id)} />
        ))}
      </div>
    </div>
  );
}

export default UserListPage;
