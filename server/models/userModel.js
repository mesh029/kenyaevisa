const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String
  },
    // Reference to the Visa Applications created by this user
    visaApplications: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Visa'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
