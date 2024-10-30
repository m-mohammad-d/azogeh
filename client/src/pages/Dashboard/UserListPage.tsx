import Spinner from "../../components/Spinner";
import UserCard from "../../components/UserCard";
import { useGetAllUserQuery } from "../../services/UsersApi";

function UserListPage() {
  const { data, isLoading } = useGetAllUserQuery();

  if (isLoading) return <Spinner />;

  const users = data?.data.users || [];

  const handleBan = (userId: string) => {
    console.log(userId);
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
