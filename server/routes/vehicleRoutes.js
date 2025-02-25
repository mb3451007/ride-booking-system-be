const express = require("express");
const { registerVehicle, viewVehicle, disableVehicle, deleteVehicle } =  require("../controllers/vehicleController");

const router = express.Router();

router.post("/vehicles", registerVehicle);
router.get("/vehicles", viewVehicle);
router.patch("/vehicles/disable/:id", disableVehicle);
router.delete("/vehicles/delete/:id", deleteVehicle);

module.exports = router;
