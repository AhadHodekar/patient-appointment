import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectAuth } from "../store/features/authSlice";

const AdminPrivateRoute = () => {
  const { loggedIn, isAdmin } = useSelector(selectAuth);
  return loggedIn && isAdmin ? <Outlet /> : <Navigate to={"/admin/login"} />;
};

export default AdminPrivateRoute;
