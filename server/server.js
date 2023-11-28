const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors");
const expressStaticGzip = require("express-static-gzip");
require('dotenv').config() // Load environment variables from .env
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

const STATIC_FOLDER = path.join(__dirname, "../", "client/", "build/");
const HTTP_PORT = Number(PORT);

app.use(expressStaticGzip(STATIC_FOLDER));
app.get("*", expressStaticGzip(STATIC_FOLDER));
app.use("*", expressStaticGzip(STATIC_FOLDER));

// MongoDB Atlas connection URI
const mongoURI = "mongodb+srv://officialariri:geekMesh2019@cluster0.tfcu6yy.mongodb.net/"

const visaRoutes = require('./routes/visaRoutes');
app.use('/api/visas', visaRoutes);
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const allVisas = require('./routes/allVisas')
app.use('/api/allVisas', allVisas)
const emailVerificationRouter = require('./routes/emailVerification')
app.use('/api/verify', emailVerificationRouter);





// Start the server

async function listen() {

  // Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully.');
});

  
  await app.listen(HTTP_PORT);

  console.log(`Serving files in ${STATIC_FOLDER} on port ${HTTP_PORT}`);
}

module.exports = {
  app,
  listen,
};