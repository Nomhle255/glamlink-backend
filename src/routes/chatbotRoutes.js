// chatbotRoutes.js
// Router for chatbot endpoints

const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

// Get all available services
router.get('/services', chatbotController.getAllServices);

// Get all providers offering a specific service
router.get('/providers/:serviceName', chatbotController.getProvidersByService);

// Get available timeslots for a provider
router.get('/timeslots/:provider_id', chatbotController.getAvailableTimeslotsByProvider);

module.exports = router;
