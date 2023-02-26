import express from "express";
import {
  getForwardedAssessments,
  getListOfAppointments,
  getPatientList,
  registerDoctor,
  reviewForwardedAssessment,
  scheduleAppointment,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import { doctorAdmin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerDoctor);
router.route("/profile").put(protect, updateDoctorProfile);
router
  .route("/forwarded-assessments")
  .get(protect, doctorAdmin, getForwardedAssessments);
router
  .route("/review-assessments/:id")
  .post(protect, doctorAdmin, reviewForwardedAssessment);
router
  .route("/schedule-appointment/:id")
  .post(protect, doctorAdmin, scheduleAppointment);
router.route("/patient-list").get(protect, doctorAdmin, getPatientList);
router.route("/appointment-list").get(protect, doctorAdmin, getListOfAppointments)
export default router;
