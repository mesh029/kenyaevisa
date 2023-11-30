const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const expressStaticGzip = require('express-static-gzip');
const jwt = require('jsonwebtoken');
const passport = require('passport');  // Add this line for Passport.js
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

require('dotenv').config();

const app = express();

const CLIENT_PORT = process.env.CLIENT_PORT || 5000;
const SERVER_PORT = process.env.SERVER_PORT || 2000;

app.use(cors());
app.use(express.json());

const STATIC_FOLDER = path.join(__dirname, '../', 'client/', 'build/');

app.use(express.json());
app.use(expressStaticGzip(STATIC_FOLDER));

const testJwtSecret = 'yourTestSecret';

const mongoURI = 'mongodb+srv://officialariri:geekMesh2019@cluster0.tfcu6yy.mongodb.net/';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully.');
});

// Use the JSON Web Token (JWT) Strategy for 
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: testJwtSecret, // Replace with your actual secret key
};
passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  // jwtPayload contains the decoded JWT token
  // You can use the information in jwtPayload to find the corresponding user in your database
  // For example, you might find the user by ID: Admin.findById(jwtPayload.sub, (err, admin) => { ... })
  // If the user is found, call done(null, admin); otherwise, call done(null, false);
  console.log('Passport received JWT:', jwtPayload);
  Admin.findById(jwtPayload.sub, (err, admin) => {
    if (err) {
      return done(err, false);
    }
    if (admin) {
      return done(null, admin);
    } else {
      return done(null, false);
    }
  });
}));

// Initialize Passport middleware
app.use(passport.initialize());

// Middleware to verify JWT using Passport.js
const authenticateToken = passport.authenticate('jwt', { session: false });

const visaRoutes = require('./routes/visaRoutes');
const authRoutes = require('./routes/authRoutes');
const allVisas = require('./routes/allVisas');
const emailVerificationRouter = require('./routes/emailVerification');

app.use('/api/visas', visaRoutes);
app.use('/api/auth', authRoutes);

// Protect the /api/allVisas route with Passport.js JWT authentication
app.use('/api/allVisas', allVisas);

app.use('/api/verify', emailVerificationRouter);

app.get('*', (req, res) => {
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(404).send('Not Found');
  }

  res.sendFile(path.join(STATIC_FOLDER, 'index.html'));
});

async function listen() {
  await app.listen(SERVER_PORT);
  console.log(`Server is running on port ${SERVER_PORT}`);

  app.listen(CLIENT_PORT, () => {
    console.log(`Client is running on port ${CLIENT_PORT}`);
  });
}

module.exports = {
  app,
  listen,
};
