import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Patient from "../Models/patientModel.js";
import moment from "moment"

//@desc get patient profile
//@route GET /api/patients/profile
//@access Protected
const getPatientProfile = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.user._id);
  if (patient) {
    res.json({
      _id: patient._id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      dateOfBirth: patient.dateOfBirth,
      address: patient.address,
      assessments: patient.assessments,
      appointments: patient.appointments,
    });
  } else {
    res.status(401);
    throw new Error("Patient not Found");
  }
});

//@desc Update Patient Profile
//@route PUT /api/patients/profile
//@access Protected
const updatePatientProfile = asyncHandler(async (req, res) => {
  const user = await Patient.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.dateOfBirth = moment(req.body.dateOfBirth).format() || user.dateOfBirth;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      dateOfBirth: updatedUser.dateOfBirth,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      message: true,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("Patient not Found");
  }
});

//@desc register new patient
//@route POST /api/patients/register
//@access Public
const registerPatient = asyncHandler(async (req, res) => {
  let {
    firstName,
    lastName,
    email,
    password,
    phone,
    dateOfBirth,
    address,
  } = req.body;

  const patientExists = email
    ? await Patient.findOne({ email })
    : await Patient.findOne({ phone });

  if (patientExists) {
    res.status(401);
    throw new Error("Patient already exists");
  }

  if (
    email === "" ||
    password === "" ||
    firstName === "" ||
    dateOfBirth === "" ||
    phone === ""
  ) {
    res.status(401);
    throw new Error("Field required");
  }
  dateOfBirth = moment(dateOfBirth).format()
  const patient = await Patient.create({
    firstName,
    lastName,
    email,
    password,
    address,
    phone,
    dateOfBirth,
  });

  if (patient) {
    res.status(201).json({
      _id: patient._id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      email: patient.email,
      phone: patient.phone,
      address: patient.address,
      dateOfBirth: patient.dateOfBirth,
      token: generateToken(patient._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid patient data");
  }
});

//@desc post assessment for the logged in patient
//@route POST /api/patients/give-assessment
//@access Protected
const postPatientAssessment = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.user._id);
  const newAssessmentData = {
    closeContact: req.body.closeContact,
    tested:req.body.tested,
    travelHistory:req.body.travelHistory,
    difficultyBreathing: req.body.difficultyBreathing,
    age: req.body.age,
    symptomsSet1: req.body.symptomsSet1,
    symptomsSet2: req.body.symptomsSet2,
  };
  if (patient) {
    patient.assessments.unshift(newAssessmentData);
    await patient.save();
    res.json({ message: "Assessment Added" });
  }
  else{
    res.status(404)
    throw new Error('Patient not found')
  }
});

//@desc get list of previous assessments of patient
//@route GET /api/patients/previous-assessments
//@access Protected 
const getPatientPreviousAssessments = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.user._id)
  if(patient){
    if(patient.assessments.length!==0){
      res.json(patient.assessments)
    }else{
      res.json([])
    }
  }
  else{
    res.status(404)
    throw new Error('Patient not found')
  }
});

//@desc (delete) cancel scheduled appointment
//@route DELETE /api/patients/cancel-appointment/:id
//@access Protected 
const cancelAppointment = asyncHandler(async (req, res) => {
  const patient = await Patient.findOne({"assessments.appointment._id":req.params.id})
  if(patient){
    if(patient.assessments.length!==0 && patient.assessments[0].appointment[0]){
      patient.assessments[0].appointment = []
      await patient.save()
      res.json({message:'Appointment has been cancelled'})
    }else{
      res.json({message:'No appointments'})
    }
  }
  else{
    res.status(404)
    throw new Error('Patient not found')
  }
});

export {
  getPatientProfile,
  registerPatient,
  postPatientAssessment,
  getPatientPreviousAssessments,
  cancelAppointment,
  updatePatientProfile
};
