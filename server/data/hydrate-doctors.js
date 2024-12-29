import "dotenv/config";
import doctors from "./doctors.json" with { type: "json" };
import DoctorModel from "../models/DoctorModel.js";
import connectDB from "../db/connect.js";

const start = async () => {
  try {
    connectDB();
    console.log(process.env.MONGO_URI);
    await DoctorModel.deleteMany();
    await DoctorModel.create(doctors);
    console.log("Success adding doctors!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
