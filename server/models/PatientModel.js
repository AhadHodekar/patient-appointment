import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  appointmentHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment", // References the Appointment model
    },
  ],
  usedDiscounts: [
    {
      doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor", // References the Doctor model
      },
      discountAmount: {
        type: Number,
        default: 0,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

patientSchema.pre("save", async function (next) {
  this.password = bcrypt.hashSync(this.password, 8);
  next();
});

patientSchema.methods.getId = function () {
  return (this._id = id);
};

patientSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWTLIFETIME },
  );
};

patientSchema.methods.comparePasswords = async function (candidatePassword) {
  const isMatch = bcrypt.compareSync(candidatePassword, this.password);
  return isMatch;
};

const PatientModel = mongoose.model("Patient", patientSchema);
export default PatientModel;
