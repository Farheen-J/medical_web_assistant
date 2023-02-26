import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import patients from "./data/patients.js";
import admins from "./data/admins.js";
import Patient from "./Models/patientModel.js";
import Admin from "./Models/adminModel.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Patient.deleteMany();

    await Patient.insertMany(patients);

    // await Admin.insertMany(admins)

    console.log("DATA IMPORTED...");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {

    await Patient.deleteMany();

    console.log("DATA DESTROYED...");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
//add script in package.json of root folder
//"data:import" : "node backend/seeder"
//"data:destroy" : "node backend/seeder -d"
