import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";
import UserCard from "../../components/UserCard";
import { useGetAllUserQuery, useDeleteUserMutation } from "../../services/UsersApi"; // اضافه شده

function UserListPage() {
  const { data, isLoading, refetch } = useGetAllUserQuery();
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) return <Spinner />;

  const users = data?.data.users || [];

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
      <div className="grid grid-cols-1 gap-4">
        {users.map(user => (
          <UserCard key={user.id} name={user.name} email={user.email} onBan={() => handleBan(user.id)} />
        ))}
      </div>
    </div>
  );
}

export default UserListPage;
