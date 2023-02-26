import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import moment from "moment"

const appointmentSchema = mongoose.Schema({
  nurse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nurses",
  },
  nurseName: {
    type: String,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctors",
  },
  doctorName: {
    type: String,
  },
  scheduledAt: {
    type: Date,
    required: true,
  },
});

const assessmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    closeContact: {
      type: String,
    },
    tested: {
      type: String,
    },
    travelHistory: {
      type: String,
    },
    difficultyBreathing: {
      type: String,
    },
    age: {
      type: String,
    },
    symptomsSet1: {
      type: String,
    },
    symptomsSet2: {
      type: String,
    },
    isReviewed: {
      type: Boolean,
      required: true,
      default: false,
    },
    isForwarded: {
      type: Boolean,
      default: false,
    },
    isRejected: {
      type: Boolean,
    },
    doctor: {
      type: String
    },
    appointment: [appointmentSchema],
  },
  { timestamps: {currentTime : ()=> moment(Date.now()).format("YYYY-MM-DD") }}
);

const patientSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    assessments: [assessmentSchema],
  },
  {
    timestamps: {currentTime : ()=> moment(Date.now()).format("YYYY-MM-DD") }
  }
);

patientSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("----------------------------------------------------------------------")  
  console.log(await bcrypt.compare(enteredPassword, this.password))

  return await bcrypt.compare(enteredPassword, this.password);
};

patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Patient = mongoose.model("Patients", patientSchema);

export default Patient;
