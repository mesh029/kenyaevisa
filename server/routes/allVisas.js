const express = require('express');
const router = express.Router();
const VisaApplication = require('../models/visaModel');

// Endpoint to handle visa applications

// get all visas
router.get('/', async (req, res) => {
    try {
      const visas = await VisaApplication.find();
      res.status(200).json(visas);
    } catch (error) {
      console.error('Error getting visas:', error);
      res.status(500).json({ error: 'An error occurred while getting visas.' });
    }
  });

module.exports = router;
