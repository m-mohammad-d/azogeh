import { Navigate, Outlet } from "react-router-dom";
import { useGetMeQuery } from "../services/UsersApi";

function PrivateRoute() {
  const { data: userInfo } = useGetMeQuery({});

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
