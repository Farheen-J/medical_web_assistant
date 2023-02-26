import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Doctor from "../Models/doctorModel.js";
import Patient from "../Models/patientModel.js";
import moment from "moment";

//@desc register new Doctor
//@route POST /api/doctors/register
//@access Public
const registerDoctor = asyncHandler(async (req, res) => {
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

  const doctorExists = email
    ? await Doctor.findOne({ email })
    : await Doctor.findOne({ phone });

  if (doctorExists) {
    res.status(401);
    throw new Error("doctor already exists");
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
  const doctor = await Doctor.create({
    firstName,
    lastName,
    email,
    password,
    address,
    phone,
    dateOfBirth,
    registrationNum,
  });

  if (doctor) {
    res.status(201).json({
      _id: doctor._id,
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      email: doctor.email,
      phone: doctor.phone,
      address: doctor.address,
      dateOfBirth: doctor.dateOfBirth,
      registrationNum: doctor.registrationNum,
      token: generateToken(doctor._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid doctor data");
  }
});

//@desc Update Doctor Profile
//@route PUT /api/doctors/profile
//@access Protected
const updateDoctorProfile = asyncHandler(async (req, res) => {
  const user = await Doctor.findById(req.user._id);

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
    throw new Error("Patient not Found");
  }
});

//@desc get list of patients to review forwarded assessments
//@route GET /api/doctors/forwarded-assessments
//@access Protected (Doctor)
const getForwardedAssessments = asyncHandler(async (req, res) => {
  const allPatients = await Patient.find().select("-password");
  const patients = allPatients.filter(
    (patient, i) =>
      patient.assessments.length !== 0 &&
      patient.assessments[0].isReviewed === false &&
      patient.assessments[0].isForwarded === true &&
      patient.assessments[0].doctor == req.user._id
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

//@desc review the selected assessment
//@route POST /api/doctors/review-assessments/:id
//@access Protected
const reviewForwardedAssessment = asyncHandler(async (req, res) => {
  const patient = await Patient.findOne({ "assessments._id": req.params.id });
  const { isRejected, isReviewed } = req.body;
  if (patient) {
    const i = patient.assessments.findIndex((x) => x._id == req.params.id);
    patient.assessments[i].isReviewed = isReviewed;
    patient.assessments[i].isRejected = isRejected || false;
    patient.assessments[i].isForwarded = false;
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
//@route POST /api/doctors/schedule-appointment/:id
//@access Protected
const scheduleAppointment = asyncHandler(async (req, res) => {
  const patient = await Patient.findOne({ "assessments._id": req.params.id });
  const newAppointment = {
    doctor: "" + req.user._id,
    doctorName: "Dr. " + req.user.firstName + " " + req.user.lastName,
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
  }
});

//@desc Get list of patients
//@route GET /api/doctors/patient-list
//@access Protected doctorAdmin
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

//@desc getting list of appointments
//@route POST /api/doctors/appointment-list
//@access Protected
const getListOfAppointments = asyncHandler(async (req, res) => {
  const patients = await Patient.find({
    "assessments.appointment.doctor": req.user._id,
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
          appointment: moment(p.assessments[0].appointment[0].scheduledAt).format(),
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
  registerDoctor,
  getForwardedAssessments,
  reviewForwardedAssessment,
  scheduleAppointment,
  getPatientList,
  updateDoctorProfile,
  getListOfAppointments,
};
