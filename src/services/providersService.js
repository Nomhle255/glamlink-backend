// providersService.js
// Business logic for providers

const pool = require('../../db');

async function createProvider({ name, email, phone, password }) {
  const query = `INSERT INTO providers (name, phone, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
  // Check if email already exists
  const existing = await pool.query('SELECT id FROM providers WHERE email = $1', [email]);
  if (existing.rows.length > 0) {
    const error = new Error('Email already registered');
    error.code = 'EMAIL_EXISTS';
    throw error;
  }
  const values = [name, phone || '', email, password];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function getProviderByEmail(email) {
  const query = `SELECT * FROM providers WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
}

// Get provider by ID
async function getProviderById(id) {
  const query = `SELECT * FROM providers WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

async function updateProvider(id, { name, email, phone, role }) {
  const query = `UPDATE providers SET name = $1, email = $2, phone = $3, role = $4 WHERE id = $5 RETURNING *`;
  const values = [name, email, phone, role, id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

module.exports = {
  createProvider,
  getProviderByEmail,
  getProviderById,
  updateProvider
};