import express from "express";
import {
  getDoctorFinancialReport,
  getPatientFinancialReport,
} from "../controllers/reportController.js";
import { getAllAppointments } from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/doctor/:id", getDoctorFinancialReport);
router.get("/patient/:id", getPatientFinancialReport);
router.get("/appointments", getAllAppointments);

export default router;
