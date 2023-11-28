const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.get('/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ message: 'Invalid verification token.' });
    }

    // Update user's verification status and remove the token
    await User.findOneAndUpdate({ verificationToken: token }, { isVerified: true, verificationToken: undefined });

    res.status(200).json({ message: 'Email verified successfully.' });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ message: 'Error verifying email.' });
  }
});

module.exports = router;
