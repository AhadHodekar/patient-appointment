import { useSelector } from "react-redux";
import { useGetDoctorsQuery } from "../../store/services/doctorApi.js";
import { selectAuth } from "../../store/features/authSlice";
import Section from "../../components/Section.jsx";
import DoctorCard from "./components/DoctorCard.jsx";
import WalletBar from "../../components/WalletBar.jsx";

const Doctors = () => {
  const { data: doctors, error, isLoading } = useGetDoctorsQuery();

  if (isLoading) return <>...loading</>;
  if (error) return <h1>{error.data.msg}</h1>;
  return (
    <div className="bg-primary h-full ">
      <WalletBar />
      <Section sectionClass="grid grid-cols-3 gap-4">
        {doctors &&
          doctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
              link={`/doctor/${doctor._id}`}
            />
          ))}
      </Section>
    </div>
  );
};

export default Doctors;
