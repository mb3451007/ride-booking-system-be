const User = require("../models/User");
const bcrypt = require('bcrypt');
const saltRounds = 10; 

exports.registerUser = async (req, res) => {
  try {
    console.log("Form Data Before Saving:", req.body); // Log the data
    // Hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const newUser = new User(req.body); // Use the flat object directly
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", data: newUser });
  } catch (error) {
    console.error('Error registering user:', error); // Log the error
    res.status(500).json({ message: "Error registering user", error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
