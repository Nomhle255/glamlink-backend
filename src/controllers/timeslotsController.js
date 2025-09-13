// timeslotsController.js
// Handles timeslot-related requests

const timeslotsService = require('../services/timeslotsService');

// Add a timeslot for the logged-in provider
async function createTimeslot(req, res) {
  try {
    // provider_id should come from the logged-in user (e.g., req.user.id or req.body.provider_id)
    const timeslot = await timeslotsService.createTimeslot(req.body);
    res.status(201).json(timeslot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get all timeslots for a provider
async function getTimeslotsByProvider(req, res) {
  try {
    const timeslots = await timeslotsService.getTimeslotsByProvider(req.params.provider_id);
    res.json(timeslots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update timeslot status
async function updateTimeslotStatus(req, res) {
  try {
    const updated = await timeslotsService.updateTimeslotStatus(req.params.id, req.body.status);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createTimeslot,
  getTimeslotsByProvider,
  updateTimeslotStatus,
};
