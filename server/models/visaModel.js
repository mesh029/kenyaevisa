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
    surname:{
      type: String,
    },
    gender:{
      type: String,
    },
    countryOfResidence:{
      type: String,
    },
    presentNationality:{
      type: String,
    },
    nationalityAtBirth:{
      type: String,
    },
    physicalAddress:{
      type: String,
    },
    email:{
      type: String,
    },
    phoneNumber:{
      type: String,
    },
    // Add other personal information fields as needed
  },
  visaType: String,
  status: String,
  processingOption: String,
  documentDetails: {
    passportNumber: String,
    placeOfIssue: String,
    dateOfIssue: String,
    expiryDate: String,
    issuedBy: String,
    reasonForEntry: String,
  },
  uploads: {
    passportBioData: String,
    passportFrontCover: String,
    travelItinerary: String,
    returnTicket: String,  // Adjust the data type as needed
  },

}, { timestamps: true });

const Visa = mongoose.model('Visa', visaSchema);

module.exports = Visa;
