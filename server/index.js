const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/clickchauffeurs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("✅ Connected to MongoDB"));

// Define User Schema
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  consent: Boolean,
  firstName: String,
  lastName: String,
  phone: String,
  company: String,
  address: String,
  subscription: String,
  cardNumber: String,
  expirationDate: String,
  cvc: String,
  dataConsent: Boolean,
  terms: Boolean,
});

const User = mongoose.model("User", UserSchema);

// API Route to Handle Form Submission
app.post("/api/user", async (req, res) => {
  try {
    const { step1, step2 } = req.body;

    // Display the form data before saving
    console.log("Form Data Before Saving:", { ...step1, ...step2 });

    // Combine step1 and step2 into a single object
    const combinedData = { ...step1, ...step2 };

    // Create a new User with the combined data
    const newUser = new User(combinedData);

    // Save the user to the database
    await newUser.save();

    // Return the saved user data as a response
    res.status(201).json({ message: "User registered successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// Route to Get All Users (for testing)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// Login API Route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
      console.log("User not found!")
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Successful login
    res.status(200).json({ success: true, message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
