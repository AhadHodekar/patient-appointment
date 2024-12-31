import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../store/features/authSlice";
import { useGetPatientQuery } from "../store/services/patientApi";
import { decodeToken } from "../utils/auth";
import { useEffect } from "react";
import { updateWalletBalance } from "../store/features/walletSlice";

const WalletBar = () => {
  const { loggedIn, token } = useSelector(selectAuth);
  const decodedToken = decodeToken(token);
  const userId = decodedToken ? decodedToken.userId : null;

  const { data: user, refetch } = useGetPatientQuery(userId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(updateWalletBalance(user?.wallet.balance));
    }
  }, [user, dispatch]);

  if (loggedIn)
    return (
      <div className="flex bg-primary items-center justify-end p-[10px] border-b-0 border-accent">
        {user && (
          <h3 className="text-white">
            Balance:{" "}
            <span className="text-yellow-500">{user.wallet.balance}$</span>
          </h3>
        )}
      </div>
    );
};

export default WalletBar;
