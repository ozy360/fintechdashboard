import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    // emailVerifyToken: { type: String },
    // forgotPasswordToken: { type: String },
    kyc: {
      type: String,
      enum: ["verified", "pending", "not_verified"],
      default: "not_verified",
    },
    username: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    state: { type: String },
    city: { type: String },
    zip: { type: String },
    email: { type: String, required: true },
    country: { type: String },
    address: { type: String },
    mobile: { type: Number },
    password: { type: String, required: true },
    transactions: [
      {
        name: { type: String },
        date: { type: String },
        currency: {
          type: String,
          enum: ["NGN", "USD", "GBP", "EUR"],
          default: "NGN",
        },
        amount: { type: Number },
        deposit: { type: Boolean, default: false },
        withdraw: { type: Boolean, default: false },
        approved: { type: Boolean, default: false },
        pending: { type: Boolean, default: false },
        rejected: { type: Boolean, default: false },
        tid: { type: String },
      },
    ],
    proof: {
      idtype: { type: String },
      imagelink: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const userdb = mongoose.models.user || mongoose.model("user", userSchema);

export default userdb;
