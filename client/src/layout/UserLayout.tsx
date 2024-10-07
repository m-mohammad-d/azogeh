import { Outlet } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";

function UserLayout() {
  return (
    <div className="max-w-screen-xl mx-auto  min-h-screen mt-16">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4">
          <ProfileCard />
        </div>
        <div className="w-full md:w-3/4 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
