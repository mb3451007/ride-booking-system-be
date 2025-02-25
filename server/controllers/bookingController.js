const Booking = require("../models/Booking");
const mongoose = require('mongoose');

// Login controller
exports.addBookings = async (req, res) => {
    try {
        const { fullName, startingAddress, arrivalAddress, date, time, vehicleType, tripType, driverId } = req.body;
        
        // Validate required fields
        if (!fullName || !startingAddress || !arrivalAddress || !date || !time || !vehicleType || !tripType || !driverId) {
          return res.status(400).json({ message: 'All fields are required' });
        }
        
        const newBooking = new Booking({ fullName, startingAddress, arrivalAddress, date, time, vehicleType, tripType, driverId });
        await newBooking.save();
        
        res.status(201).json(newBooking);
      } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
      }
};

exports.getBookings = async (req, res) => {
  const { driverId } = req.query; // Get driverId from query params
  console.log("Received driverId:", driverId);

  if (!driverId) {
    return res.status(400).json({ error: 'Driver ID is required' });
  }

  try {
    // Convert driverId string to ObjectId before querying
    const objectIdDriverId = new mongoose.Types.ObjectId(driverId);

    // Fetch all bookings where driverId matches
    const bookings = await Booking.find({ driverId: objectIdDriverId });

    if (!bookings.length) {
      return res.status(404).json({ message: 'No bookings found for this driver.' });
    }

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.confirmBookings = async (req, res) => {

  const bookingId = req.params.id;
  
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ error: 'Invalid Booking ID' });
  }

  try {
    console.log('Confirm Bookings')
    // Find and update the booking's status
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "Confirmed" },
      { new: true } // Returns the updated document
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: "Booking confirmed successfully", booking: updatedBooking });
  } catch (error) {
    console.error("Error confirming booking:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.cancelBooking = async (req, res) => {

  const bookingId = req.params.id;
  
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ error: 'Invalid Booking ID' });
  }

  try {
    console.log('Cancel Bookings')
    // Find and update the booking's status
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "Cancelled" },
      { new: true } // Returns the updated document
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: "Booking cancelled successfully", booking: updatedBooking });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteBooking = async (req, res) => {

  console.log("fel")
  const bookingId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ error: 'Invalid Booking ID' });
  }

  try {
    console.log('Deleting Booking');

    // Find and delete the booking
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: "Booking deleted successfully", booking: deletedBooking });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: 'Server error' });
  }
};
