import { useSelector } from "react-redux";
import { useGetDoctorsQuery } from "../../store/services/doctorApi.js";
import DoctorCard from "./components/DoctorCard.jsx";
import { selectAuth } from "../../store/features/authSlice";

const Doctors = () => {
  const { data: doctors, error, isLoading } = useGetDoctorsQuery();
  const { loggedIn } = useSelector(selectAuth);

  if (isLoading) return <>...loading</>;
  if (error) return <h1>{error.data.msg}</h1>;
  {
    doctors && console.log(doctors);
  }
  return (
    <div>
      {loggedIn && <div>Balance: {500}</div>}
      {doctors &&
        doctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
    </div>
  );
};

export default Doctors;
