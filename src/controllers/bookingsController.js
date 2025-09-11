// bookingsController.js
// Handles booking-related requests

const bookingsService = require('../services/bookingsService');

async function createBooking(req, res) {
  try {
    const booking = await bookingsService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getBookingsByProvider(req, res) {
  try {
    const bookings = await bookingsService.getBookingsByProvider(req.params.provider_id);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


// PATCH or PUT /bookings/:id/status
async function updateBookingStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const booking = await bookingsService.getBookingById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    const updated = await bookingsService.updateBookingStatus(id, status);
    res.json({ message: 'Status updated', booking: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating status' });
  }
}

async function rescheduleBooking(req, res) {
  const bookingId = req.params.id;
  const { time } = req.body;
  try {
    const updated = await bookingsService.rescheduleBooking(bookingId, time);
    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to reschedule booking.' });
  }
}
async function cancelBooking(req, res) {
  try {
    const cancelled = await bookingsService.cancelBooking(req.params.id);
    if (cancelled) {
      res.json(cancelled);
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createBooking,
  getBookingsByProvider,
  updateBookingStatus,
  rescheduleBooking,
  cancelBooking,
};
