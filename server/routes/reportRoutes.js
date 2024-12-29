import express from "express";
import { getDoctorFinancialReport } from "../controllers/doctorController.js";
import { getPatientFinancialReport } from "../controllers/patientController.js";

const router = express.Router();

router.get("/doctor/:doctorId", getDoctorFinancialReport);
router.get("/patient/:patientId", getPatientFinancialReport);

export default router;
