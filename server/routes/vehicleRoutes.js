const express = require("express");
const { registerVehicle, viewVehicle } =  require("../controllers/vehicleController");

const router = express.Router();

router.post("/vehicles", registerVehicle);
router.get("/vehicles", viewVehicle);

module.exports = router;
