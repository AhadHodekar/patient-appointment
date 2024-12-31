import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../store/features/authSlice";
import { useGetPatientQuery } from "../store/services/patientApi";
import { decodeToken } from "../utils/auth";
import { useEffect } from "react";
import { updateWalletBalance } from "../store/features/walletSlice";
import { Link } from "react-router-dom";

const WalletBar = () => {
  const { loggedIn, isAdmin, token } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const decodedToken = decodeToken(token);
  const userId = decodedToken ? decodedToken.userId : null;

  const { data: user, refetch } = useGetPatientQuery(userId, {
    skip: !loggedIn,
  });

  useEffect(() => {
    if (loggedIn && user) {
      dispatch(updateWalletBalance(user.wallet.balance));
    } else {
      refetch;
    }
  }, [loggedIn, user, dispatch]);

  if (loggedIn && !isAdmin) {
    return (
      <div className="flex bg-primary items-center justify-between p-[10px] px-[20px] border-b-0 border-accent">
        <Link to={"/appointments"}>
          <h3 className="text-white underline">My Appointments</h3>
        </Link>
        {user && (
          <h3 className="text-white">
            Balance:{" "}
            <span className="text-yellow-500">₹{user.wallet.balance}</span>
          </h3>
        )}
      </div>
    );
  }

  return null;
};

export default WalletBar;
