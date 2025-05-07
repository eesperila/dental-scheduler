const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    patientId: { type: Number, required: true },
    dateTimeSchedule: { type: String, required: true, unique: true },
    serviceId: { type: String },
    dentistId: { type: String, required: true },
    status: { type: String, required: true, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
