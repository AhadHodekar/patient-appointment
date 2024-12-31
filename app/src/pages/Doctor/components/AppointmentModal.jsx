import { useState } from "react";
import Button from "../../../components/Button.jsx";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AppointmentModal.css";
import { convertTo24HourTime } from "../../../utils/dateandtime.js";
import { discountCalculator } from "../../../utils/discountCalculator.js";

const AppointmentModal = ({
  doctor,
  onClose,
  onConfirm,
  discount,
  isApplicable,
}) => {
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState("");

  const isDateAvailable = (date) => {
    const dayOfWeek = date.getDay();
    return doctor.availability.some(
      (slot) => slot.day === getDayName(dayOfWeek),
    );
  };

  const getDayName = (dayOfWeek) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[dayOfWeek];
  };

  const handleConfirm = () => {
    if (!appointmentDate || !appointmentTime) return;

    const formattedDate = appointmentDate.toISOString().split("T")[0];

    const formattedTime = convertTo24HourTime(appointmentTime);
    const appointmentDateTime = `${formattedDate}T${formattedTime}.000Z`;

    onConfirm(appointmentDateTime);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content bg-accent">
        <div className="bg-primary rounded-md mb-1">
          <h2>
            Book Appointment with{" "}
            <span className="text-white">{doctor.name}</span>
          </h2>
          <h3 className="border- bg-primary rounded-md mb-1 text-yellow-500">
            {doctor.specialization}
          </h3>
        </div>
        <p className="font-semibold bg-primary rounded-md mb-4 text-white">
          Appointment Fee:{" "}
          <span className="text-yellow-500">
            ₹
            {isApplicable
              ? discountCalculator(discount, doctor.fee)
              : doctor.fee}
          </span>
        </p>

        <h3 className="mb-2">Select a date:</h3>
        <ReactDatePicker
          selected={appointmentDate}
          onChange={(date) => setAppointmentDate(date)}
          filterDate={isDateAvailable}
          minDate={new Date()}
          placeholderText="Select a date"
        />

        {appointmentDate && (
          <div className="flex flex-col gap-4 mt-4">
            <h3>Select a time slot:</h3>
            <select
              onChange={(e) => setAppointmentTime(e.target.value)}
              value={appointmentTime}
              className="select-time-slot"
            >
              <option value="">Select a time slot</option>
              {doctor.availability
                .filter(
                  (slot) => slot.day === getDayName(appointmentDate.getDay()),
                )
                .map((slot, idx) => (
                  <option key={idx} value={slot.timeSlot.startTime}>
                    {slot.day} - {slot.timeSlot.startTime} to{" "}
                    {slot.timeSlot.endTime}
                  </option>
                ))}
            </select>
          </div>
        )}

        <div className="modal-actions">
          <Button buttonClass="bg-gray-300" onClick={onClose}>
            Cancel
          </Button>
          <Button
            buttonClass="bg-primary text-white"
            onClick={handleConfirm}
            disabled={!appointmentDate || !appointmentTime}
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
