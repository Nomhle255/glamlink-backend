
// servicesRoutes.js
// Define service routes

const express = require('express');
const router = express.Router();
// Get services with optional provider_id query
const servicesService = require('../services/servicesService');
router.get('/services', async (req, res) => {
  const { provider_id } = req.query;
  try {
    let services;
    if (provider_id) {
      services = await servicesService.getServicesByProvider(provider_id);
    } else {
      services = await servicesService.getAllServices();
    }
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const servicesController = require('../controllers/servicesController');

// Add a new service
router.post('/', servicesController.createService);

// Get all services
router.get('/', servicesController.getAllServices);

// Get services by provider
router.get('/provider/:provider_id', servicesController.getServicesByProvider);

// Delete a service
router.delete('/:id', servicesController.deleteService);

// Edit a service
router.put('/:id', servicesController.editService);

// Get services with query
router.get("/services", async (req, res) => {
  const { provider_id } = req.query;
  const services = await db.services.findAll({ where: { provider_id } });
  res.json(services);
});

module.exports = router;
