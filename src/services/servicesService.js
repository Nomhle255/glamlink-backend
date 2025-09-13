// Business logic for services

const pool = require('../../db');

async function createService({ name, price, provider_id, available_time_slots }) {
  const query = `INSERT INTO services (name, price, provider_id, available_time_slots) VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [name, price, provider_id, available_time_slots];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function getServicesByProvider(provider_id) {
  const query = `SELECT * FROM services WHERE provider_id = $1`;
  const result = await pool.query(query, [provider_id]);
  return result.rows;
}
async function getProvidersByService(serviceName) {
  const query = `SELECT DISTINCT providers.* FROM providers
    JOIN services ON providers.id = services.provider_id
    WHERE services.name = $1`;
  const result = await pool.query(query, [serviceName]);
  return result.rows;
}

async function getAllServices() {
  const query = `SELECT * FROM services`;
  const result = await pool.query(query);
  return result.rows;
}

async function deleteService(id) {
  const query = `DELETE FROM services WHERE id = $1 RETURNING *`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

async function editService(id, { name, price }) {
  const query = `UPDATE services SET name = $1, price = $2 WHERE id = $3 RETURNING *`;
  const values = [name, price, id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

module.exports = {
  createService,
  getServicesByProvider,
  getAllServices,
  deleteService,
  editService,
  getProvidersByService,
};
