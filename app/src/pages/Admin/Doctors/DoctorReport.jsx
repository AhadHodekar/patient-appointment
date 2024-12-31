import { useEffect, useState } from "react";
import Section from "../../../components/Section";
import { useGetDoctorReportQuery } from "../../../store/services/doctorApi";
import { Link, useParams } from "react-router-dom";
import Button from "../../../components/Button";

const DoctorReport = () => {
  const { doctorId } = useParams();

  const { data, error, isLoading, isSuccess } =
    useGetDoctorReportQuery(doctorId);

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (error) {
      setErrorMessage(
        error.message || "An error occurred while fetching the report",
      );
    }
  }, [error]);

  // Handle loading state
  if (isLoading) {
    return (
      <Section>
        <p>Loading doctor report...</p>
      </Section>
    );
  }

  // Handle error state
  if (errorMessage) {
    return (
      <Section>
        <p>{errorMessage}</p>
      </Section>
    );
  }

  // Handle success state
  if (isSuccess && data) {
    const { doctor, report, walletBalance } = data;

    return (
      <div>
        <Section sectionClass="h-full bg-primary">
          <div className="p-6 bg-white shadow-lg rounded-md">
            <h1 className="text-2xl font-bold mb-4">
              {"Doctor's Financial Report"}
            </h1>

            <div className="mb-4 bg-accent rounded-md p-1">
              <h2 className="text-xl font-semibold">{doctor.name}</h2>
              <p className="text-lg text-gray-600">{doctor.specialization}</p>
            </div>

            <div className="mb-4 bg-accent rounded-md p-1">
              <h3 className="text-lg font-semibold">
                {"Doctor's Financial Overview"}
              </h3>
              <div className="flex justify-between">
                <span>Total Appointments:</span>
                <span>{report.totalAppointments}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Fees Collected:</span>
                <span>₹{report.totalFees}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Discounts:</span>
                <span>{report.totalDiscounts}%</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount Paid:</span>
                <span>₹{report.totalAmountPaid}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Discount Amount:</span>
                <span>₹{report.totalDiscountAmount}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Net Income:</span>
                <span>₹{report.netIncome}</span>
              </div>
            </div>

            <div className="mb-4 bg-accent rounded-md p-1">
              <h3 className="text-lg font-semibold">Wallet Balance</h3>
              <p>Current Wallet Balance: ₹{walletBalance}</p>
            </div>

            <Link to={`/doctor/${doctorId}`}>
              <div className="mt-4">
                <Button buttonClass="w-[150px] bg-primary text-accent">
                  {"View Doctor's Profile"}
                </Button>
              </div>
            </Link>
          </div>
        </Section>
      </div>
    );
  }

  return null;
};

export default DoctorReport;
