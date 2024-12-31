import { Link } from "react-router-dom";
import { weekdays, checkDays } from "../../../utils/dateandtime";
import Bullet from "./Bullet";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../store/features/authSlice";
const DoctorCard = (props) => {
  const { doctor } = props;

  const { isAdmin } = useSelector(selectAuth);
  return (
    <Link to={props.link}>
      <div className={`p-4 bg-white rounded-md`}>
        <h2>{doctor.name}</h2>
        <h3>{doctor.specialization}</h3>
        {!isAdmin && (
          <div>
            <h3 className="my-2">Available:</h3>
            <div className="flex gap-2">
              {Object.keys(weekdays).map((key) => {
                const day = weekdays[key];
                const isAvailable = checkDays(day, doctor);
                return (
                  <Bullet
                    bulletClass={`${isAvailable ? "bg-primary text-white" : "bg-accent text-gray-500"} border  text-center w-[50px]`}
                    key={key}
                  >
                    {key}
                  </Bullet>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default DoctorCard;
