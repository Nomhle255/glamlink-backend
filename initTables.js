// initTables.js

const pool = require('./db');

async function initTables() {
  try {
    // Create providers table (used for stylists)
    await pool.query(`CREATE TABLE IF NOT EXISTS providers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      phone VARCHAR(20),
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      specialty VARCHAR(100)
    )`);

    // Create services table
    await pool.query(`CREATE TABLE IF NOT EXISTS services (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      provider_id INTEGER REFERENCES providers(id) ON DELETE CASCADE,
      available_time_slots TEXT
    )`);

    // Create bookings table
    await pool.query(`CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      client_name VARCHAR(100) NOT NULL,
      client_phone VARCHAR(20) NOT NULL,
      service_name VARCHAR(100) NOT NULL,
      time TIMESTAMP NOT NULL,
      provider_id INTEGER REFERENCES providers(id) ON DELETE CASCADE
    )`);

    console.log('Providers, services, and bookings tables initialized');
  } catch (err) {
    console.error('Error initializing tables:', err);
  } finally {
    pool.end();
  }
}

initTables();
