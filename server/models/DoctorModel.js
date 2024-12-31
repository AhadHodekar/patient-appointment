import mongoose from "mongoose";
import WalletModel from "./WalletModel.js";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  availability: [
    {
      day: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        required: true,
      },
      timeSlot: {
        startTime: {
          type: String,
          required: true,
        },
        endTime: {
          type: String,
          required: true,
        },
      },
    },
  ],
  fee: {
    type: Number,
    required: true,
  },
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

doctorSchema.methods.createWallet = async function () {
  const existingWallet = await WalletModel.findOne({ doctorId: this._id });
  if (!existingWallet) {
    const wallet = new WalletModel({
      doctorId: this._id,
      balance: 0,
    });
    await wallet.save();
    this.wallet = wallet._id;
    console.log(`Wallet is created for doctor: ${this.name}`);
  }
};

doctorSchema.pre("save", async function (next) {
  if (this.isNew) {
    await this.createWallet();
  }
  next();
});

const DoctorModel = mongoose.model("Doctor", doctorSchema);

export default DoctorModel;
