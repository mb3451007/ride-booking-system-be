const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, required: true, enum: ['percentage', 'fixed'] },
  value: { type: String, required: true },
  expiry: { type: Date, required: true },
  isActive: {type: Boolean, default: true},
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  conditions: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Discount', discountSchema);
