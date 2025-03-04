const express = require("express");
const { registerVehicle, viewVehicle, disableVehicle, deleteVehicle, getVehicles } =  require("../controllers/vehicleController");

const router = express.Router();

router.post("/vehicles", registerVehicle);
router.get("/vehicles", viewVehicle);
router.patch("/vehicles/disable/:id", disableVehicle);
router.delete("/vehicles/delete/:id", deleteVehicle);
router.get("/vehicles/getVehicles/:driverId", getVehicles);

module.exports = router;
