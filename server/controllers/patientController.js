import { StatusCodes } from "http-status-codes";
import PatientModel from "../models/PatientModel.js";
import NotFoundError from "../errors/notFoundError.js";

// @desc      Get single patient
// @route     GET /api/patients/:id
// @access    Private
const getPatient = async (req, res) => {
  const patient = await PatientModel.findById({ _id: req.params.id })
    .populate("wallet")
    .exec();

  if (!patient) {
    throw new NotFoundError("Patient not found");
  }
  patient.password = undefined;
  res.status(StatusCodes.OK).json(patient);
};

export { getPatient };
