const Package = require("../models/Package");

exports.registerPackage =  async (req, res) => {
    try {
        const package = new Package(req.body);
        console.log(package)
        await package.save();
        res.status(201).json(package);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.viewPackage = async (req, res) => {
    try {
        const { driverId } = req.query;
        console.log("Received driverId:", driverId);

        if (!driverId) {
            return res.status(400).json({ error: 'Driver ID is required' });
        }

        const package = await Package.find({driverId});
        res.json(package);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};