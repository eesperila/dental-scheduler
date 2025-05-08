const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Appointments = require("../models/Appointments");
const Services = require("../models/Services");
const Dentists = require("../models/Dentists");
const auth = require("../middleware/auth");

const app = express();
app.use(express.json());

const router = express.Router();

// @route   POST /api/register
// @desc    Register new user
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered." });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Registration successful." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

router.post("/profileupdate/:id", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updateFields = {
      name,
      email,
      phone,
      password: hashedPassword,
    };

    // Check for existing user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true } // return updated doc
    );

    if (!updatedUser)
      return res
        .status(404)
        .json({ status: false, message: "User not found." });

    await updatedUser.save();

    res.status(201).json({
      status: true,
      message: "Profile update successful.",
      user: { ...updateFields, id: req.params.id },
    });
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error." });
  }
});

// Login endpoint
router.post("/validateLogin", async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: false, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      status: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/book", async (req, res) => {
  try {
    const { fullname, email, phone, dentistId, dateTime, serviceId } = req.body;

    const service = await Services.findById(serviceId);
    if (!service)
      return res
        .status(400)
        .json({ status: false, message: "Invalid service type." });

    const dentist = await Dentists.findById(dentistId);
    if (!dentist)
      return res
        .status(400)
        .json({ status: false, message: "Dentist does not exist." });

    // Save appointment
    const newAppointment = new Appointments({
      name: fullname,
      email,
      phone,
      dateTime,
      serviceId,
      dentistId,
    });

    await newAppointment.save();
    res
      .status(201)
      .json({ status: true, message: "Booking an appointment is successful." });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

router.post("/appointments", async (req, res) => {
  const { email } = req.body;
  const appointments = await Appointments.find({ email });
  console.log(appointments);
  res.status(200).json(appointments);
});

router.get("/dentists", async (req, res) => {
  const dentists = await Dentists.find();
  res.status(200).json(dentists);
});

router.get("/services", async (req, res) => {
  const services = await Services.find();
  res.status(200).json(services);
});

router.get("/dashboard", auth, (req, res) => {
  // Only accessible if valid token
  res.json({ message: "This is your protected dashboard" });
});

module.exports = router;
