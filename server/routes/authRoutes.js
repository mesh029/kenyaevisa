const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Admin = require('../models/adminModel');
const session = require('express-session');
const cookieParser = require('cookie-parser');


const app = express();

require('dotenv').config();

app.use(cookieParser());

app.use(
  session({
    secret: 'your-secret-key', // Change this to a long, random string
    resave: false,
    saveUninitialized: true,
  })
);

const router = express.Router();
const testJwtSecret = 'yourTestSecret'; // Replace with your actual test secret

// Existing signup logic
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

// Existing login logic
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

       // Generate JWT token
       const payload = {
        email: admin.email,
        // Add other user-related data to the payload if needed
      };
      const token = jwt.sign(payload, testJwtSecret, { expiresIn: '1h' }); // Set the expiration time as needed
  
      // Send the token to the client
      res.json({ token });
  
    res.status(200).json({ message: 'Login was successful.....', admin });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login.' });
    console.log(error);
  }
});

// Existing adminLogin logic
router.post('/adminLogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid email or password.' });

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid email or password.' });

    req.session.user = { email }; // Set user data in the session
   

    res.json({
      email  ,
      message: 'Login was successful.....',
      admin,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login.' });
    console.log(error);
  }
});

// ... (your other routes)

module.exports = router;
