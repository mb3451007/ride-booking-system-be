const Surcharge = require('../models/Surcharge');

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

// Delete a surcharge
exports.deleteSurcharge = async (req, res) => {
  try {
    const deletedSurcharge = await Surcharge.findByIdAndDelete(req.params.id);
    if (!deletedSurcharge) return res.status(404).json({ message: 'Surcharge not found' });
    res.status(200).json({ message: 'Surcharge deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
