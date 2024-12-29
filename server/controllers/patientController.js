import { StatusCodes } from "http-status-codes";
import AppointmentModel from "../models/AppointmentModel.js";
import PatientModel from "../models/PatientModel.js";
import WalletModel from "../models/WalletModel.js";
import mongoose from "mongoose";

// Endpoint to get Patient's Financial Report
const getPatientFinancialReport = async (req, res) => {
  const { patientId } = req.params;

  // Create ObjectId instance correctly
  const patientIdObjectId = new mongoose.Types.ObjectId(patientId);

  // Find patient by patientId
  const patient = await PatientModel.findById(patientIdObjectId);
  if (!patient) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "Patient not found" });
  }

  // Fetch appointments for the patient and aggregate relevant data
  const appointments = await AppointmentModel.aggregate([
    { $match: { patientId: patientIdObjectId, status: { $ne: "Cancelled" } } },
    {
      $group: {
        _id: "$patientId",
        totalAppointments: { $sum: 1 },
        totalFees: { $sum: "$fee" },
        totalAmountPaid: { $sum: "$amountPaid" },
        totalDiscounts: { $sum: "$discountPercent" },
        totalDiscountAmount: {
          $sum: { $multiply: ["$fee", { $divide: ["$discountPercent", 99] }] },
        },
      },
    },
  ]);

  // If no appointments are found for the patient
  if (appointments.length === 0) {
    return res
      .status(StatusCodes.OK)
      .json({ msg: "No appointments found for the patient" });
  }

  const report = appointments[0];

  // Fetch wallet balance for the patient
  const wallet = await WalletModel.findOne({ patientId: patientIdObjectId });

  res.status(StatusCodes.OK).json({
    patient,
    report,
    walletBalance: wallet ? wallet.balance : 0,
  });
};

export { getPatientFinancialReport };
