import express from "express";
import {
  patientRegister,
  adminLogin,
  patientLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", patientRegister);
router.post("/login", patientLogin);
router.post("/admin-login", adminLogin);

export default router;
