// servicesController.js
// Handles service-related requests

const servicesService = require('../services/servicesService');
const bookingsService = require('../services/bookingsService');

async function createService(req, res) {
  const { name, price, provider_id } = req.body;
  if (!name || !price || !provider_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const service = await servicesService.createService({ name, price, provider_id });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: "Failed to create service" });
  }
}

async function getServicesByProvider(req, res) {
  try {
    const services = await servicesService.getServicesByProvider(req.params.provider_id);
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllServices(req, res) {
  try {
    const services = await servicesService.getAllServices();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteService(req, res) {
  try {
    const deleted = await servicesService.deleteService(req.params.id);
    if (deleted) {
      res.json({ message: 'Service deleted', service: deleted });
    } else {
      res.status(404).json({ error: 'Service not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function editService(req, res) {
  try {
    const updated = await servicesService.editService(req.params.id, req.body);
    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ error: 'Service not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getBookingsByProvider(req, res) {
  try {
    const bookings = await bookingsService.getBookingsByProvider(req.params.provider_id);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createService,
  getServicesByProvider,
  getAllServices,
  deleteService,
  editService,
  getBookingsByProvider,
};
