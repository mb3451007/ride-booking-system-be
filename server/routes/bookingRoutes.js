const express = require("express");
const { addBookings, getBookings } = require("../controllers/bookingController");

const router = express.Router();

router.post("/bookings", addBookings );
router.get("/bookings", getBookings );

module.exports = router;
