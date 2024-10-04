import { Outlet } from "react-router-dom";

function PrivateRoute() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default PrivateRoute;
