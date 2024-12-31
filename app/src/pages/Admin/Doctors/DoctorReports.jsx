import Section from "../../../components/Section";
import DoctorCard from "../../Doctor/components/DoctorCard";
import { useGetDoctorsQuery } from "../../../store/services/doctorApi";
const DoctorReports = () => {
  const { data: doctors, error, isLoading } = useGetDoctorsQuery();

  if (isLoading) return <>...loading</>;
  if (error) return <h1>{error.data.msg}</h1>;
  return (
    <div className="bg-primary h-full ">
      <Section sectionClass="grid grid-cols-3 gap-4">
        {doctors &&
          doctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
              link={`${doctor._id}`}
            />
          ))}
      </Section>
    </div>
  );
};

export default DoctorReports;
