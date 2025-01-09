import mongoose from "mongoose";
import AppointmentModel from "../models/AppointmentModel.js";
import DoctorModel from "../models/DoctorModel.js";
import PatientModel from "../models/PatientModel.js";
import WalletModel from "../models/WalletModel.js";
import { StatusCodes } from "http-status-codes";

// @desc      Get doctor report
// @route     GET /api/reports/doctor/:id
// @access    Private
const getDoctorFinancialReport = async (req, res) => {
  const { id: doctorId } = req.params;

  const doctorIdObjectId = new mongoose.Types.ObjectId(doctorId);

  const doctor = await DoctorModel.findById(doctorIdObjectId);
  if (!doctor) {
    throw new NotFoundError("Doctor not found");
  }

  const appointments = await AppointmentModel.aggregate([
    {
      $match: {
        doctorId: doctorIdObjectId,
        status: { $ne: "Cancelled" }, // Exclude cancelled appointments
      },
    },
    {
      $group: {
        _id: "$doctorId",
        totalAppointments: { $sum: 1 },
        totalFees: { $sum: "$fee" },
        totalAmountPaid: { $sum: "$amountPaid" },
        totalDiscountAmount: {
          $sum: {
            $multiply: ["$fee", { $divide: ["$discountPercent", 100] }],
          },
        },
        netIncome: { $sum: "$amountPaid" },
        totalDiscounts: {
          $sum: {
            $cond: [{ $gt: ["$discountPercent", 0] }, 1, 0],
          },
        },
        averageDiscountPercent: {
          $avg: "$discountPercent",
        },
      },
    },
  ]);

  if (appointments.length === 0) {
    return res.status(StatusCodes.OK).json({
      msg: "No appointments found for the doctor",
    });
  }

  const report = appointments[0];

  const wallet = await WalletModel.findOne({ doctorId: doctorIdObjectId });

  res.status(StatusCodes.OK).json({
    doctor,
    report: {
      totalAppointments: report.totalAppointments,
      totalFees: report.totalFees,
      totalAmountPaid: report.totalAmountPaid,
      totalDiscountAmount: report.totalDiscountAmount,
      netIncome: report.netIncome,
      totalDiscounts: report.totalDiscounts, // Number of discounts applied
      averageDiscountPercent: report.averageDiscountPercent.toFixed(2), // Average discount percentage
    },
    walletBalance: wallet ? wallet.balance : 0,
  });
};

// @desc      Get patient's report
// @route     GET /api/reports/patient/:id
// @access    Private
const getPatientFinancialReport = async (req, res) => {
  const { id: patientId } = req.params;

  const patientIdObjectId = new mongoose.Types.ObjectId(patientId);

  const patient = await PatientModel.findById(patientIdObjectId);
  if (!patient) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "Patient not found" });
  }
  patient.password = undefined;

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

  if (appointments.length === 0) {
    return res
      .status(StatusCodes.OK)
      .json({ msg: "No appointments found for the patient" });
  }

  const report = appointments[0];

  const wallet = await WalletModel.findOne({ patientId: patientIdObjectId });

  res.status(StatusCodes.OK).json({
    patient,
    report,
    walletBalance: wallet ? wallet.balance : 0,
  });
};
export { getDoctorFinancialReport, getPatientFinancialReport };
