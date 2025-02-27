const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    vehicle: { type: String, required: true },
    fixedPrice: { type: Number, required: true },
    priceWithSurcharged: { type: Number, required: true },
    way: { type: String, required: true },
    isActive: {type: Boolean, default: true},
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
    status: { type: String, enum: ['Active', 'Disabled'], default: 'Active' },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model('Package', PackageSchema);
