import express from "express";
import {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.route("/").get(getAppointments).post(createAppointment);
router
  .route("/:id")
  .get(getAppointment)
  .put(updateAppointment)
  .delete(deleteAppointment);

export default router;
