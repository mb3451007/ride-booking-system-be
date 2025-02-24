const Vehicle = require("../models/Vehicle");

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