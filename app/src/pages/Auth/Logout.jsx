// src/components/Logout.jsx
import { useDispatch } from "react-redux";
import { clearUser } from "../../store/features/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("accessToken");
    // navigate("/");
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default Logout;
