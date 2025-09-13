// timeslotsRoutes.js
// Router for timeslot endpoints

const express = require('express');
const router = express.Router();
const timeslotsController = require('../controllers/timeslotsController');

// Add a timeslot for a provider
router.post('/', timeslotsController.createTimeslot);

// Get all timeslots for a provider
router.get('/provider/:provider_id', timeslotsController.getTimeslotsByProvider);

// Update timeslot status
router.patch('/:id/status', timeslotsController.updateTimeslotStatus);

module.exports = router;
