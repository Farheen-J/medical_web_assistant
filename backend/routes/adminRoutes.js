import express from 'express'
import { deleteUser, getDoctorList, getNurseList, getPatientList, getReport } from '../controllers/adminController.js'
import { protect,admin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/patient-list').get(protect,admin,getPatientList)
router.route('/report').get(protect,admin,getReport)
router.route('/nurse-list').get(protect,admin,getNurseList)
router.route('/doctor-list').get(protect,admin,getDoctorList)
router.route('/delete-user/:id').delete(protect,admin,deleteUser)

export default router