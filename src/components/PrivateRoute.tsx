import { Navigate, Outlet } from "react-router-dom";
import { useGetMeQuery } from "../services/UsersApi";
import Spinner from "./Spinner";

function PrivateRoute() {
  const { data: userInfo, isLoading } = useGetMeQuery({});

  if (isLoading) return <Spinner />;

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
