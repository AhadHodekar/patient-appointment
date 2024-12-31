import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../store/features/authSlice";
import { useGetDoctorQuery } from "../../store/services/doctorApi";
import { Link, useParams } from "react-router-dom";
import WalletBar from "../../components/WalletBar";
import Section from "../../components/Section";
import BulletCard from "./components/BulletCard";
import Button from "../../components/Button";
import { firstConsolationDiscount } from "../../utils/constants";
import { discountCalculator } from "../../utils/discountCalculator";
import AppointmentModal from "./components/AppointmentModal";
import {
  useCreateAppointmentMutation,
  useGetAppointmentsQuery,
} from "../../store/services/appointmentApi";
import { useGetPatientQuery } from "../../store/services/patientApi";
import { decodeToken } from "../../utils/auth";
import {
  selectWallet,
  updateWalletBalance,
} from "../../store/features/walletSlice";

const Doctor = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const { loggedIn } = useSelector(selectAuth);
  const { doctorId } = useParams();

  const { isAdmin, token } = useSelector(selectAuth);
  const decodedToken = decodeToken(token);
  const userId = decodedToken ? decodedToken.userId : null;

  const { data: doctor, isLoading } = useGetDoctorQuery(doctorId);

  const { data: patient, refetch: refetchPatient } = useGetPatientQuery(userId);
  const { data: appointments, refetch: refetchAppointments } =
    useGetAppointmentsQuery();

  const [appoint] = useCreateAppointmentMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const balance = useSelector(selectWallet);
  const disabled = balance < doctor?.fee ? true : false;

  const isApplicable = patient
    ? !patient.usedDiscounts.some(
        (discount) => discount.doctorId.toString() === doctorId,
      )
    : false;

  if (isLoading) return <>...loading</>;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmBooking = async (appointmentSlot) => {
    try {
      const response = await appoint({ doctorId, appointmentSlot });
      if (response.error) {
        setError(response.error.data.msg);
        return;
      }
      refetchPatient();
      refetchAppointments();
      if (patient) {
        dispatch(updateWalletBalance(patient.wallet.balance));
      }
      console.log(`Booking confirmed`);
    } catch (error) {
      console.error("Error confirming booking:", error);
    }
  };

  if (doctor) {
    return (
      <div className="h-full">
        <WalletBar />
        <Section sectionClass="absolute flex flex-col gap-[15px]">
          {isAdmin && (
            <Link
              className="relative top-0 left-0"
              to={"/admin/reports/doctors"}
            >
              <Button buttonClass="bg-accent text-primary">
                {"< Doctors"}
              </Button>
            </Link>
          )}
          <h1>{doctor.name}</h1>
          <h2>{doctor.specialization}</h2>
          <div className="w-[700px]">
            <p>{doctor.description}</p>
          </div>
          <div className="flex  flex-col gap-[15px]">
            <h2>Available On:</h2>

            <div className="flex gap-[30px]">
              {doctor.availability.map((slot, idx) => (
                <BulletCard key={idx + 1} slot={slot} />
              ))}
            </div>
          </div>
          {isApplicable && (
            <div className="bg-primary text-accent rounded-md p-2">
              <h3>
                Discount Applicable:{" "}
                <span className="text-yellow-500">
                  {firstConsolationDiscount}%
                </span>
              </h3>
            </div>
          )}
          <div className="flex items-center gap-2 ">
            {!isAdmin &&
              (!loggedIn ? (
                <Link to="/login">
                  <Button buttonClass="border-2 border-primary text-primary">
                    Book Now
                  </Button>
                </Link>
              ) : (
                <button
                  className={`font-bold p-[5px] w-[120px] rounded-md  ${
                    disabled
                      ? "border-2 border-red-300 text-gray-500 bg-gray-200"
                      : "text-primary border-2 border-primary"
                  }`}
                  onClick={handleOpenModal}
                  disabled={disabled}
                >
                  {disabled ? "Insufficient Balance" : "Book Now"}
                </button>
              ))}

            {!isAdmin && !disabled && isApplicable && (
              <span className="font-bold">
                <span className="text-[18px]">For </span>
                <span className="text-gray-500 line-through">
                  ₹{doctor.fee}
                </span>
                <span className="px-1 text-[20px] text-primary">
                  ₹{discountCalculator(firstConsolationDiscount, doctor.fee)}
                </span>
              </span>
            )}
          </div>
        </Section>
        {isModalOpen && (
          <AppointmentModal
            doctor={doctor}
            discount={firstConsolationDiscount}
            isApplicable={isApplicable}
            onClose={handleCloseModal}
            onConfirm={handleConfirmBooking}
            error={error}
          />
        )}
      </div>
    );
  }
};

export default Doctor;
