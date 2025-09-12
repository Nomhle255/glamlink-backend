// Define provider routes

const express = require('express');
const router = express.Router();
const providersController = require('../controllers/providersController');
const authController = require('../controllers/authController');

// Create provider
router.post('/', providersController.createProvider);

// Get provider info by ID
router.get('/:id', providersController.getProviderById);

// Update provider info
router.put('/:id', providersController.updateProvider);

// Partially update provider info
router.patch('/:id', providersController.updateProvider);

// Login route
router.post('/login', authController.login);

module.exports = router;
