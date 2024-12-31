import { useState } from "react";
import Button from "../../../components/Button.jsx"; // Assuming you have a Button component
import "./AppointmentModal.css";

const AppointmentModal = ({ doctor, onClose, onConfirm }) => {
  const [error, setError] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState("");

  const handleConfirm = () => {
    onConfirm(appointmentTime);
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
          <h3 className="border-2 border-primary rounded-md mb-4 text-yellow-500">
            {doctor.specialization}
          </h3>
        </div>
        <h3>Select a time slot:</h3>
        <select
          onChange={(e) => setAppointmentTime(e.target.value)}
          value={appointmentTime}
          className="select-time-slot"
        >
          <option value="">Select a time slot</option>
          {doctor.availability.map((slot, idx) => (
            <option key={idx} value={slot.timeSlot.startTime}>
              {slot.day} - {slot.timeSlot.startTime} to {slot.timeSlot.endTime}
            </option>
          ))}
        </select>
        <div className="modal-actions">
          <Button buttonClass="bg-gray-300" onClick={onClose}>
            Cancel
          </Button>
          <Button
            buttonClass="bg-primary text-white"
            onClick={handleConfirm}
            disabled={!appointmentTime}
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
