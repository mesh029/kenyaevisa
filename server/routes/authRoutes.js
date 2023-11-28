const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Admin = require('../models/adminModel');

require('dotenv').config(); // Load environment variables from .env


const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({ email, password: hashedPassword, verificationToken });
    await user.save();

    // Send a verification email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'oariri429@gmail.com',
        pass: 'yzaz upmu ctro zhea'
      }
    });

    const verificationLink = `http://localhost:5000/api/verify/${verificationToken}`; // Replace with your actual URL

    const mailOptions = {
      from: 'oariri429@gmail.com',
      to: email,
      subject: 'Email Verification',
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`
    };

    await transporter.sendMail(mailOptions);
    
    // Send a response after email is sent
    res.status(200).json({ message: 'User registered successfully. Verification email sent.' });
  } catch (error) {
    console.error('Error during sign up:', error);
    res.status(500).json({ error: 'An error occurred during sign up.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password.' });

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Email not verified. Please verify your email.' });
      
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid email or password.' });

   // Send a response after email is sent
   res.status(200).json({ message: 'Login was successfull.....',
   user: user
  });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login.' });
    console.log(error)
  }
});

router.post('/adminLogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid email or password.' });


    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid email or password.' });

   // Send a response after email is sent
   res.status(200).json({ message: 'Login was successfull.....'
  });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login.' });
    console.log(error)
  }
});

router.post('/adminSignUp', async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const admin = new Admin({ email, password: hashedPassword});
    await admin.save();

    res.status(200).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error during sign up:', error);
    res.status(500).json({ error: 'An error occurred during sign up.' });
  }
});



module.exports = router;


router.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});
