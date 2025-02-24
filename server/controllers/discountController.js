const express = require('express');
const Discount = require('../models/Discount');

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