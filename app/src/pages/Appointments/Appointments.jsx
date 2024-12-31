import Section from "../../components/Section";
import { useGetAppointmentsQuery } from "../../store/services/appointmentApi";
import AppointmentCard from "./components/AppointmentCard";

const Appointments = () => {
  const { data: appointments, error, isLoading } = useGetAppointmentsQuery();
  console.log(appointments);
  if (isLoading) return <>Loading...</>;
  return (
    <Section sectionClass="bg-primary flex flex-col gap-[20px] h-full">
      <h3 className="text-white">Sorted by: Recently Scheduled</h3>
      {appointments && appointments.length > 0 ? (
        appointments.map((appointment) => (
          <AppointmentCard key={appointment._id} appointment={appointment} />
        ))
      ) : (
        <h3>No appointments booked</h3>
      )}
    </Section>
  );
};

export default Appointments;
