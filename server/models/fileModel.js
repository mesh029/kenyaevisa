const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    user: String, 
    filename: String,
    originalname: String,
    size: Number,
    user: String,
    filetype: String, // Add the 'filetype' property
    // Add any user-related information
    // Add other metadata fields as needed
  });
  
  const File = mongoose.model('File', fileSchema);

  module.exports = File;
