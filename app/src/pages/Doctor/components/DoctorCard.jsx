import { Link } from "react-router-dom";
import { weekdays, checkDays } from "../../../utils/weekdays";
import Bullet from "./Bullet";
const DoctorCard = (props) => {
  const { doctor } = props;
  return (
    <Link to={`/doctor/${doctor._id}`}>
      <div className={`p-4 bg-white rounded-md`}>
        <h2>{doctor.name}</h2>
        <h3>{doctor.specialization}</h3>
        <div>
          <h3 className="my-2">Available:</h3>
          <div className="flex gap-2">
            {Object.keys(weekdays).map((key) => {
              const day = weekdays[key];
              const isAvailable = checkDays(day, doctor);
              return (
                <Bullet
                  bulletClass={`${isAvailable ? "bg-primary" : "bg-accent text-gray-400"} border text-white text-center w-[50px]`}
                  key={key}
                >
                  {key}
                </Bullet>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DoctorCard;
