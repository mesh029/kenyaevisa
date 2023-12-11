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
const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');
const session = require('express-session');
const app = express();


require('dotenv').config();

// Set up session middleware
app.use(session({
  secret: 'your-secret-key', // Change this to a strong secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if using HTTPS
}));



const CLIENT_PORT = process.env.CLIENT_PORT || 5000;
const SERVER_PORT = process.env.SERVER_PORT || 2000;


app.use(cors());
app.use(express.json());

const STATIC_FOLDER = path.join(__dirname, '../', 'client/', 'build/');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(expressStaticGzip(STATIC_FOLDER));

const testJwtSecret = 'yourTestSecret';

const mongoURI = "mongodb+srv://officialariri:geekMesh2019@cluster0.tfcu6yy.mongodb.net/";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


const connection = mongoose.connection;

connection.on('error', (error) => {
});

connection.once('open', () => {
  console.log('MongoDB connection established successfully.');
});

cloudinary.config({
  cloud_name: 'ddvfhefen',
  api_key: '256688251141781',
  api_secret: 'AHVbzTCaDJ658QBw6fKv8Mm7ZpM',
});

const fileSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  size: Number,
  user: String,
  filetype: String,
  fieldName: String,
  cloudinaryUrl: String // Add the 'filetype' property
  // Add any user-related information
  // Add other metadata fields as needed
});

const File = mongoose.model('File', fileSchema);

const storage = multer.memoryStorage(); // Use memory storage for Cloudinary

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
    
        const { originalname, size, mimetype, buffer } = file;
    
        try {
          // Create a readable stream from the buffer
          const readableStream = new Readable();
          readableStream.push(buffer);
          readableStream.push(null);
    
          // Convert the readable stream to a Buffer
          const bufferData = [];
          readableStream.on('data', (chunk) => {
            bufferData.push(chunk);
          });
          await new Promise((resolve) => readableStream.on('end', resolve));
          const fileBuffer = Buffer.concat(bufferData);
    
          // Upload file to Cloudinary using upload_stream
          const result = await cloudinary.uploader.upload_stream(
            { resource_type: 'auto', folder: 'your_upload_folder' }, // Set your desired Cloudinary folder
            async (error, result) => {
              if (error) {
                console.error(`Error uploading to Cloudinary:`, error.message);
                throw error; // Propagate the error up
              }
    
              // Save Cloudinary URL and other metadata to MongoDB
              const userEmail = req.body[`${fieldName}_user`];
              const fileData = new File({
                filename: result.public_id,
                originalname: originalname,
                size: size,
                user: userEmail,
                filetype: mimetype,
                fieldName: fieldName,
                cloudinaryUrl: result.secure_url,
                // Add other metadata fields as needed
              });
    
              await fileData.save();
    
              console.log('This is the file data', fileData);
            }
          ).end(fileBuffer);
    
          return true; // Indicate success
        } catch (cloudinaryError) {
          console.error(`Error uploading to Cloudinary:`, cloudinaryError.message);
          throw cloudinaryError; // Propagate the error up
        }
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
