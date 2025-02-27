const Package = require("../models/Package");
const mongoose = require('mongoose')

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

exports.disablePackage = async (req, res) => {
    try {
        const packageId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(packageId)) {
            return res.status(400).json({ error: "Invalid Package ID" });
        }

        const updatedPackage = await Package.findByIdAndUpdate(
            packageId,
            { isActive: false },
            { new: true } // Returns the updated document
        );

        if (!updatedPackage) {
            return res.status(404).json({ message: "Package not found" });
        }

        res.json({ message: "Package disabled successfully", package: updatedPackage });
    } catch (error) {
        console.error("Error disabling package:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.deletePackage = async (req, res) => {
    try {
        const packageId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(packageId)) {
            return res.status(400).json({ error: "Invalid Package ID" });
        }

        const deletedPackage = await Package.findByIdAndDelete(packageId);

        if (!deletedPackage) {
            return res.status(404).json({ message: "Package not found" });
        }

        res.json({ message: "Package deleted successfully", package: deletedPackage });
    } catch (error) {
        console.error("Error deleting package:", error);
        res.status(500).json({ error: "Server error" });
    }
};
