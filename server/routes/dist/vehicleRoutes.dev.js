"use strict";

var express = require("express");

var _require = require("../controllers/vehicleController"),
    registerVehicle = _require.registerVehicle,
    viewVehicle = _require.viewVehicle,
    disableVehicle = _require.disableVehicle,
    deleteVehicle = _require.deleteVehicle,
    getVehicles = _require.getVehicles;

var router = express.Router();
router.post("/vehicles", registerVehicle);
router.get("/vehicles", viewVehicle);
router.patch("/vehicles/disable/:id", disableVehicle);
router["delete"]("/vehicles/delete/:id", deleteVehicle);
router.get("/vehicles/getVehicles/:driverId", getVehicles);
module.exports = router;