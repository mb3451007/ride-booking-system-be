const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  phone: String,
  company: String,
  address: String,
  subscription: String,
  cardNumber: String,
  expirationDate: String,
  cvc: String,
  dataConsent: Boolean,
  terms: Boolean,
}, { timestamps: true });

module.exports = mongoose.model("Driver", DriverSchema);
