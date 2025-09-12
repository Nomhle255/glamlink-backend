// authController.js
// Handles authentication requests

const providersService = require('../services/providersService');
const bcrypt = require('bcrypt');


exports.register = async (req, res) => {
  try {
    const { name, email, phone, specialty, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const provider = await providersService.createProvider({ name, email, phone, specialty, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully.', provider });
  } catch (err) {
    console.error('Error in register:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const provider = await providersService.getProviderByEmail(email);
    if (!provider) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, provider.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({
      id: provider.id,
      name: provider.name,
      email: provider.email,
      phone: provider.phone,
      role: provider.role
    });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ error: err.message });
  }
};
