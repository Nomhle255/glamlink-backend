# Glamlink Backend

This is the backend for the Glamlink project, built with Node.js, Express, and PostgreSQL.

## Project Structure

- `controllers/` - Handles request logic for each resource
- `routes/` - Defines Express routes for each resource
- `services/` - Business logic and data access
- `config/` - Configuration files (CORS, etc.)
- `docs/` - API documentation for frontend integration
- `db.js` - PostgreSQL connection setup
- `initTables.js` - Script to initialize database tables
- `index.js` - Main entry point
- `.env.example` - Example environment variables

## Getting Started

1. Copy `.env.example` to `.env` and fill in your database and frontend details.
2. Run `npm install` to install dependencies, then install the PostgreSQL client library:
	```
	npm install pg
	```
3. Run `node initTables.js` to initialize database tables.
4. Start the server with `node index.js`.

## Connecting to Frontend

- Ensure CORS is configured for your frontend URL in `.env`.
- See `docs/api.md` for available endpoints.
