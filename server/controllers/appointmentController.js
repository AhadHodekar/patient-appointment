import { StatusCodes } from "http-status-codes";
import { applyAppointmentDiscount } from "../utils/discounts.js";
import AppoinmentModel from "../models/AppointmentModel.js";
import DoctorModel from "../models/DoctorModel.js";
import BadRequestError from "../errors/badRequestError.js";
import AppointmentModel from "../models/AppointmentModel.js";
import WalletModel from "../models/WalletModel.js";
import PatientModel from "../models/PatientModel.js";
import NotFoundError from "../errors/notFoundError.js";

// @desc      Get all appointments
// @route     GET /api/reports/appointments
// @access    Private
const getAllAppointments = async (req, res) => {
  const appointments = await AppoinmentModel.find({}).sort({ createdAt: -1 });
  if (!appointments) {
    throw new NotFoundError("No appointments found");
  }
  res.status(StatusCodes.OK).json(appointments);
};

// @desc      Get patient's appointments
// @route     GET /api/appointments
// @access    Private
const getAppointments = async (req, res) => {
  const patient = await PatientModel.findById({ _id: req.user.userId });
  if (!patient) {
    throw new BadRequestError("No appointments scheduled");
  }

  const appointments = await AppoinmentModel.find({
    patientId: req.user.userId,
  }).sort({ createdAt: -1 });
  if (!appointments) {
    throw new NotFoundError("No appointments scheduled");
  }
  res.status(StatusCodes.OK).json(appointments);
};

// @desc      Get single appointment
// @route     GET /api/appointments/:id
// @access    Private
const getAppointment = async (req, res) => {
  const patient = await PatientModel.findById({ _id: req.user.userId });
  if (!patient) {
    throw new BadRequestError("Appointment not found");
  }
  const appointment = await AppoinmentModel.findById({ _id: req.params.id });
  if (!appointment) {
    throw new BadRequestError("Appointment not found");
  }
  res.status(StatusCodes.OK).json(appointment);
};

// @desc      Create single appointment
// @route     POST /api/appointments
// @access    Private
const createAppointment = async (req, res) => {
  const discountPercent = process.env.FIRSTAPPOINTMENTDISCOUNT || 0;
  const { doctorId, appointmentSlot } = req.body;

  const doctor = await DoctorModel.findById({ _id: doctorId });
  if (!doctor) {
    throw new BadRequestError("bad request");
  }
  const { fee, name, specialization } = doctor;

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
    doctor: {
      name,
      specialization,
    },
    appointmentSlot,
    discountApplied,
    discountPercent: discountApplied ? discountPercent : 0,
    fee,
    totalFee,
    amountPaid: totalFee,
    appointmentDate: Date.now(),
  });

  const patient = await PatientModel.findById(req.user.userId);
  if (!patient) {
    throw new BadRequestError("Patient not found");
  }

  patient.appointmentHistory.push(appointment._id);

  if (discountApplied) {
    const existingDiscount = patient.usedDiscounts.find(
      (discount) => discount.doctorId.toString() === doctorId.toString(),
    );
    if (!existingDiscount) {
      patient.usedDiscounts.push({
        doctorId,
        discountPercent,
        discountAmount: totalFee,
      });
    }
  }

  await patient.save();

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "appointment created", appointment });
};

// @desc      Update single appointment
// @route     PUT /api/appointments/:id
// @access    Private
const updateAppointment = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "update appointment" });
};

// @desc      Delete single appointment
// @route     DELETE /api/appointments/:id
// @access    Private
const deleteAppointment = async (req, res) => {
  res.status(StatusCodes.OK).send();
};

export {
  getAllAppointments,
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
