const Surcharge = require('../models/Surcharge');
const mongoose = require("mongoose");

// Get all surcharges
exports.getSurcharges = async (req, res) => {
  try {
    const { driverId } = req.query; // Get driverId from query params
    console.log("Received driverId:", driverId);

    if (!driverId) {
        return res.status(400).json({ error: 'Driver ID is required' });
    }
    const surcharges = await Surcharge.find({driverId});
    res.status(200).json(surcharges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a surcharge
exports.addSurcharge = async (req, res) => {
  try {
    const newSurcharge = new Surcharge(req.body);
    console.log('new Surcharge added...')
    await newSurcharge.save();
    res.status(201).json(newSurcharge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deleteSurcharge = async (req, res) => {
    try {
        const surchargeId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(surchargeId)) {
            return res.status(400).json({ error: "Invalid Surcharge ID" });
        }

        const deletedSurcharge = await Surcharge.findByIdAndDelete(surchargeId);

        if (!deletedSurcharge) {
            return res.status(404).json({ message: "Surcharge not found" });
        }

        res.json({ message: "Surcharge deleted successfully", surcharge: deletedSurcharge });
    } catch (error) {
        console.error("Error deleting surcharge:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.disableSurcharge = async (req, res) => {
    try {
        const surchargeId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(surchargeId)) {
            return res.status(400).json({ error: "Invalid Surcharge ID" });
        }

        const updatedSurcharge = await Surcharge.findByIdAndUpdate(
            surchargeId,
            { isActive: false },
            { new: true } // Returns the updated document
        );

        if (!updatedSurcharge) {
            return res.status(404).json({ message: "Surcharge not found" });
        }

        res.json({ message: "Surcharge disabled successfully", surcharge: updatedSurcharge });
    } catch (error) {
        console.error("Error disabling surcharge:", error);
        res.status(500).json({ error: "Server error" });
    }
};