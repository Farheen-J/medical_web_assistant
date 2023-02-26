import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Patient from "../Models/patientModel.js";
import Nurse from "../Models/nurseModel.js";
import Doctor from "../Models/doctorModel.js";
import Admin from "../Models/adminModel.js";

//@desc Auth User and get Token
//@route POST /api/user/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user =
    (await Patient.findOne({ email })) ||
    (await Nurse.findOne({ email })) ||
    (await Doctor.findOne({ email })) ||
    (await Admin.findOne({ email }));
  console.log(user);
  const passMatch = await user.matchPassword(password);
  if (user && passMatch) {
    const type = user.registrationNum
      ? user.registrationNum.charAt(0) === "N"
        ? "nurse"
        : user.registrationNum.charAt(0) === "A"
        ? "admin"
        : "doctor"
      : "patient";
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      email: user.email,
      phone: user.phone,
      address: user.address,
      token: generateToken(user._id),
      type: type,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }

});

export { authUser };
