import { StatusCodes } from "http-status-codes";
import DoctorModel from "../models/DoctorModel.js";
import AppointmentModel from "../models/AppointmentModel.js";
import WalletModel from "../models/WalletModel.js";
import mongoose from "mongoose";
import NotFoundError from "../errors/notFoundError.js";

const getDoctors = async (req, res) => {
  const doctors = await DoctorModel.find({});
  res.status(StatusCodes.OK).json(doctors);
};

const getDoctor = async (req, res) => {
  const doctor = await DoctorModel.findById({ _id: req.params.id });
  res.status(StatusCodes.OK).json(doctor);
};

const getDoctorFinancialReport = async (req, res) => {
  const { doctorId } = req.params;

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
    walletBalance: wallet ? wallet.balance : 0, // Wallet balance if exists
  });
};
// const createDoctor = async (req, res) => {
//   const {} = req.body;
//   res.status(StatusCodes.CREATED).json({ msg: "create doctor" });
// };
//
// const updateDoctor = async (req, res) => {
//   res.status(StatusCodes.OK).json({ msg: "update doctor" });
// };
//
// const deleteDoctor = async (req, res) => {
//   res.status(StatusCodes.OK).send();
// };

export {
  getDoctors,
  getDoctor,
  getDoctorFinancialReport,
  // createDoctor,
  // updateDoctor,
  // deleteDoctor
};
