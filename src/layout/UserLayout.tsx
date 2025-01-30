import { Outlet } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import { useGetMeQuery } from "../services/UsersApi";
import Spinner from "../components/Spinner";

function UserLayout() {
  const { data: userInfo, error, isLoading } = useGetMeQuery({});

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-center text-red-500">خطا در بارگذاری اطلاعات کاربر.</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto min-h-screen mt-8 md:mt-16 px-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4">
          <ProfileCard userInfo={userInfo} />
        </div>
        <div className="w-full md:w-3/4 p-4 bg-white rounded-xl shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
