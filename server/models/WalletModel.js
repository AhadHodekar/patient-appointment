import mongoose from "mongoose";
import { BadRequestError } from "../errors/index.js";

const walletSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

walletSchema.methods.deductAmount = function (amount) {
  if (this.balance >= amount) {
    this.balance -= amount;
    return this.save();
  } else {
    throw new BadRequestError("Insufficient balance");
  }
};

const WalletModel = mongoose.model("Wallet", walletSchema);

export default WalletModel;
