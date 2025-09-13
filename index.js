// Main entry point for Glamlink backend

require('dotenv').config();
const express = require('express');
const cors = require('./src/config/corsConfig');
const clientsRoutes = require('./src/routes/clientsRoutes');
const authRoutes = require('./src/routes/authRoutes');
const bookingsRoutes = require('./src/routes/bookingsRoutes');
const providersRoutes = require('./src/routes/providersRoutes');
const servicesRoutes = require('./src/routes/servicesRoutes');
const timeslotsRoutes = require('./src/routes/timeslotsRoutes');
const chatbotRoutes = require('./src/routes/chatbotRoutes');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors);
app.use(express.json());

app.use('/clients', clientsRoutes);
app.use('/auth', authRoutes);
app.use('/bookings', bookingsRoutes);
app.use('/providers', providersRoutes);
app.use('/services', servicesRoutes);
app.use('/timeslots', timeslotsRoutes);
app.use('/chatbot', chatbotRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Glamlink Backend');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
