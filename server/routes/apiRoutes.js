import express from "express";
import authToken from "../middlewares/authToken.js";
import authRoutes from "./authRoutes.js";
import patientRoutes from "./patientRoutes.js";
import doctorRoutes from "./doctorRoutes.js";
import appointmentRoutes from "./appointmentRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/appointments", authToken, appointmentRoutes);
router.use("/patients", authToken, patientRoutes);
router.use("/doctors", authToken, doctorRoutes);

export default router;
