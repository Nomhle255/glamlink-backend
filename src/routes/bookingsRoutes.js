// bookingsRoutes.js
// Define booking routes

const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');

// Create a booking
router.post('/', bookingsController.createBooking);

// Get bookings by provider
router.get('/provider/:provider_id', bookingsController.getBookingsByProvider);

// Update booking status (confirm/reject)
router.put('/:id/status', bookingsController.updateBookingStatus);
// Reschedule booking
router.patch('/:id/reschedule', bookingsController.rescheduleBooking);
// Update booking status (PATCH)
router.patch('/:id/status', bookingsController.updateBookingStatus);

module.exports = router;
