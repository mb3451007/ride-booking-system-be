const Driver = require("../models/Driver");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login controller
exports.login = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  try {
    // Find Driver by email
    const driver = await Driver.findOne({ email });
    if (!driver) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, driver.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const drivers_id = driver._id;
    const drivers_name  = driver.firstName + ' ' + driver.lastName;
    const drivers_phone = driver.phone;
    const drivers_email = driver.email;

    // Set token expiration based on rememberMe
    const expiresIn = rememberMe ? "24h" : "1h";

    // Generate JWT token
    const token = jwt.sign({ driverId: driver._id }, process.env.JWT_SECRET, { expiresIn });

    // Send success response
    res.json({ success: true, token, drivers_id, drivers_name, drivers_phone, drivers_email });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error, please try again later." });
  }
};

// Protected route example
exports.dashboard = async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: 'Welcome to the dashboard', driver: decoded });
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
}