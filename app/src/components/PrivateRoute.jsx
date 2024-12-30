import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectAuth } from "../store/features/authSlice";

const PrivateRoute = () => {
  const { loggedIn } = useSelector(selectAuth);
  // if (!token.checkingStatus) {
  //   return <>Loading...</>;
  // }
  return loggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
