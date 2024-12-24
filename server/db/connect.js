import mongoose from "mongoose";
const connectionString = process.env.MONGO_URI;

const connectDB = () => {
  mongoose
    .connect(connectionString)
    .then(() => console.log("Mongoose connected..."))
    .catch((err) => console.error("Connection Error:", err));
};

export default connectDB;
