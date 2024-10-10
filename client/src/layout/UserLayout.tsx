import { Outlet } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";

function UserLayout() {
  return (
    <div className="max-w-screen-xl mx-auto min-h-screen mt-8 md:mt-16 px-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4">
          <ProfileCard />
        </div>
        <div className="w-full md:w-3/4 p-4 bg-white rounded-xl shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
