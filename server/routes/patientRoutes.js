import express from "express";
import { getPatient } from "../controllers/patientController.js";

const router = express.Router();

router.route("/:id").get(getPatient);

export default router;
