// Get available timeslots for a provider
async function getAvailableTimeslotsByProvider(provider_id) {
  const query = `SELECT * FROM timeslots WHERE provider_id = $1 AND status = 'available'`;
  const result = await pool.query(query, [provider_id]);
  return result.rows;
}
// timeslotsService.js
// Business logic for timeslots

const pool = require('../../db');

// Create a timeslot for a provider
async function createTimeslot({ provider_id, day, time, date, status = 'available' }) {
  const query = `INSERT INTO timeslots (provider_id, day, time, date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [provider_id, day, time, date, status];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Get all timeslots for a provider
async function getTimeslotsByProvider(provider_id) {
  const query = `SELECT * FROM timeslots WHERE provider_id = $1`;
  const result = await pool.query(query, [provider_id]);
  return result.rows;
}

// Update timeslot status
async function updateTimeslotStatus(timeslot_id, status) {
  const query = `UPDATE timeslots SET status = $1 WHERE id = $2 RETURNING *`;
  const result = await pool.query(query, [status, timeslot_id]);
  return result.rows[0];
}

// Find timeslot by booking info (day, time, provider_id)
async function findTimeslot({ provider_id, datetime }) {
  const query = `SELECT * FROM timeslots WHERE provider_id = $1 AND datetime = $2`;
  const result = await pool.query(query, [provider_id, datetime]);
  return result.rows[0];
}

module.exports = {
  createTimeslot,
  getTimeslotsByProvider,
  updateTimeslotStatus,
  findTimeslot,
  getAvailableTimeslotsByProvider,
};
