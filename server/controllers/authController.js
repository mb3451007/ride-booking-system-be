const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login controller
exports.login = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send success response
    res.json({ success: true, token });
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
    res.json({ message: 'Welcome to the dashboard', user: decoded });
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
}