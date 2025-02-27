const Discount = require('../models/Discount');
const mongoose = require("mongoose");


// POST a new discount
exports.addDiscount = async (req, res) => {
  try {
    const { code, type, value, expiry, conditions, driverId } = req.body;
    
    // Check if the discount code already exists
    const existingDiscount = await Discount.findOne({ code });
    if (existingDiscount) {
      return res.status(400).json({ message: 'Discount code already exists' });
    }
    console.log('driverId in contro'+ driverId + conditions)
    const newDiscount = new Discount({ code, type, value, expiry, conditions, driverId });
    await newDiscount.save();
    
    res.status(201).json(newDiscount);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// GET all discounts
exports.getDiscounts = async (req, res) => {
  try {
    const { driverId } = req.query;
    console.log("Received driverId:", driverId);

    if (!driverId) {
        return res.status(400).json({ error: 'Driver ID is required' });
    }

    const discounts = await Discount.find({driverId});
    res.json(discounts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};


exports.deleteDiscount = async (req, res) => {
    try {
        const discountId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(discountId)) {
            return res.status(400).json({ error: "Invalid Discount ID" });
        }

        const deletedDiscount = await Discount.findByIdAndDelete(discountId);

        if (!deletedDiscount) {
            return res.status(404).json({ message: "Discount not found" });
        }

        res.json({ message: "Discount deleted successfully", discount: deletedDiscount });
    } catch (error) {
        console.error("Error deleting discount:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.disableDiscount = async (req, res) => {
    try {
        const discountId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(discountId)) {
            return res.status(400).json({ error: "Invalid Discount ID" });
        }

        const updatedDiscount = await Discount.findByIdAndUpdate(
            discountId,
            { isActive: false },
            { new: true } // Returns the updated document
        );

        if (!updatedDiscount) {
            return res.status(404).json({ message: "Discount not found" });
        }

        res.json({ message: "Discount disabled successfully", discount: updatedDiscount });
    } catch (error) {
        console.error("Error disabling discount:", error);
        res.status(500).json({ error: "Server error" });
    }
};
