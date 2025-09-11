// corsConfig.js
// CORS configuration for frontend-backend connection

const cors = require('cors');

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
module.exports = cors(corsOptions);
