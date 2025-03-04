const Vehicle = require("../models/Vehicle");
const mongoose = require('mongoose')

exports.registerVehicle =  async (req, res) => {
    try {
        const vehicle = new Vehicle(req.body);
        console.log('Saving a Vehicle...' + vehicle)
        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.viewVehicle = async (req, res) => {
    console.log('view vehicles...')
    try {
        const { driverId } = req.query; // Get driverId from query params
        console.log("Received driverId:", driverId);

        if (!driverId) {
            return res.status(400).json({ error: 'Driver ID is required' });
        }

        const vehicles = await Vehicle.find({ driverId }); // Fetch only vehicles that match driverId
        res.json(vehicles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.disableVehicle = async (req, res) => {

  const vehicleId = req.params.id;

  try {
    // Find and update the booking's status
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      vehicleId,
      { isActive: false },
      { new: true } // Returns the updated document
    );

    if (!updatedVehicle) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: "Vehicle disabled successfully", vehicle: updatedVehicle });
  } catch (error) {
    console.error("Error Vehicledisabling :", error);
    res.status(500).json({ error: 'Server error' });
  }

}

exports.deleteVehicle = async (req, res) => {
    try {
      const vehicleId = req.params.id;
  
      if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
        return res.status(400).json({ error: 'Invalid Vehicle ID' });
      }
  
      const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);
  
      if (!deletedVehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
  
      res.json({ message: "Vehicle deleted successfully", vehicle: deletedVehicle });
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  exports.getVehicles = async (req, res) => {
    try {
      const vehicles = await Vehicle.find({ driverId: req.params.driverId, isActive: true });
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }

  };


  