const mongoose = require("mongoose");

const ServicesSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Services", ServicesSchema);
