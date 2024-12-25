import express from "express";
import { getDoctor, getDoctors } from "../controllers/doctorController.js";

const router = express.Router();

router.route("/").get(getDoctors);
router.route("/:id").get(getDoctor);

export default router;
