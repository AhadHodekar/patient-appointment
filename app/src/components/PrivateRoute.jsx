import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectAuth } from "../store/features/authSlice";

const PrivateRoute = () => {
  const { loggedIn } = useSelector(selectAuth);
  return loggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
