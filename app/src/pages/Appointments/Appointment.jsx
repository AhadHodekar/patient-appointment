import Section from "../../components/Section";
import { useGetAppointmentQuery } from "../../store/services/appointmentApi";
import { Link, useParams } from "react-router-dom";
import { convertTo12HourFormat } from "../../utils/dateandtime";
import Button from "../../components/Button";
import WalletBar from "../../components/WalletBar";

const Appointment = () => {
  const { appointmentId } = useParams();
  const {
    data: appointment,
    error,
    isLoading,
  } = useGetAppointmentQuery(appointmentId);

  // Check if the appointment data is being loaded or if there's an error
  if (isLoading) {
    return (
      <Section>
        <p>Loading appointment details...</p>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <p>There was an error loading the appointment details.</p>
      </Section>
    );
  }

  // Extract the necessary fields from the appointment data
  const {
    doctorId,
    doctor,
    appointmentSlot,
    discountApplied,
    fee,
    totalFee,
    discountPercent,
    status,
  } = appointment;

  // Convert the appointment time to 12-hour format
  const appointmentDate = new Date(appointmentSlot);
  const date = appointmentDate.toLocaleDateString(); // mm/dd/yyyy format
  const time = convertTo12HourFormat(
    appointmentDate.toTimeString().slice(0, 5),
  ); // 12-hour format time

  return (
    <div className="h-full">
      <WalletBar />
      <Section sectionClass="bg-primary">
        <div className="p-6 bg-white shadow-lg rounded-md">
          <h1 className="text-2xl font-bold mb-4">Appointment Details</h1>

          <div className="mb-4 bg-accent rounded-md p-1">
            <h2 className="text-xl font-semibold">{doctor.name}</h2>
            <p className="text-lg text-gray-600">{doctor.specialization}</p>
          </div>

          <div className="mb-4 bg-accent rounded-md p-1">
            <h3 className="text-lg font-semibold">Appointment Info</h3>
            <p>Appointed Date: {date}</p>
            <p>Appointed Time: {time}</p>
            <p>
              Status:{" "}
              <span
                className={
                  status === "Scheduled" ? "text-green-500" : "text-red-500"
                }
              >
                {status}
              </span>
            </p>
          </div>

          <div className="mb-4 bg-accent rounded-md p-1">
            <h3 className="text-lg font-semibold">Fee Breakdown</h3>
            <div className="flex justify-between">
              <span>Original Fee:</span>
              <span>₹{fee}</span>
            </div>
            {discountApplied && (
              <div className="flex justify-between">
                <span>Discount Applied ({discountPercent}%):</span>
                <span>-₹{(fee * discountPercent) / 100}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold">
              <span>Total Fee:</span>
              <span>₹{totalFee}</span>
            </div>
          </div>

          <div className="mb-4 bg-accent rounded-md p-1">
            <h3 className="text-lg font-semibold">Payment Status</h3>
            <p>Amount Paid: ₹{totalFee}</p>
          </div>
          <Link to={`/doctor/${doctorId}`}>
            <div className="mt-4">
              <Button buttonClass="w-[150px]  bg-primary text-accent ">
                {"View Doctor's Profile"}
              </Button>
            </div>
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default Appointment;
