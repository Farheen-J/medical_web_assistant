import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import moment from "moment";

const nurseSchema = mongoose.Schema(
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
    registrationNum: {
      type: String,
      required: true,
    },
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointments",
      },
    ],
  },
  {
    timestamps: { currentTime: () => moment(Date.now()).format("YYYY-MM-DD") },
  }
);

nurseSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

nurseSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Nurse = mongoose.model("Nurses", nurseSchema);

export default Nurse;
