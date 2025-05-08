const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

// Enable CORS for all origins (default)
app.use(cors());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

// fetch all appointments of the specific user
/* app.get("/api/:id/appointments", (req, res) => {
  res.status(200).json([
    {
      date: "May 10, 2025",
      time: "10:30 AM",
      service: "Teeth Cleaning",
      dentist: "Dr. Olivia Hart, DDS",
      status: "Confirmed",
    },
    {
      date: "May 15, 2025",
      time: "2:30 PM",
      service: "Dental Checkup",
      dentist: "Dr. Marcus Lin, DMD",
      status: "Pending",
    },
    {
      date: "May 22, 2025",
      time: "1:00 PM",
      service: "Invisalign Consultation",
      dentist: "Dr. Priya Shah, DDS",
      status: "Confirmed",
    },
    {
      date: "May 14, 2025",
      time: "09:30 AM",
      service: "Dental Implants",
      dentist: "Dr. James Caldwell, DMD",
      status: "Rejected",
    },
  ]);
});*/

// fetch all dentists
/* app.get("/dentists", (req, res) => {
  res.status(200).json([
    {
      id: 1,
      name: "Dr. Olivia Hart",
      title: "DDS",
    },
    {
      id: 2,
      name: "Dr. Marcus Lin",
      title: "DMD",
    },
    {
      id: 3,
      name: "Dr. Priya Shah",
      title: "DDS",
    },
    {
      id: 4,
      name: "Dr. James Caldwell",
      title: "DMD",
    },
  ]);
});*/

// fetch all available services
/* app.get("/services", (req, res) => {
  res.status(200).json([
    {
      id: 1,
      description: "Routine Check-up & Cleanings",
    },
    {
      id: 2,
      description: "Teeth Whitening",
    },
    {
      id: 3,
      description: "Dental Implants",
    },
    {
      id: 4,
      description: "Braces / Invisalign",
    },
    {
      id: 5,
      description: "Emergency Care",
    },
  ]);
});*/

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
