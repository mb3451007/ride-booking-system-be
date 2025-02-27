const mongoose = require('mongoose');

const SurchargeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  days: { type: [String], required: true },
  increaseMultiplier: { type: Number, required: true },
  isActive: {type: Boolean, default: true},
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  vehicles: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Surcharge', SurchargeSchema);
