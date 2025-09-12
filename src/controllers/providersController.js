// providersController.js
// Handles provider-related requests

const providersService = require('../services/providersService');

async function createProvider(req, res) {
  try {
    const provider = await providersService.createProvider(req.body);
    res.status(201).json(provider);
  } catch (err) {
    console.error('Error in createProvider:', err);
    res.status(500).json({ error: err.message });
  }
}

async function getProviderById(req, res) {
  try {
    const provider = await providersService.getProviderById(req.params.id);
    console.log('Requested provider ID:', req.params.id);
    console.log('Provider found:', provider);
    if (provider) {
      res.json(provider);
    } else {
      res.status(404).json({ error: 'Provider not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateProvider(req, res) {
  try {
    const updated = await providersService.updateProvider(req.params.id, req.body);
    if (updated) {
      res.json({ success: true, provider: updated });
    } else {
      res.status(404).json({ error: 'Provider not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createProvider,
  getProviderById,
  updateProvider,
};
