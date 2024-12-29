import { StatusCodes } from "http-status-codes";
import PatientModel from "../models/PatientModel.js";
import { UnauthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
  const patient = await PatientModel.create({ ...req.body });

  const token = patient.createJWT();

  res.status(StatusCodes.CREATED).json({
    msg: "registration successful",
    user: { name: patient.name },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const patient = await PatientModel.findOne({ email });

  if (!patient) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const verifyPassword = await patient.comparePasswords(password);

  if (!verifyPassword) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = patient.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ msg: "log in successful", user: { name: patient.name }, token });
};

export { register, login };
