const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    startingAddress: { type: String, required: true },
    arrivalAddress: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    vehicleType: { type: String, required: true },
    tripType: { type: String, required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  }, { timestamps: true });
  
module.exports = mongoose.model('Booking', BookingSchema);