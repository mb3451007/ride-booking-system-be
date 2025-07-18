"use strict";

var mongoose = require('mongoose');

var BookingSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  startingAddress: {
    type: String,
    required: true
  },
  arrivalAddress: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  tripType: {
    type: String,
    required: true
  },
  discountCode: {
    type: String,
    "default": ''
  },
  status: {
    type: String,
    "default": 'Not Confirmed'
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Booking', BookingSchema);