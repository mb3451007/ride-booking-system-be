const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
    vehicleName: String,
    passengerSpace: Number,
    baggageSpace: String,
    numberOwned: Number,
    priceFrom: Number,
    pricePerKm: Number,
    pricePerMin: Number,
    pricePerPassenger: Number,
    minimumFare: Number,
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
    isActive: Boolean
});

module.exports = mongoose.model('Vehicle', VehicleSchema);