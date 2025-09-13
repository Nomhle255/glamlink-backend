// bookingsService.js
// Business logic for bookings

const pool = require('../../db');

async function createBooking({ client_name, client_phone, service_name, time, provider_id }) {
  const query = `INSERT INTO bookings (client_name, client_phone, service_name, time, provider_id, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const values = [client_name, client_phone, service_name, time, provider_id, 'pending'];
  const result = await pool.query(query, values);
  return result.rows[0];
}
async function getBookingById(id) {
  const query = `SELECT * FROM bookings WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
}
async function getBookingsByProvider(provider_id) {
  const query = `
  SELECT id, client_name, service_name, status, time, provider_id
    FROM bookings 
    WHERE provider_id = $1
  `;
  const result = await pool.query(query, [provider_id]);
  return result.rows;
}

async function updateBookingStatus(id, status) {
  const query = `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`;
  const result = await pool.query(query, [status, id]);
  const booking = result.rows[0];
  // Update timeslot status if booking is confirmed or completed
  if (booking) {
    const timeslotsService = require('./timeslotsService');
    // Find the matching timeslot by provider and time
    // If you use datetime, adjust accordingly
    const timeslot = await timeslotsService.findTimeslot({
      provider_id: booking.provider_id,
      datetime: booking.time // or booking.datetime, depending on your schema
    });
    if (timeslot) {
      if (status === 'confirmed') {
        await timeslotsService.updateTimeslotStatus(timeslot.id, 'booked');
      } else if (status === 'completed' || status === 'cancelled') {
        await timeslotsService.updateTimeslotStatus(timeslot.id, 'available');
      }
    }
  }
  return booking;
}

async function rescheduleBooking(id, newTime) {
  const query = `UPDATE bookings SET time = $1, status = 'rescheduled' WHERE id = $2 RETURNING *`;
  const result = await pool.query(query, [newTime, id]);
  return result.rows[0];
}

async function cancelBooking(id) {
  const query = `UPDATE bookings SET status = 'cancelled' WHERE id = $1 RETURNING *`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

module.exports = {
  createBooking,
  getBookingsByProvider,
  updateBookingStatus,
  rescheduleBooking,
  cancelBooking,
  getBookingById,
};
