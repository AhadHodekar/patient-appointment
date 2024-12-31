import { useSelector } from "react-redux";
import { useGetDoctorsQuery } from "../../store/services/doctorApi.js";
import { selectAuth } from "../../store/features/authSlice";
import Section from "../../components/Section.jsx";
import DoctorCard from "./components/DoctorCard.jsx";
import WalletBar from "../../components/WalletBar.jsx";

const Doctors = () => {
  const { loggedIn } = useSelector(selectAuth);
  const { data: doctors, error, isLoading } = useGetDoctorsQuery();

  if (isLoading) return <>...loading</>;
  if (error) return <h1>{error.data.msg}</h1>;
  {
    doctors && console.log(doctors);
  }
  return (
    <div className="bg-primary">
      <WalletBar />
      <Section sectionClass="grid grid-cols-3 gap-4">
        {doctors &&
          doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
      </Section>
    </div>
  );
};

export default Doctors;
