import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import loginRoute from "./routes/loginRoute.js";
import patientRoutes from "./routes/patientRoutes.js";
import nurseRoutes from "./routes/nurseRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"
import cors from "cors";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors({ origin: true })); // enable origin cors
app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/user/login", loginRoute);
app.use("/api/patients", patientRoutes);
app.use("/api/nurses", nurseRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/admins", adminRoutes);


app.use(errorHandler);
app.use(notFound);
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is running at 5000 in ${process.env.NODE_ENV} mode`)
);
