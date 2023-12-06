const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Grid = require('gridfs-stream');
const { GridFsStorage } = require('multer-gridfs-storage');
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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(expressStaticGzip(STATIC_FOLDER));

const testJwtSecret = 'yourTestSecret';

const mongoURI = "mongodb://kenyaevisa:geekMesh2019a@146.190.128.245:27017/?authSource=admin";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


const connection = mongoose.connection;

connection.on('error', (error) => {
});

connection.once('open', () => {
  console.log('MongoDB connection established successfully.');
});

const fileSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  size: Number,
  user: String,
  filetype: String,
  fieldName: String, // Add the 'filetype' property
  // Add any user-related information
  // Add other metadata fields as needed
});

const File = mongoose.model('File', fileSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Check if the file type is PDF or image
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only PDF and image files are allowed!'), false); // Reject the file
  }
};


const upload = multer({ storage: storage, fileFilter: fileFilter });


app.post('/api/upload', upload.fields([
  { name: 'passportBioData', maxCount: 1 },
  { name: 'passportFrontCover', maxCount: 1 },
  { name: 'returnTicket', maxCount: 1 },
  { name: 'travelItinerary', maxCount: 1 },
  { name: 'colouredPhoto', maxCount: 1 },
]), async (req, res) => {
  try {
    // Check if files were successfully uploaded
    const passportBioData = req.files['passportBioData'];
    const passportFrontCover = req.files['passportFrontCover'];
    const returnTicket = req.files['returnTicket'];
    const travelItinerary = req.files['travelItinerary'];
    const colouredPhoto = req.files['colouredPhoto'];

    if (!passportBioData || !passportFrontCover || !returnTicket || !travelItinerary|| !colouredPhoto ) {
      return res.status(400).send('Missing files. Please upload all required files.');
    }

    // Handle each type of file
    const handleFile = async (files, fieldName) => {
      try {
  
      
        const file = files[0]; // Assuming only one file is uploaded for each field
    
          const { originalname, size, mimetype, filename } = file;

          // Save file metadata to MongoDB, including the file type
          const userEmail = req.body[`${fieldName}_user`];
          const fileData = new File({
            filename: filename,
            originalname: originalname,
            size: size,
            user: userEmail, // Adjust this based on how you're associating files with users
            filetype: mimetype,
            fieldName: fieldName,
          // Add the fieldname to identify the type of file
            // Add other metadata fields as needed
          });

          await fileData.save();

 
          console.log("These is the file data", fileData) // Save file data to the database

          return true; // Indicate success

      } catch (error) {
        console.error(`Error handling ${fieldName}:`, error);
      }
    };

    await handleFile(passportBioData, 'passportBioData');
    await handleFile(passportFrontCover, 'passportFrontCover');
    await handleFile(returnTicket, 'returnTicket');
    await handleFile(travelItinerary, 'travelItinerary');
    await handleFile(colouredPhoto, 'colouredPhoto');

    res.send('Files uploaded successfully!');
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Serve a file using its filename
app.get('/api/files/:filename', (req, res) => {
  const { filename } = req.params;

  // Directly use the 'uploads' route to serve the file
  const fileUrl = `/uploads/${filename}`;

  // Log the file URL for debugging purposes
  console.log('File URL:', fileUrl);

  // Serve the file using express.static
  res.redirect(fileUrl);
});
// Fetch all file metadata
app.get('/api/files', async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
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
