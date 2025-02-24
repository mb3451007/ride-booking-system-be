const express = require("express");
const { registerDriver, getAllDrivers } = require("../controllers/driverController");

const router = express.Router();

router.post("/register", registerDriver);
router.get("/users", getAllDrivers);

module.exports = router;
