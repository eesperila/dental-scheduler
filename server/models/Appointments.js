const mongoose = require("mongoose");

const AppointmentsSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dateTime: { type: Date, required: true },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services",
      required: true,
    },
    dentistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dentists",
      required: true,
    },
    status: { type: String, default: "confirmed" }, //confirmed, cancelled
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointments", AppointmentsSchema);
