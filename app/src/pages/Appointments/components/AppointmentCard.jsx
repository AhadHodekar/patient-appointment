import { convertTo12HourFormat } from "../../../utils/dateandtime";
import { Link } from "react-router-dom";

const AppointmentCard = ({ appointment }) => {
  const appointmentDate = new Date(appointment.appointmentSlot);

  const date = appointmentDate.toLocaleDateString();
  const time = convertTo12HourFormat(
    appointmentDate.toTimeString().slice(0, 5),
  );

  // Status color class based on appointment status
  const statusClass =
    appointment.status === "Scheduled"
      ? "text-green-500"
      : appointment.status === "Completed"
        ? "text-blue-500"
        : appointment.status === "Cancelled"
          ? "text-red-500"
          : "text-gray-500";

  return (
    <Link to={`/appointments/${appointment._id}`} className="block">
      <article className="flex justify-start bg-white p-4 rounded-md gap-[5rem] shadow-md hover:shadow-lg transition-shadow duration-300">
        <header className="flex flex-col justify-between mr-6">
          <h2 className="text-xl font-semibold">{appointment.doctor.name}</h2>
          <h3 className="text-lg text-gray-600">
            {appointment.doctor.specialization}
          </h3>
        </header>

        <div className="flex flex-col items-center justify-center mx-4 border-x px-4">
          <p className="text-sm text-gray-500">Appointment On</p>
          <span className="text-lg font-semibold">{date}</span>
          <span className="text-sm text-gray-400">{time}</span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-sm text-gray-500">Status</p>
          <span className={`text-lg font-semibold ${statusClass}`}>
            {appointment.status}
          </span>
        </div>
      </article>
    </Link>
  );
};

export default AppointmentCard;
