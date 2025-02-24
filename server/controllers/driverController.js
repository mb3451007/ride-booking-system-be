const Driver = require("../models/Driver");
const bcrypt = require('bcrypt');
const saltRounds = 10; 

exports.registerDriver = async (req, res) => {
  try {
    console.log("Form Data Before Saving:", req.body); // Log the data
    // Hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const newDriver = new Driver(req.body); // Use the flat object directly
    await newDriver.save();

    res.status(201).json({ message: "Driver registered successfully", data: newDriver });
  } catch (error) {
    console.error('Error registering Driver:', error); // Log the error
    res.status(500).json({ message: "Error registering Driver", error });
  }
};

exports.getAllDrivers = async (req, res) => {
  try {
    const Drivers = await Driver.find();
    res.status(200).json({ Drivers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Drivers", error });
  }
};
