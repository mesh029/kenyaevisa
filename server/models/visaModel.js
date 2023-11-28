const mongoose = require('mongoose');

const visaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  personalInfo: {
    fullName: {
      type: String,
      required: false,
    },
    dateOfBirth: {
      type: String,
    },
    passportNumber:{
      type: String,
    }
    // Add other personal information fields as needed
  },
  visaType: String,
  status: String,
  travelDetails: {
    intendedTravelDates: String,
    purposeOfVisit: String,
    travelItinerary: String,
  },
  financialInfo: {
    annualIncome: Number,
    bankStatements: [String],
  },
  healthInfo: {
    medicalHistory: String,
    currentMedications: String,  
    allergies: String,
  },
  biometricInfo: {
    fingerprintData: String,
    facialRecognitionData: String,
  },
  documentUpload: {
    passportCopy: String,  // Adjust the data type as needed
  },
  imageUpload: {
    passportPhoto: String,  // Adjust the data type as needed
    otherImages: [String],  // Adjust the data type as needed
  },
});

const Visa = mongoose.model('Visa', visaSchema);

module.exports = Visa;
