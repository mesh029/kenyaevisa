const express = require('express');
const router = express.Router();
const VisaApplication = require('../models/visaModel');

// Endpoint to handle visa applications
router.post('/', async (req, res) => {
  const flattenedData = req.body;

  try {
      // Create a new visa application
      const visaApplication = new VisaApplication(flattenedData);
      await visaApplication.save();
      res.status(201).json({ message: 'Visa application saved successfully', visaApplication });
      console.log("this is the visa id",flattenedData.visaId)
    
  } catch (error) {
    console.error('Error adding/updating visa application:', error);
    res.status(500).json({ error: 'An error occurred while processing the visa application.' });
    console.log("this is the visa id", flattenedData.visaId)

  }
});


router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const visas = await VisaApplication.find({ user: userId });
    res.status(200).json(visas);
  } catch (error) {
    console.error('Error getting visas:', error);
    res.status(500).json({ error: 'An error occurred while getting visas.' });
  }
});

router.get('/visa/:visaId', async (req, res) => {
  const visaId = req.params.visaId;

  try {
    const visas = await VisaApplication.find({ _id: visaId });
    res.status(200).json(visas);
  } catch (error) {
    console.error('Error getting visas:', error);
    res.status(500).json({ error: 'An error occurred while getting visas.' });
  }
});



// Update an existing visa application
router.post('/visa/:id', async (req, res) => {
  const visaId = req.params.id;
  const flattenedData = req.body;
  if(visaId){
    try {
      const updatedVisa = await VisaApplication.findByIdAndUpdate(
        visaId, // Use visaId to identify the specific visa application
        flattenedData,
        { new: true } // Return the updated document
      );
  
      res.status(200).json({ message: 'Visa application updated successfully', updatedVisa });
      console.log("this is the visa id", visaId);
    } catch (error) {
      console.error('Error updating visa application:', error);
      res.status(500).json({ error: 'An error occurred while updating the visa application.' });
      console.log("this is the visa id", visaId);
    }
    
  } else{
    console.log("no visa id ")
  }

});

// Add a route to delete a visa by its ID
router.delete('/visa/:id', async (req, res) => {
  const visaId = req.params.id;

  try {
    const deletedVisa = await VisaApplication.findByIdAndDelete(visaId);
    res.status(200).json({ message: 'Visa application deleted successfully', deletedVisa });
  } catch (error) {
    console.error('Error deleting visa application:', error);
    res.status(500).json({ error: 'An error occurred while deleting the visa application.' });
  }
});

module.exports = router;
