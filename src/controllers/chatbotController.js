// chatbotController.js
// Handles chatbot-related service, provider, and timeslot queries

const servicesService = require('../services/servicesService');
const timeslotsService = require('../services/timeslotsService');

// Get all available services
async function getAllServices(req, res) {
  try {
    const services = await servicesService.getAllServices();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get all providers offering a specific service
async function getProvidersByService(req, res) {
  try {
    const { serviceName } = req.params;
    const providers = await servicesService.getProvidersByService(serviceName);
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get available timeslots for a provider
async function getAvailableTimeslotsByProvider(req, res) {
  try {
    const { provider_id } = req.params;
    const timeslots = await timeslotsService.getAvailableTimeslotsByProvider(provider_id);
    res.json(timeslots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllServices,
  getProvidersByService,
  getAvailableTimeslotsByProvider,
};
