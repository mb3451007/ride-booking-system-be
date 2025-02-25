const express = require("express");
const { addBookings, getBookings, confirmBookings, cancelBooking, deleteBooking } = require("../controllers/bookingController");

const router = express.Router();

router.post("/bookings", addBookings );
router.get("/bookings", getBookings );
router.put("/bookings/confirm/:id", confirmBookings );
router.put("/bookings/cancel/:id", cancelBooking );
router.delete("/bookings/delete/:id", deleteBooking );

module.exports = router;
