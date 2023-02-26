import express from "express";
const router = express.Router();
import {
  cancelAppointment,
  getPatientPreviousAssessments,
  postPatientAssessment,
  registerPatient,
  updatePatientProfile,
} from "../controllers/patientController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/register").post(registerPatient);
router.route("/profile").put(protect, updatePatientProfile);
router.route("/give-assessment").post(protect,postPatientAssessment)
router.route("/previous-assessments").get(protect,getPatientPreviousAssessments)
router.route("/cancel-appointment/:id").delete(protect,cancelAppointment)
export default router;
