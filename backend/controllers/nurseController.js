import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Nurse from "../Models/nurseModel.js";
import Doctor from "../Models/doctorModel.js";
import Patient from "../Models/patientModel.js";
import moment from "moment";

//@desc get nurse profile
//@route GET /api/nurses/profile
//@access Protected
const getNurseProfile = asyncHandler(async (req, res) => {
  const nurse = await Nurse.findById(req.user._id);
  if (nurse) {
    res.json({
      _id: nurse._id,
      firstName: nurse.firstName,
      lastName: nurse.lastName,
      dateOfBirth: nurse.dateOfBirth,
      address: nurse.address,
      registrationNum: nurse.registrationNum,
      appointments: nurse.appointments,
    });
  } else {
    res.status(401);
    throw new Error("Nurse not Found");
  }
});

//@desc Update Nurse Profile
//@route PUT /api/nurses/profile
//@access Protected
const updateNurseProfile = asyncHandler(async (req, res) => {
  const user = await Nurse.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.dateOfBirth =
      moment(req.body.dateOfBirth).format() || user.dateOfBirth;
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
    throw new Error("Nurse not Found");
  }
});

//@desc register new Nurse
//@route POST /api/nurses/register
//@access Public
const registerNurse = asyncHandler(async (req, res) => {
  let {
    firstName,
    lastName,
    email,
    password,
    phone,
    dateOfBirth,
    address,
    registrationNum,
  } = req.body;

  const nurseExists = email
    ? await Nurse.findOne({ email })
    : await Nurse.findOne({ phone });

  if (nurseExists) {
    res.status(401);
    throw new Error("Nurse already exists");
  }

  if (
    email === "" ||
    password === "" ||
    firstName === "" ||
    dateOfBirth === "" ||
    phone === "" ||
    registrationNum === ""
  ) {
    res.status(401);
    throw new Error("Field required");
  }
  dateOfBirth = moment(dateOfBirth).format();
  const nurse = await Nurse.create({
    firstName,
    lastName,
    email,
    password,
    address,
    phone,
    dateOfBirth,
    registrationNum,
  });

  if (nurse) {
    res.status(201).json({
      _id: nurse._id,
      firstName: nurse.firstName,
      lastName: nurse.lastName,
      email: nurse.email,
      phone: nurse.phone,
      address: nurse.address,
      dateOfBirth: nurse.dateOfBirth,
      registrationNum: nurse.registrationNum,
      token: generateToken(nurse._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid nurse data");
  }
});

//@desc Get list of patients
//@route GET /api/nurses/patient-list
//@access Protected nurseAdmin
const getPatientList = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const patientList = await Patient.find({ ...keyword }).select("-password");
  res.json(patientList);
});

//@desc get list of patients to review assessments
//@route GET /api/nurses/assessments-for-review
//@access Protected (Nurse or Doctor)
const getAssessmentsToReview = asyncHandler(async (req, res) => {
  const allPatients = await Patient.find().select("-password");
  const patients = allPatients.filter(
    (patient, i) =>
      patient.assessments.length !== 0 &&
      patient.assessments[0].isReviewed === false &&
      patient.assessments[0].isForwarded === false
  );
  if (patients.length !== 0) {
    res.json(
      patients.map((p) => {
        return {
          "._id": p._id,
          name: "" + p.firstName + " " + p.lastName,
          assessment: p.assessments[0],
        };
      })
    );
  } else {
    res.json([]);
  }
});

//@desc Get list of doctors
//@route GET /api/nurses/doctor-list
//@access Protected nurse
const getDoctorList = asyncHandler(async (req, res) => {
  const doctorList = await Doctor.find().select("-password");
  res.json(
    doctorList.map((d) => {
      return {
        _id: d._id,
        name: d.firstName + " " + d.lastName,
      };
    })
  );
});

//@desc review the selected assessment
//@route POST /api/nurses/review-assessments/:id
//@access Protected
const reviewAssessment = asyncHandler(async (req, res) => {
  const patient = await Patient.findOne({ "assessments._id": req.params.id });
  const { isRejected, isForwarded, isReviewed, doctor } = req.body;
  if (patient) {
    const i = patient.assessments.findIndex((x) => x._id == req.params.id);
    patient.assessments[i].isReviewed = isReviewed || false;
    patient.assessments[i].isRejected = isRejected || false;
    patient.assessments[i].isForwarded = isForwarded || false;
    if (doctor !== null) {
      patient.assessments[i].doctor = doctor;
    }
    const reviewedPatient = await patient.save();
    if (reviewedPatient) {
      res.json({
        "patient._id": patient._id,
        patient_name: "" + patient.firstName + " " + patient.lastName,
        assessment: reviewedPatient.assessments[0],
      });
    } else {
      res.status(400);
      throw new Error("Assessment review not updated");
    }
  }
});

//@desc schedule an appointment
//@route POST /api/nurses/schedule-appointment/:id
//@access Protected
const scheduleAppointment = asyncHandler(async (req, res) => {
  const patient = await Patient.findOne({ "assessments._id": req.params.id });
  const newAppointment = {
    nurse: req.user._id,
    nurseName: "" + req.user.firstName + " " + req.user.lastName,
    scheduledAt: moment(req.body.date).format(),
  };
  if (patient) {
    const i = patient.assessments.findIndex((x) => x._id == req.params.id);
    patient.assessments[i].appointment.unshift(newAppointment);
    const updatedPatient = await patient.save();
    if (updatedPatient) {
      res.json({
        "patient._id": patient._id,
        appointment: updatedPatient.assessments[i].appointment[0],
        message: true,
      });
    } else {
      res.status(400);
      throw new Error("not scheduled");
    }
  } else {
    res.status(404);
    throw new Error("Assessment not found");
  }
});

//@desc getting list of appointments
//@route POST /api/nurses/appointment-list
//@access Protected
const getListOfAppointments = asyncHandler(async (req, res) => {
  const patients = await Patient.find({
    "assessments.appointment.nurse": req.user._id,
    "assessments.appointment.scheduledAt": {
      $gte: moment(Date.now()).format(),
    },
  });
  if (patients.length !== 0) {
    res.json(
      patients.map((p) => {
        return {
          "._id": p._id,
          name: "" + p.firstName + " " + p.lastName,
          appointment: moment(
            p.assessments[0].appointment[0].scheduledAt
          ).format(),
          email: p.email,
          phone: p.phone,
        };
      })
    );
  } else {
    res.json([]);
  }
});

export {
  getNurseProfile,
  registerNurse,
  getAssessmentsToReview,
  reviewAssessment,
  scheduleAppointment,
  getPatientList,
  updateNurseProfile,
  getListOfAppointments,
  getDoctorList,
};
