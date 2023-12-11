const express = require('express');
const router = express.Router();
const VisaApplication = require('../models/visaModel');


// Middleware to check if the user is authenticated
const authenticateUser = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};


// Middleware to check if the user is authenticated

// get all visas
router.get('/', authenticateUser, async (req, res) => {
    try {
      // Your existing route logic goes here
      const visas = await VisaApplication.find();
      res.status(200).json(visas);
      
      // Log success message
      console.log('All Visas route accessed successfully.');
      
      // Send your response
    } catch (error) {
      // Log error message
      console.error('Error accessing All Visas route:', error);
      
      // Send an error response
      res.status(500).json({ error: 'An error occurred while accessing All Visas route.' });
    }
  });

module.exports = router;
