import asyncHandler from "express-async-handler";
import Patient from "../Models/patientModel.js";
import Nurse from "../Models/nurseModel.js";
import Doctor from "../Models/doctorModel.js";
import moment from "moment";

//@desc Get list of patients
//@route GET /api/admins/patient-list
//@access Protected admin
const getPatientList = asyncHandler(async (req, res) => {
  const patientList = await Patient.find().select("-password");
  res.json(patientList);
});

//@desc Get list of nurses
//@route GET /api/admins/nurse-list
//@access Protected admin
const getNurseList = asyncHandler(async (req, res) => {
  const nurseList = await Nurse.find().select("-password");
  res.json(nurseList);
});

//@desc Get list of doctors
//@route GET /api/admins/doctor-list
//@access Protected admin
const getDoctorList = asyncHandler(async (req, res) => {
  const doctorList = await Doctor.find().select("-password");
  res.json(doctorList);
});

//@desc delete a user
//@route DELETE /api/admins/delete-user/:id
//@access Protected admin
const deleteUser = asyncHandler(async (req, res) => {
  const user =
    (await Patient.findById(req.params.id)) ||
    (await Nurse.findById(req.params.id)) ||
    (await Doctor.findById(req.params.id));
  if (user) {
    if (user.registrationNum && user.registrationNum.startsWith("N")) {
      const patients = await Patient.find({"assessments.appointment.nurse":req.params.id})
      patients.map((p)=>{
        p.assessments[0].appointment=[]
        p.assessments[0].isReviewed = false
        p.save()
      })
    }
    if (user.registrationNum && user.registrationNum.startsWith("D")) {
      const patients = await Patient.find({"assessments.appointment.doctor":req.params.id})
      patients.map((p)=>{
        p.assessments[0].appointment=[]
        p.assessments[0].isReviewed = false
        p.assessments[0].isForwarded = false
        p.save()
      })
    }
    await user.remove();
    res.json({ success: true });
    
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Get daily, weekly, monthly patient report
//@route GET /api/admins/report
//@access Protected admin
const getReport = asyncHandler(async (req, res) => {
  const from = req.query.from;
  const to = req.query.to;
  const patientCount = await Patient.countDocuments({
    "assessments.createdAt": {
      $gte: moment(from).format("YYYY-MM-DD"),
      $lte: moment(to).format("YYYY-MM-DD"),
    },
  });
  res.json({ count: patientCount });
});
// moment(Date.now()).format("YYYY-MM-DDT23:59:59.999+00:00")
export { getPatientList, getNurseList, getDoctorList, deleteUser, getReport };
