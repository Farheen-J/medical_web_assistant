import express from 'express'
import { updateNurseProfile, registerNurse, getAssessmentsToReview, reviewAssessment, scheduleAppointment, getPatientList, getListOfAppointments, getDoctorList } from '../controllers/nurseController.js'
import { nurseAdmin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/register',registerNurse)
router.route('/profile').put(protect,updateNurseProfile)
router.route("/assessments-for-review").get(protect, nurseAdmin, getAssessmentsToReview)
router.route("/doctor-list").get(protect, nurseAdmin, getDoctorList)
router.route("/patient-list").get(protect, nurseAdmin, getPatientList)
router.route("/review-assessment/:id").post(protect, nurseAdmin, reviewAssessment)
router.route("/schedule-appointment/:id").post(protect, nurseAdmin, scheduleAppointment)
router.route("/appointment-list").get(protect, nurseAdmin, getListOfAppointments)


export default router