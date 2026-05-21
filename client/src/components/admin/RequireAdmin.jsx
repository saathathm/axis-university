import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAdmin = () => {
  const token = useSelector((state) => state.auth.accessToken);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default RequireAdmin;