import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  doctor: {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
  },
  appointmentSlot: {
    type: Date,
    required: true,
  },
  discountApplied: {
    type: Boolean,
    default: false,
  },
  fee: {
    type: Number,
    required: true,
  },
  totalFee: {
    type: Number,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  discountPercent: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

appointmentSchema.methods.discountCheck = async function () {
  const appointment = await AppointmentModel.findOne({
    patientId: this.patientId,
    doctorId: this.doctorId,
    status: { $ne: "Cancelled" },
  });
  return !appointment;
};

const AppointmentModel = mongoose.model("Appointment", appointmentSchema);
export default AppointmentModel;
