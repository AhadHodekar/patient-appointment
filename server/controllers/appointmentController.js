import { StatusCodes } from "http-status-codes";
import { applyAppointmentDiscount } from "../utils/discounts.js";
import AppoinmentModel from "../models/AppointmentModel.js";
import DoctorModel from "../models/DoctorModel.js";
import BadRequestError from "../errors/badRequestError.js";
import AppointmentModel from "../models/AppointmentModel.js";
import WalletModel from "../models/WalletModel.js";
import PatientModel from "../models/PatientModel.js";

const getAppointments = async (req, res) => {
  const patient = await PatientModel.findById({ _id: req.user.userId });
  if (!patient) {
    throw new BadRequestError("No appointments scheduled");
  }
  const appointments = await AppoinmentModel.find({
    patientId: req.user.userId,
  });
  if (!appointments) {
    throw new BadRequestError("No appointments scheduled");
  }
  res.status(StatusCodes.OK).json({ appointments });
};

const getAppointment = async (req, res) => {
  const patient = await PatientModel.findById({ _id: req.user.userId });
  if (!patient) {
    throw new BadRequestError("Appointment not found");
  }
  const appointment = await AppoinmentModel.findById({ _id: req.params.id });
  if (!appointment) {
    throw new BadRequestError("Appointment not found");
  }
  res.status(StatusCodes.OK).json({ appointment });
};

const createAppointment = async (req, res) => {
  const discountPercent = process.env.FIRSTAPPOINTMENTDISCOUNT || 0;
  const { doctorId } = req.body;

  const doctor = await DoctorModel.findById({ _id: doctorId });
  if (!doctor) {
    throw new BadRequestError("bad request");
  }
  const { fee } = doctor;

  const appointmentInstance = new AppointmentModel({
    doctorId,
    patientId: req.user.userId,
  });

  const discountApplied = await appointmentInstance.discountCheck();

  const totalFee = applyAppointmentDiscount(
    fee,
    discountApplied,
    discountPercent,
  );

  const patientWallet = await WalletModel.findOne({
    patientId: req.user.userId,
  });

  if (!patientWallet) {
    throw new BadRequestError("Wallet not found");
  }

  const doctorWallet = await WalletModel.findOne({
    doctorId: doctorId,
  });

  if (!doctorWallet) {
    throw new BadRequestError("Wallet not found");
  }

  await patientWallet.deductAmount(totalFee);

  await doctorWallet.creditAmount(totalFee);

  const appointment = await AppoinmentModel.create({
    doctorId,
    patientId: req.user.userId,
    discountApplied,
    discountPercent: discountApplied ? discountPercent : 0,
    fee,
    totalFee,
    amountPaid: totalFee,
    appointmentDate: Date.now(),
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "appointment created", appointment });
};

const updateAppointment = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "update appointment" });
};

const deleteAppointment = async (req, res) => {
  res.status(StatusCodes.OK).send();
};

export {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
