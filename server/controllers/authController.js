import { StatusCodes } from "http-status-codes";
import PatientModel from "../models/PatientModel.js";
import { NotFoundError, UnauthenticatedError } from "../errors/index.js";
import AdminModel from "../models/AdminModel.js";

// Helper function to handle registration
const handleRegister = async (
  req,
  res,
  model,
  isAdmin = false,
  isDoctor = false,
) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("All fields are required");
  }
  const user = await model.create({ ...req.body });

  const token = await user.createJWT();

  let role = isAdmin ? "Admin" : isDoctor ? "Doctor" : "Patient";

  res.status(StatusCodes.OK).json({
    msg: `${role} registration successful`,
    user: { user: user.name, isAdmin },
    isAdmin,
    token,
  });
};

// Helper function to handle login
const handleLogin = async (
  req,
  res,
  model,
  isAdmin = false,
  isDoctor = false,
) => {
  let role = isAdmin ? "Admin" : isDoctor ? "Doctor" : "Patient";
  const { email, password } = req.body;
  const user = await model.findOne({ email });
  if (!user) {
    throw new NotFoundError(`${role} doesn't exist`);
  }

  const verifyPassword = await user.comparePasswords(password);
  if (!verifyPassword) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    msg: `${role} login successful`,
    user: { name: user.name, isAdmin },
    isAdmin,
    token,
  });
};

// @desc      Register a patient
// @route     POST /api/auth/register
// @access    Public
const patientRegister = async (req, res) => {
  await handleRegister(req, res, PatientModel);
};

// @desc      Log in a patient
// @route     POST /api/auth/login
// @access    Public
const patientLogin = async (req, res) => {
  await handleLogin(req, res, PatientModel);
};

// @desc      Register an admin
// @route     POST /api/auth/admin-register
// @access    Private
const adminRegister = async (req, res) => {
  await handleRegister(req, res, AdminModel, true);
};

// @desc      Log in an admin
// @route     POST /api/auth/admin-login
// @access    Public
const adminLogin = async (req, res) => {
  await handleLogin(req, res, AdminModel, true);
};

export { patientRegister, patientLogin, adminRegister, adminLogin };
