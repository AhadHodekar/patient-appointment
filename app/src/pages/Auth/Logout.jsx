// src/components/Logout.jsx
import { useDispatch } from "react-redux";
import { clearUser } from "../../store/features/authSlice";
import { patientApi } from "../../store/services/patientApi";
import { useNavigate } from "react-router-dom";
import { clearWalletBalance } from "../../store/features/walletSlice";
import { appointmentApi } from "../../store/services/appointmentApi";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearWalletBalance());
    dispatch(patientApi.util.resetApiState());
    dispatch(appointmentApi.util.resetApiState());
    localStorage.removeItem("accessToken");
    // navigate("/");
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default Logout;
